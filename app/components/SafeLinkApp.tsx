"use client";

import { useState } from "react";
import ToolTabs, { TabId } from "./ToolTabs";
import QuickCheckPanel from "./QuickCheckPanel";
import DeepScanPanel from "./DeepScanPanel";
import CrossPromoFooter from "./CrossPromoFooter";

export default function SafeLinkApp() {
  const [activeTab, setActiveTab] = useState<TabId>("quick");

  return (
    <div className="min-h-screen bg-background">
      <main className="mx-auto flex w-full max-w-xl flex-1 flex-col px-4 py-8 sm:py-12">
      <header className="mb-6">
        <div className="flex items-center gap-3">
          <span className="icon-3d">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M9 12a3.5 3.5 0 0 0 5 3l3-3a3.5 3.5 0 0 0-5-5l-1 1"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M15 12a3.5 3.5 0 0 0-5-3l-3 3a3.5 3.5 0 0 0 5 5l1-1"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
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
    </div>
  );
}
