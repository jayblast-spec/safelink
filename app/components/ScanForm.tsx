"use client";

import { FormEvent, useState } from "react";

export default function ScanForm({
  label,
  placeholder,
  inputType = "text",
  buttonText = "Check",
  helpText,
  loading,
  onSubmit,
}: {
  label: string;
  placeholder: string;
  inputType?: string;
  buttonText?: string;
  helpText?: string;
  loading: boolean;
  onSubmit: (value: string) => void;
}) {
  const [value, setValue] = useState("");

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!value.trim() || loading) return;
    onSubmit(value.trim());
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2">
      <label className="text-sm font-medium text-foreground">{label}</label>
      <div className="flex gap-2">
        <input
          type={inputType}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder={placeholder}
          autoComplete="off"
          className="flex-1 rounded-lg border border-border bg-surface px-4 py-3 text-sm text-foreground placeholder:text-muted focus:border-accent focus:outline-none"
        />
        <button
          type="submit"
          disabled={loading || !value.trim()}
          className="rounded-lg bg-accent px-5 py-3 text-sm font-semibold text-background transition-opacity disabled:opacity-50"
        >
          {loading ? "Checking…" : buttonText}
        </button>
      </div>
      {helpText && <p className="text-xs text-muted">{helpText}</p>}
    </form>
  );
}
