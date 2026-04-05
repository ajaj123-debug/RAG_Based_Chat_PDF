from __future__ import annotations

import logging
import uuid
from pathlib import Path

from django.conf import settings
from django.http import FileResponse, Http404
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator
from rest_framework.parsers import FormParser, JSONParser, MultiPartParser
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status

from . import rag_service

logger = logging.getLogger(__name__)


def _media_pdf_path(document_id) -> Path:
    return Path(settings.MEDIA_ROOT) / "pdfs" / f"{document_id}.pdf"


@method_decorator(csrf_exempt, name="dispatch")
class DocumentUploadView(APIView):
    parser_classes = (MultiPartParser, FormParser)

    def post(self, request):
        f = request.FILES.get("file")
        if not f:
            return Response({"detail": "Missing file field 'file'."}, status=status.HTTP_400_BAD_REQUEST)
        if not f.name.lower().endswith(".pdf"):
            return Response({"detail": "Only PDF files are supported."}, status=status.HTTP_400_BAD_REQUEST)

        document_id = str(uuid.uuid4())
        dest_dir = Path(settings.MEDIA_ROOT) / "pdfs"
        dest_dir.mkdir(parents=True, exist_ok=True)
        dest = dest_dir / f"{document_id}.pdf"

        with open(dest, "wb") as out:
            for chunk in f.chunks():
                out.write(chunk)

        try:
            info = rag_service.ingest_pdf(document_id, dest)
        except Exception as e:
            if dest.exists():
                dest.unlink()
            return Response({"detail": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        return Response(
            {
                "document_id": document_id,
                "filename": f.name,
                "size_bytes": dest.stat().st_size,
                **info,
            },
            status=status.HTTP_201_CREATED,
        )


@method_decorator(csrf_exempt, name="dispatch")
class DocumentAnalyzeView(APIView):
    parser_classes = (JSONParser,)

    def post(self, request, document_id: str):
        path = _media_pdf_path(document_id)
        if not path.exists():
            raise Http404()
        try:
            result = rag_service.summarize_document(document_id)
        except RuntimeError as e:
            return Response({"detail": str(e)}, status=status.HTTP_503_SERVICE_UNAVAILABLE)
        except Exception as e:
            logger.exception("Document analyze failed")
            return Response({"detail": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        return Response(result)


@method_decorator(csrf_exempt, name="dispatch")
class DocumentChatView(APIView):
    parser_classes = (JSONParser,)

    def post(self, request, document_id: str):
        path = _media_pdf_path(document_id)
        if not path.exists():
            raise Http404()
        message = (request.data.get("message") or "").strip()
        if not message:
            return Response({"detail": "message is required."}, status=status.HTTP_400_BAD_REQUEST)
        try:
            result = rag_service.chat_with_citations(document_id, message)
        except RuntimeError as e:
            return Response({"detail": str(e)}, status=status.HTTP_503_SERVICE_UNAVAILABLE)
        except Exception as e:
            logger.exception("Document chat failed")
            return Response({"detail": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        return Response(result)


@method_decorator(csrf_exempt, name="dispatch")
class DocumentPdfView(APIView):
    def get(self, request, document_id: str):
        path = _media_pdf_path(document_id)
        if not path.exists():
            raise Http404()
        return FileResponse(open(path, "rb"), content_type="application/pdf", filename=f"{document_id}.pdf")


@method_decorator(csrf_exempt, name="dispatch")
class DocumentDeleteView(APIView):
    def delete(self, request, document_id: str):
        path = _media_pdf_path(document_id)
        if path.exists():
            path.unlink()
        rag_service.delete_document_index(document_id)
        return Response(status=status.HTTP_204_NO_CONTENT)
