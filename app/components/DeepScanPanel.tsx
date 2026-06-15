"use client";

import { useState } from "react";
import ScanForm from "./ScanForm";
import ResultCard from "./ResultCard";

type ScanReport = {
  unavailable: boolean;
  queued?: boolean;
  message?: string;
  url?: string;
  verdict?: "safe" | "suspicious" | "malicious";
  stats?: { malicious: number; suspicious: number; harmless: number; undetected: number };
  categories?: string[];
};

type State = "initial" | "loading" | "error" | ScanReport;

export default function DeepScanPanel() {
  const [result, setResult] = useState<State>("initial");

  async function handleSubmit(value: string) {
    setResult("loading");
    try {
      const res = await fetch("/api/url-scan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: value }),
      });
      if (!res.ok) {
        setResult("error");
        return;
      }
      const data = (await res.json()) as ScanReport;
      setResult(data);
    } catch {
      setResult("error");
    }
  }

  return (
    <div className="flex flex-col gap-4">
      <ScanForm
        label="Run a deep scan against threat intelligence"
        placeholder="e.g. https://example.com/login"
        loading={result === "loading"}
        buttonText="Scan"
        helpText="Checks the link against multiple security vendors' verdicts."
        onSubmit={handleSubmit}
      />

      {result === "error" && (
        <ResultCard variant="danger" title="Scan failed">
          Something went wrong reaching the scan service. Try again in a moment.
        </ResultCard>
      )}

      {typeof result === "object" && result.unavailable && (
        <ResultCard variant="info" title="Deep scan coming soon">
          This feature isn&apos;t enabled yet. Use Quick Check in the meantime — it works instantly
          with no setup.
        </ResultCard>
      )}

      {typeof result === "object" && !result.unavailable && result.queued && (
        <ResultCard variant="info" title="Submitted for analysis">
          {result.message}
        </ResultCard>
      )}

      {typeof result === "object" && !result.unavailable && !result.queued && result.stats && (
        <>
          <ResultCard
            variant={
              result.verdict === "malicious"
                ? "danger"
                : result.verdict === "suspicious"
                ? "warn"
                : "safe"
            }
            title={
              result.verdict === "malicious"
                ? "Flagged as malicious"
                : result.verdict === "suspicious"
                ? "Flagged as suspicious"
                : "No vendors flagged this link"
            }
          >
            <ul className="space-y-1">
              <li>⚠ Malicious: {result.stats.malicious}</li>
              <li>! Suspicious: {result.stats.suspicious}</li>
              <li>✓ Harmless: {result.stats.harmless}</li>
              <li>• Undetected: {result.stats.undetected}</li>
            </ul>
          </ResultCard>

          {result.categories && result.categories.length > 0 && (
            <ResultCard variant="info" title="Categories">
              <p>{result.categories.join(", ")}</p>
            </ResultCard>
          )}
        </>
      )}

      {result === "initial" && (
        <div className="rounded-xl border border-border bg-surface p-4 text-sm text-muted">
          <p className="font-medium text-foreground">About deep scan</p>
          <p className="mt-2 text-xs">
            Deep scan cross-references a link against dozens of security vendors&apos; verdicts for a
            more thorough check than the quick offline checks alone.
          </p>
        </div>
      )}
    </div>
  );
}
