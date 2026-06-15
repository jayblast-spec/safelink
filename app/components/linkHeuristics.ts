export type Flag = {
  level: "danger" | "warn" | "info";
  title: string;
  detail: string;
};

export type HeuristicResult = {
  url: string;
  host: string;
  flags: Flag[];
  verdict: "safe" | "caution" | "risky";
};

const SHORTENERS = [
  "bit.ly",
  "tinyurl.com",
  "t.co",
  "goo.gl",
  "ow.ly",
  "is.gd",
  "buff.ly",
  "rebrand.ly",
  "cutt.ly",
  "shorturl.at",
];

const IPV4_RE = /^(\d{1,3}\.){3}\d{1,3}$/;

const SUSPICIOUS_KEYWORDS = [
  "login",
  "verify",
  "secure",
  "account",
  "update",
  "confirm",
  "signin",
  "password",
  "billing",
];

export function analyzeUrl(input: string): HeuristicResult | null {
  const trimmed = input.trim();
  if (!trimmed) return null;

  let parsed: URL;
  try {
    parsed = new URL(trimmed.match(/^https?:\/\//i) ? trimmed : `http://${trimmed}`);
  } catch {
    return null;
  }

  const host = parsed.hostname.toLowerCase();
  const flags: Flag[] = [];

  if (parsed.protocol !== "https:") {
    flags.push({
      level: "warn",
      title: "Not using HTTPS",
      detail: "This link doesn't use a secure connection — avoid entering passwords or payment details.",
    });
  }

  if (IPV4_RE.test(host)) {
    flags.push({
      level: "danger",
      title: "Raw IP address instead of a domain",
      detail: "Legitimate sites rarely link directly to an IP address. This is a common phishing technique.",
    });
  }

  if (trimmed.includes("@")) {
    flags.push({
      level: "danger",
      title: "Contains an \"@\" symbol",
      detail: "Browsers ignore everything before \"@\" when loading a page — attackers use this to disguise the real destination.",
    });
  }

  if (host.startsWith("xn--") || host.includes(".xn--")) {
    flags.push({
      level: "danger",
      title: "Punycode / internationalized domain",
      detail: "This domain uses special character encoding, sometimes used to mimic well-known brands with lookalike letters.",
    });
  }

  const labels = host.split(".");
  if (labels.length >= 4) {
    flags.push({
      level: "warn",
      title: "Unusually many subdomains",
      detail: `"${host}" has ${labels.length} parts — long subdomain chains are sometimes used to hide the real domain.`,
    });
  }

  if (SHORTENERS.includes(host)) {
    flags.push({
      level: "info",
      title: "Shortened link",
      detail: "This is a link shortener — the real destination is hidden until you click. Expand it first if you're unsure.",
    });
  }

  const keywordHits = SUSPICIOUS_KEYWORDS.filter((kw) => host.includes(kw));
  if (keywordHits.length > 0) {
    flags.push({
      level: "warn",
      title: "Login/account-related words in the domain",
      detail: `"${keywordHits.join(", ")}" in the domain itself can be a sign of a fake login page mimicking a real service.`,
    });
  }

  if (trimmed.length > 100) {
    flags.push({
      level: "info",
      title: "Very long URL",
      detail: "Long URLs with lots of parameters can be used to obscure the true destination or track you.",
    });
  }

  if (/[%][0-9a-fA-F]{2}/.test(host)) {
    flags.push({
      level: "warn",
      title: "Encoded characters in the domain",
      detail: "Percent-encoded characters in a hostname are unusual and can be used to disguise the real address.",
    });
  }

  const dangerCount = flags.filter((f) => f.level === "danger").length;
  const warnCount = flags.filter((f) => f.level === "warn").length;

  let verdict: HeuristicResult["verdict"] = "safe";
  if (dangerCount > 0) verdict = "risky";
  else if (warnCount > 0) verdict = "caution";

  return {
    url: parsed.toString(),
    host,
    flags,
    verdict,
  };
}
