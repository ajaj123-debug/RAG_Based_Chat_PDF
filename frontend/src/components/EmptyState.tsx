import type { ReactNode } from "react";
import type { Theme } from "../theme-classes";
import { ui, cn } from "../theme-classes";

type Props = {
  theme: Theme;
  icon: ReactNode;
  title: string;
  description: string;
  className?: string;
};

export function EmptyState({ theme, icon, title, description, className }: Props) {
  return (
    <div className={cn("flex h-full min-h-[200px] flex-col items-center justify-center gap-3 px-5 text-center", className)}>
      <div className={cn("opacity-80", ui.muted(theme))}>{icon}</div>
      <div>
        <p className={cn("text-sm font-medium", theme === "dark" ? "text-zinc-100" : "text-zinc-900")}>
          {title}
        </p>
        <p className={cn("mt-1 max-w-xs text-sm", ui.muted(theme))}>{description}</p>
      </div>
    </div>
  );
}
