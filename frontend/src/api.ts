const API = "";

export type UploadResponse = {
  document_id: string;
  filename: string;
  size_bytes: number;
  pages?: number;
  chunks?: number;
};

export type Citation = { page: number; snippet: string };

export type ChatResponse = {
  answer: string;
  citations: Citation[];
};

export type AnalyzeResponse = {
  summary: string[];
  suggested_questions: string[];
};

export async function uploadPdf(file: File): Promise<UploadResponse> {
  const fd = new FormData();
  fd.append("file", file);
  const res = await fetch(`${API}/api/documents/upload/`, {
    method: "POST",
    body: fd,
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error((err as { detail?: string }).detail || res.statusText);
  }
  return res.json();
}

export async function analyzeDocument(documentId: string): Promise<AnalyzeResponse> {
  const res = await fetch(`${API}/api/documents/${documentId}/analyze/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: "{}",
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error((err as { detail?: string }).detail || res.statusText);
  }
  return res.json();
}

export async function chatDocument(documentId: string, message: string): Promise<ChatResponse> {
  const res = await fetch(`${API}/api/documents/${documentId}/chat/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message }),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error((err as { detail?: string }).detail || res.statusText);
  }
  return res.json();
}

export async function deleteDocument(documentId: string): Promise<void> {
  await fetch(`${API}/api/documents/${documentId}/`, { method: "DELETE" });
}

export function pdfUrl(documentId: string): string {
  return `${API}/api/documents/${documentId}/pdf/`;
}
