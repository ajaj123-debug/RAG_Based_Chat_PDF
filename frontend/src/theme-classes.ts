/** Centralized Tailwind class maps for light/dark — keeps the UI visually consistent. */

export type Theme = "light" | "dark";

export const ui = {
  app: (t: Theme) =>
    t === "dark"
      ? "flex min-h-full min-h-dvh flex-col bg-zinc-950 text-zinc-100"
      : "flex min-h-full min-h-dvh flex-col bg-zinc-100 text-zinc-900",

  header: (t: Theme) =>
    t === "dark"
      ? "sticky top-0 z-40 flex h-14 shrink-0 items-center justify-between border-b border-zinc-800/80 bg-zinc-950/90 px-4 backdrop-blur-md sm:px-6"
      : "sticky top-0 z-40 flex h-14 shrink-0 items-center justify-between border-b border-zinc-200 bg-white/90 px-4 backdrop-blur-md sm:px-6",

  brand: (t: Theme) =>
    t === "dark" ? "flex items-center gap-2.5 font-semibold tracking-tight" : "flex items-center gap-2.5 font-semibold tracking-tight",

  brandIcon: (t: Theme) =>
    t === "dark" ? "text-violet-400" : "text-violet-600",

  /** Outer card wrapping a major column */
  panel: (t: Theme) =>
    t === "dark"
      ? "flex flex-col rounded-2xl border border-zinc-800 bg-zinc-900/40 shadow-xl shadow-black/30"
      : "flex flex-col rounded-2xl border border-zinc-200 bg-white shadow-sm",

  panelBody: "p-5 gap-4",

  /** Nested well (chat transcript, PDF canvas area) */
  inset: (t: Theme) =>
    t === "dark"
      ? "rounded-xl border border-zinc-800/90 bg-zinc-950/70"
      : "rounded-xl border border-zinc-200 bg-zinc-50",

  /** Toolbar row (file bar, pdf controls) */
  toolbar: (t: Theme) =>
    t === "dark"
      ? "flex items-center gap-3 rounded-xl border border-zinc-800 bg-zinc-900/80 px-3 py-2.5"
      : "flex items-center gap-3 rounded-xl border border-zinc-200 bg-zinc-50 px-3 py-2.5",

  muted: (t: Theme) => (t === "dark" ? "text-zinc-400" : "text-zinc-500"),

  sectionLabel: (t: Theme) =>
    t === "dark"
      ? "flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-zinc-400"
      : "flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-zinc-500",

  /** Dashed upload target */
  uploadZone: (t: Theme) =>
    t === "dark"
      ? "flex min-h-[148px] w-full flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-zinc-700 bg-zinc-900/30 px-4 py-8 transition hover:border-violet-500/50 hover:bg-zinc-900/50 disabled:cursor-not-allowed disabled:opacity-50"
      : "flex min-h-[148px] w-full flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-zinc-300 bg-white px-4 py-8 transition hover:border-violet-400 hover:bg-violet-50/40 disabled:cursor-not-allowed disabled:opacity-50",

  emptyWell: (t: Theme) =>
    t === "dark"
      ? "flex flex-1 flex-col items-center justify-center gap-3 rounded-xl border border-zinc-800/80 bg-zinc-950/40 py-14"
      : "flex flex-1 flex-col items-center justify-center gap-3 rounded-xl border border-zinc-200 bg-zinc-50/80 py-14",

  /** Primary CTA (Analyze) */
  btnPrimary: (t: Theme) =>
    t === "dark"
      ? "inline-flex w-full items-center justify-center gap-2 rounded-xl bg-violet-500 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-violet-950/40 transition hover:bg-violet-400 disabled:cursor-not-allowed disabled:opacity-40"
      : "inline-flex w-full items-center justify-center gap-2 rounded-xl bg-violet-600 px-4 py-3 text-sm font-semibold text-white shadow-md shadow-violet-900/20 transition hover:bg-violet-500 disabled:cursor-not-allowed disabled:opacity-40",

  /** Secondary outline */
  btnSecondary: (t: Theme) =>
    t === "dark"
      ? "w-full rounded-xl border border-zinc-700 bg-zinc-900/60 py-2.5 text-sm font-medium text-zinc-100 transition hover:border-zinc-600 hover:bg-zinc-800 disabled:cursor-not-allowed disabled:opacity-40"
      : "w-full rounded-xl border border-zinc-200 bg-white py-2.5 text-sm font-medium text-zinc-900 transition hover:border-zinc-300 hover:bg-zinc-50 disabled:cursor-not-allowed disabled:opacity-40",

  /** Icon / ghost */
  btnIcon: (t: Theme) =>
    t === "dark"
      ? "inline-flex items-center justify-center rounded-lg p-2 text-zinc-400 transition hover:bg-zinc-800 hover:text-zinc-100"
      : "inline-flex items-center justify-center rounded-lg p-2 text-zinc-500 transition hover:bg-zinc-100 hover:text-zinc-900",

  btnThemeToggle: (t: Theme) =>
    t === "dark"
      ? "inline-flex items-center gap-2 rounded-full border border-zinc-700 bg-zinc-900 px-3.5 py-2 text-xs font-medium text-zinc-200 transition hover:border-zinc-600 hover:bg-zinc-800"
      : "inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-white px-3.5 py-2 text-xs font-medium text-zinc-700 shadow-sm transition hover:border-zinc-300 hover:bg-zinc-50",

  iconBtn: (t: Theme) =>
    t === "dark"
      ? "rounded-lg px-2.5 py-1.5 text-sm font-medium text-zinc-300 transition hover:bg-zinc-800 disabled:opacity-35"
      : "rounded-lg px-2.5 py-1.5 text-sm font-medium text-zinc-700 transition hover:bg-zinc-100 disabled:opacity-35",

  textarea: (t: Theme) =>
    t === "dark"
      ? "w-full resize-none rounded-xl border border-zinc-700 bg-zinc-950 py-3 pl-3.5 pr-12 text-sm text-zinc-100 placeholder:text-zinc-500 focus:border-violet-500 focus:outline-none focus:ring-2 focus:ring-violet-500/25 disabled:opacity-45"
      : "w-full resize-none rounded-xl border border-zinc-200 bg-white py-3 pl-3.5 pr-12 text-sm text-zinc-900 placeholder:text-zinc-400 focus:border-violet-500 focus:outline-none focus:ring-2 focus:ring-violet-500/20 disabled:opacity-45",

  sendFab: (t: Theme) =>
    t === "dark"
      ? "absolute bottom-3 right-3 flex h-9 w-9 items-center justify-center rounded-lg bg-violet-600 text-white transition hover:bg-violet-500 disabled:bg-zinc-800 disabled:text-zinc-600"
      : "absolute bottom-3 right-3 flex h-9 w-9 items-center justify-center rounded-lg bg-violet-600 text-white shadow-sm transition hover:bg-violet-500 disabled:bg-zinc-200 disabled:text-zinc-400",

  chip: (t: Theme) =>
    t === "dark"
      ? "rounded-lg border border-zinc-600 bg-zinc-950 px-2.5 py-1 text-xs font-medium text-violet-200 transition hover:border-violet-500/60 hover:bg-zinc-900"
      : "rounded-lg border border-zinc-200 bg-white px-2.5 py-1 text-xs font-medium text-violet-800 transition hover:border-violet-300 hover:bg-violet-50",

  suggestion: (t: Theme) =>
    t === "dark"
      ? "max-w-full rounded-lg border border-zinc-700 bg-zinc-900/80 px-3 py-2 text-left text-xs leading-snug text-zinc-200 transition hover:border-zinc-600 disabled:opacity-40"
      : "max-w-full rounded-lg border border-zinc-200 bg-white px-3 py-2 text-left text-xs leading-snug text-zinc-800 transition hover:border-zinc-300 disabled:opacity-40",

  bubbleUser: (t: Theme) =>
    t === "dark"
      ? "ml-auto max-w-[min(92%,28rem)] rounded-2xl rounded-br-md bg-violet-600 px-3.5 py-2.5 text-sm text-white"
      : "ml-auto max-w-[min(92%,28rem)] rounded-2xl rounded-br-md bg-violet-600 px-3.5 py-2.5 text-sm text-white shadow-sm",

  bubbleAssistant: (t: Theme) =>
    t === "dark"
      ? "mr-auto max-w-[min(96%,32rem)] rounded-2xl rounded-bl-md border border-zinc-800 bg-zinc-900/90 px-3.5 py-2.5 text-sm text-zinc-100"
      : "mr-auto max-w-[min(96%,32rem)] rounded-2xl rounded-bl-md border border-zinc-200 bg-white px-3.5 py-2.5 text-sm text-zinc-800 shadow-sm",

  errorToast: (t: Theme) =>
    t === "dark"
      ? "fixed bottom-4 left-1/2 z-50 max-w-md -translate-x-1/2 rounded-xl border border-red-500/35 bg-red-950/95 px-4 py-3 text-sm text-red-50 shadow-lg"
      : "fixed bottom-4 left-1/2 z-50 max-w-md -translate-x-1/2 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-900 shadow-md",

  accentIcon: (t: Theme) => (t === "dark" ? "text-violet-400" : "text-violet-600"),

  /** Small caps label above chips (e.g. suggested questions) */
  chipGroupLabel: "mb-2 text-[11px] font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400",
};

export function cn(...parts: (string | false | undefined)[]) {
  return parts.filter(Boolean).join(" ");
}
