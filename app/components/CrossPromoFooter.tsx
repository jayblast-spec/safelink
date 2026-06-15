const TOOLS = [
  { name: "Exposure Watch", description: "Email & password breach checks", live: true, url: "https://exposure-watch.vercel.app" },
  { name: "PortGuard", description: "Exposed port & device scanner", live: true, url: "https://portguard-six.vercel.app" },
  { name: "SafeLink", description: "Link & file safety checker", live: true, url: "https://safelink-wheat.vercel.app" },
  { name: "SubnetPilot", description: "Subnet & CIDR calculator", live: true, url: "https://subnetpilot.vercel.app" },
  { name: "ThreatPulse", description: "Latest vulnerability feed", live: false, url: null },
];

export default function CrossPromoFooter() {
  return (
    <footer className="mt-10 border-t border-border pt-6">
      <p className="text-xs font-semibold uppercase tracking-wide text-muted">
        More free tools
      </p>
      <div className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2">
        {TOOLS.map((tool) => {
          const card = (
            <div className="flex items-center justify-between rounded-lg border border-border bg-surface px-3 py-2">
              <div>
                <p className="text-sm font-medium text-foreground">{tool.name}</p>
                <p className="text-xs text-muted">{tool.description}</p>
              </div>
              {!tool.live && (
                <span className="rounded-full bg-surface-2 px-2 py-1 text-[10px] font-semibold text-muted">
                  Soon
                </span>
              )}
            </div>
          );
          return tool.live && tool.url ? (
            <a key={tool.name} href={tool.url} target="_blank" rel="noopener noreferrer">
              {card}
            </a>
          ) : (
            <div key={tool.name}>{card}</div>
          );
        })}
      </div>
      <p className="mt-6 text-center text-xs text-muted">Built by ArkNet Digital</p>
    </footer>
  );
}
