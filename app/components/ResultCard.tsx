import { ReactNode } from "react";

type Variant = "safe" | "warn" | "danger" | "info";

const VARIANT_STYLES: Record<Variant, { border: string; icon: string; color: string }> = {
  safe: { border: "border-safe/40", icon: "✓", color: "text-safe" },
  warn: { border: "border-warn/40", icon: "!", color: "text-warn" },
  danger: { border: "border-danger/40", icon: "⚠", color: "text-danger" },
  info: { border: "border-border", icon: "i", color: "text-accent" },
};

export default function ResultCard({
  variant,
  title,
  children,
}: {
  variant: Variant;
  title: string;
  children?: ReactNode;
}) {
  const styles = VARIANT_STYLES[variant];
  return (
    <div className={`rounded-xl border ${styles.border} bg-surface p-4`}>
      <div className="flex items-center gap-2">
        <span
          className={`flex h-6 w-6 items-center justify-center rounded-full bg-surface-2 text-xs font-bold ${styles.color}`}
        >
          {styles.icon}
        </span>
        <h3 className="text-sm font-semibold text-foreground">{title}</h3>
      </div>
      {children && <div className="mt-3 text-sm text-muted">{children}</div>}
    </div>
  );
}
