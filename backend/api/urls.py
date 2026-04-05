from django.urls import path

from . import views

urlpatterns = [
    path("documents/upload/", views.DocumentUploadView.as_view()),
    path("documents/<uuid:document_id>/analyze/", views.DocumentAnalyzeView.as_view()),
    path("documents/<uuid:document_id>/chat/", views.DocumentChatView.as_view()),
    path("documents/<uuid:document_id>/pdf/", views.DocumentPdfView.as_view()),
    path("documents/<uuid:document_id>/", views.DocumentDeleteView.as_view()),
]
