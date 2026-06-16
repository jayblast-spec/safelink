export type IntelligenceInput = { input?: string };
const product = {
  "repo": "SafeLink",
  "title": "SafeLink",
  "eyebrow": "ArkNet Digital / Cybersecurity Suite",
  "theme": "from-lime-300 via-teal-300 to-cyan-400",
  "hero": "Inspect suspicious links before trust becomes the attack surface.",
  "sub": "SafeLink gives teams a calm, explainable safe-click cockpit for suspicious URLs, redirect chains, phishing language, and user-facing warnings.",
  "input": "https://example-login-check.com/reset?token=... or pasted suspicious message",
  "cta": "Inspect link",
  "scoreLabel": "Link risk",
  "panels": [
    [
      "Redirect story",
      "Explain the path a user would take before they click."
    ],
    [
      "Phishing language",
      "Detect urgency, impersonation, credential prompts, and payment pressure."
    ],
    [
      "Domain trust hints",
      "Surface domain age, typo patterns, and suspicious structure."
    ],
    [
      "Safe response",
      "Generate a plain-language warning for the recipient."
    ]
  ],
  "rows": [
    [
      "Login clone",
      "Credential capture",
      "High",
      "Warn user and report domain to security team."
    ],
    [
      "Shortened URL",
      "Hidden destination",
      "Medium",
      "Expand and inspect before allowing."
    ],
    [
      "QR campaign",
      "Mobile phishing",
      "High",
      "Add mobile-safe preview and training note."
    ],
    [
      "Invoice lure",
      "Payment fraud",
      "Critical",
      "Verify by trusted channel before action."
    ]
  ],
  "missions": [
    [
      "URLhaus connector",
      "Check known malicious URLs and malware campaigns."
    ],
    [
      "Safe Browsing support",
      "Add optional provider-backed reputation checks."
    ],
    [
      "QR decoder",
      "Extract and inspect QR destinations safely."
    ],
    [
      "Email plugin",
      "Bring SafeLink into mailbox review workflows."
    ]
  ],
  "apiExtra": "SafeLink should provide defensive guidance and warnings, not automate abuse or bypass controls."
} as const;
function scoreFor(subject: string) { let score = 58 + Math.min(28, Math.floor(subject.length / 5)); if (/admin|rdp|database|credential|prod|public|critical|cve|phishing/i.test(subject)) score += 9; return Math.min(98, score); }
function severity(score: number) { return score >= 88 ? 'critical' : score >= 74 ? 'high' : score >= 61 ? 'medium' : 'low'; }
export function generateIntelligence({ input = '' }: IntelligenceInput) {
  const subject = input.trim() || product.input;
  const score = scoreFor(subject);
  return {
    product: product.title,
    brand: 'ArkNet Digital',
    category: product.hero,
    subject,
    score,
    severity: severity(score),
    executive_summary: product.sub,
    exposure_map: product.panels.map(([label, value]) => ({ label, value, status: score >= 74 ? 'priority' : 'review' })),
    remediation_queue: product.rows.slice(0, 3).map(([asset, type, risk, note]) => ({ action: asset + ' - ' + type, owner: risk === 'Critical' ? 'Security lead' : 'Blue Team', impact: note })),
    contributor_lanes: product.missions.map(([lane, mission]) => ({ lane, mission })),
    defensive_scope: product.apiExtra,
    generated_at: new Date().toISOString()
  };
}
