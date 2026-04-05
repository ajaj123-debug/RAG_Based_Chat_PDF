import type { ReactNode } from "react";
import type { Theme } from "../theme-classes";
import { ui } from "../theme-classes";

type Props = {
  theme: Theme;
  icon?: ReactNode;
  children: ReactNode;
};

export function SectionTitle({ theme, icon, children }: Props) {
  return (
    <div className={ui.sectionLabel(theme)}>
      {icon ? <span className="shrink-0 opacity-90">{icon}</span> : null}
      {children}
    </div>
  );
}
