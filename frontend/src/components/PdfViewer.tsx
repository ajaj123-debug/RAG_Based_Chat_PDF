import { useCallback, useEffect, useMemo, useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

import { pdfUrl } from "../api";
import type { Theme } from "../theme-classes";
import { ui, cn } from "../theme-classes";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url
).toString();

type Props = {
  documentId: string;
  pageNumber: number;
  onPageChange?: (p: number) => void;
  onNumPages?: (n: number) => void;
  theme: Theme;
};

export function PdfViewer({ documentId, pageNumber, onPageChange, onNumPages, theme }: Props) {
  const [numPages, setNumPages] = useState(0);
  const [scale, setScale] = useState(1);

  const file = useMemo(() => ({ url: pdfUrl(documentId) }), [documentId]);

  const onLoadSuccess = useCallback(
    ({ numPages: n }: { numPages: number }) => {
      setNumPages(n);
      onNumPages?.(n);
    },
    [onNumPages]
  );

  useEffect(() => {
    if (numPages && pageNumber > numPages) {
      onPageChange?.(numPages);
    }
  }, [numPages, pageNumber, onPageChange]);

  const go = (delta: number) => {
    const next = Math.min(Math.max(1, pageNumber + delta), numPages || 1);
    onPageChange?.(next);
  };

  const zoom = (delta: number) => {
    setScale((s) => Math.min(2, Math.max(0.5, Math.round((s + delta) * 10) / 10)));
  };

  return (
    <div className="flex min-h-0 flex-1 flex-col gap-3">
      <div className={ui.toolbar(theme)}>
        <div className="flex flex-1 items-center justify-center gap-1 sm:gap-2">
          <button
            type="button"
            onClick={() => go(-1)}
            disabled={pageNumber <= 1}
            className={ui.iconBtn(theme)}
            aria-label="Previous page"
          >
            ‹
          </button>
          <span
            className={cn(
              "min-w-[5rem] text-center text-sm tabular-nums",
              ui.muted(theme)
            )}
          >
            {numPages ? `${pageNumber} / ${numPages}` : "—"}
          </span>
          <button
            type="button"
            onClick={() => go(1)}
            disabled={!numPages || pageNumber >= numPages}
            className={ui.iconBtn(theme)}
            aria-label="Next page"
          >
            ›
          </button>
        </div>
        <div className={cn("hidden h-6 w-px sm:block", theme === "dark" ? "bg-zinc-700" : "bg-zinc-200")} />
        <div className="flex items-center gap-0.5">
          <button
            type="button"
            onClick={() => zoom(-0.1)}
            className={ui.iconBtn(theme)}
            title="Zoom out"
            aria-label="Zoom out"
          >
            −
          </button>
          <span className={cn("w-11 text-center text-xs tabular-nums", ui.muted(theme))}>
            {Math.round(scale * 100)}%
          </span>
          <button
            type="button"
            onClick={() => zoom(0.1)}
            className={ui.iconBtn(theme)}
            title="Zoom in"
            aria-label="Zoom in"
          >
            +
          </button>
        </div>
      </div>

      <div className={cn(ui.inset(theme), "min-h-0 flex-1 overflow-auto p-4 sm:p-5")}>
        <Document
          file={file}
          onLoadSuccess={onLoadSuccess}
          loading={
            <div className={cn("py-16 text-center text-sm", ui.muted(theme))}>Loading PDF…</div>
          }
          error={
            <div className="py-16 text-center text-sm text-red-500 dark:text-red-400">
              Could not load PDF.
            </div>
          }
        >
          <Page
            pageNumber={pageNumber}
            scale={scale}
            className="flex justify-center"
            renderTextLayer
            renderAnnotationLayer
          />
        </Document>
      </div>
    </div>
  );
}
