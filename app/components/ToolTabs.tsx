"use client";

export type TabId = "quick" | "deep";

const TABS: { id: TabId; label: string }[] = [
  { id: "quick", label: "Quick Check" },
  { id: "deep", label: "Deep Scan" },
];

export default function ToolTabs({
  active,
  onChange,
}: {
  active: TabId;
  onChange: (tab: TabId) => void;
}) {
  return (
    <div className="grid grid-cols-2 gap-2 rounded-xl bg-surface p-1 border border-border">
      {TABS.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onChange(tab.id)}
          className={`rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
            active === tab.id
              ? "bg-accent-soft text-accent"
              : "text-muted hover:text-foreground"
          }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}
