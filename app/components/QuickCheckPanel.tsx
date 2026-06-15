"use client";

import { useState } from "react";
import ScanForm from "./ScanForm";
import ResultCard from "./ResultCard";
import { analyzeUrl, HeuristicResult } from "./linkHeuristics";

type State = "initial" | "invalid" | HeuristicResult;

export default function QuickCheckPanel() {
  const [result, setResult] = useState<State>("initial");

  function handleSubmit(value: string) {
    const analysis = analyzeUrl(value);
    setResult(analysis ?? "invalid");
  }

  return (
    <div className="flex flex-col gap-4">
      <ScanForm
        label="Paste a link to check for red flags"
        placeholder="e.g. https://example.com/login"
        loading={false}
        buttonText="Check"
        helpText="Instant, offline checks for common phishing tricks — nothing is sent anywhere."
        onSubmit={handleSubmit}
      />

      {result === "invalid" && (
        <ResultCard variant="danger" title="Enter a valid URL" />
      )}

      {typeof result === "object" && (
        <>
          <ResultCard
            variant={
              result.verdict === "risky"
                ? "danger"
                : result.verdict === "caution"
                ? "warn"
                : "safe"
            }
            title={
              result.verdict === "risky"
                ? `Multiple red flags on ${result.host}`
                : result.verdict === "caution"
                ? `Some things to check on ${result.host}`
                : `No red flags found on ${result.host}`
            }
          >
            {result.flags.length === 0 ? (
              <p>
                This link doesn&apos;t trigger any of our quick checks. That doesn&apos;t guarantee
                it&apos;s safe — stay cautious with links from unknown senders.
              </p>
            ) : (
              <p>
                We found {result.flags.length} thing{result.flags.length > 1 ? "s" : ""} worth a
                second look before you click.
              </p>
            )}
          </ResultCard>

          {result.flags.map((flag) => (
            <ResultCard
              key={flag.title}
              variant={flag.level === "danger" ? "danger" : flag.level === "warn" ? "warn" : "info"}
              title={flag.title}
            >
              <p>{flag.detail}</p>
            </ResultCard>
          ))}
        </>
      )}

      {result === "initial" && (
        <div className="rounded-xl border border-border bg-surface p-4 text-sm text-muted">
          <p className="font-medium text-foreground">What we check for</p>
          <ul className="mt-2 list-disc space-y-1 pl-4 text-xs">
            <li>Raw IP addresses instead of domain names</li>
            <li>The &quot;@&quot; trick that hides the real destination</li>
            <li>Punycode / lookalike domains</li>
            <li>Excessive subdomains and encoded characters</li>
            <li>Link shorteners and login-themed domains</li>
          </ul>
        </div>
      )}
    </div>
  );
}
