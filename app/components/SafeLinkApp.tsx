"use client";

import { useState } from "react";
import ToolTabs, { TabId } from "./ToolTabs";
import QuickCheckPanel from "./QuickCheckPanel";
import DeepScanPanel from "./DeepScanPanel";
import CrossPromoFooter from "./CrossPromoFooter";

export default function SafeLinkApp() {
  const [activeTab, setActiveTab] = useState<TabId>("quick");

  return (
    <main className="mx-auto flex w-full max-w-xl flex-1 flex-col px-4 py-8 sm:py-12">
      <header className="mb-6">
        <div className="flex items-center gap-2">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent-soft text-lg text-accent">
            ⛓
          </span>
          <h1 className="text-xl font-bold text-foreground">SafeLink</h1>
        </div>
        <p className="mt-2 text-sm text-muted">
          Check if a link is safe before you click — free, instant, no signup.
        </p>
      </header>

      <ToolTabs active={activeTab} onChange={setActiveTab} />

      <div className="mt-4">
        {activeTab === "quick" && <QuickCheckPanel />}
        {activeTab === "deep" && <DeepScanPanel />}
      </div>

      <CrossPromoFooter />
    </main>
  );
}
