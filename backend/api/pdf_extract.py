from __future__ import annotations

from pathlib import Path

from pypdf import PdfReader


def extract_pages_text(pdf_path: str | Path) -> list[tuple[int, str]]:
    path = Path(pdf_path)
    reader = PdfReader(str(path))
    out: list[tuple[int, str]] = []
    for i, page in enumerate(reader.pages, start=1):
        try:
            text = page.extract_text() or ""
        except Exception:
            text = ""
        out.append((i, text))
    return out
