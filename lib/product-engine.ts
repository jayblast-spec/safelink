export type IntelligenceInput = { input?: string };

const product = {
  "repo": "SafeLink",
  "suite": "Cybersecurity Suite",
  "category": "Link intelligence",
  "audience": "SOC analysts, creators, teams, and families",
  "promise": "inspect links, redirects, and social-engineering signals before anyone clicks",
  "inputLabel": "Suspicious URL or message",
  "placeholder": "https://example-login-check.com/reset?token=...",
  "primary": "Analyze link",
  "gradient": "from-lime-300 via-teal-300 to-cyan-400",
  "modules": [
    "Redirect chain review",
    "Phishing language detection",
    "Domain age signals",
    "Attachment warning layer",
    "Shareable safety verdict"
  ],
  "outputs": [
    "Verdict and confidence",
    "Why it looks risky",
    "Safe next action",
    "User-facing warning copy"
  ],
  "next": [
    "URLhaus and Safe Browsing connectors",
    "QR-code risk analysis",
    "mailbox plugin",
    "family/team safe-click policy"
  ]
} as const;

function score(text: string) {
  const length = text.trim().length;
  const diversity = new Set(text.toLowerCase().replace(/[^a-z0-9 ]/g, '').split(/\s+/).filter(Boolean)).size;
  return Math.min(97, 48 + Math.floor(length / 7) + Math.min(28, diversity));
}

export function generateIntelligence({ input = '' }: IntelligenceInput) {
  const subject = input.trim() || product.placeholder;
  const confidence = score(subject);
  const urgency = confidence > 82 ? 'high' : confidence > 66 ? 'medium' : 'starter';
  return {
    product: product.repo,
    category: product.category,
    subject,
    confidence,
    urgency,
    executive_summary: product.promise,
    immediate_outputs: product.outputs.map((output, index) => ({
      title: output,
      detail: output + ' for: ' + subject,
      priority: index === 0 ? 'primary' : index === 1 ? 'supporting' : 'next'
    })),
    automation_plan: product.modules.map((module, index) => ({
      stage: index + 1,
      module,
      value: 'Automate ' + module.toLowerCase() + ' so ' + product.audience + ' can move faster with less manual work.'
    })),
    future_addons: product.next.map((addon, index) => ({
      name: addon,
      horizon: index < 2 ? 'v2' : 'v3',
      contributor_lane: index % 2 === 0 ? 'integration' : 'product intelligence'
    })),
    contributor_brief: 'Improve ' + product.repo + ' by making ' + product.category.toLowerCase() + ' easier for ' + product.audience + '.',
    generated_at: new Date().toISOString()
  };
}
