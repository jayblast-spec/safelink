function toUrlId(url: string): string {
  return Buffer.from(url, "utf-8").toString("base64").replace(/=+$/, "");
}

export async function POST(request: Request) {
  let target: string | undefined;
  try {
    const body = await request.json();
    target = typeof body?.url === "string" ? body.url.trim() : undefined;
  } catch {
    return Response.json({ error: "Invalid request body." }, { status: 400 });
  }

  if (!target) {
    return Response.json({ error: "Enter a URL to scan." }, { status: 400 });
  }

  let parsed: URL;
  try {
    parsed = new URL(target.match(/^https?:\/\//i) ? target : `http://${target}`);
  } catch {
    return Response.json({ error: "Enter a valid URL." }, { status: 400 });
  }

  const apiKey = process.env.VIRUSTOTAL_API_KEY;
  if (!apiKey) {
    return Response.json({ unavailable: true });
  }

  const headers = { "x-apikey": apiKey };
  const urlId = toUrlId(parsed.toString());

  try {
    const lookup = await fetch(`https://www.virustotal.com/api/v3/urls/${urlId}`, {
      headers,
    });

    if (lookup.ok) {
      const data = await lookup.json();
      return Response.json(buildReport(parsed.toString(), data?.data));
    }

    if (lookup.status !== 404) {
      return Response.json({ error: "Scan failed. Try again shortly." }, { status: 502 });
    }

    const submit = await fetch("https://www.virustotal.com/api/v3/urls", {
      method: "POST",
      headers: { ...headers, "Content-Type": "application/x-www-form-urlencoded" },
      body: `url=${encodeURIComponent(parsed.toString())}`,
    });

    if (!submit.ok) {
      return Response.json({ error: "Scan failed. Try again shortly." }, { status: 502 });
    }

    await new Promise((resolve) => setTimeout(resolve, 4000));

    const recheck = await fetch(`https://www.virustotal.com/api/v3/urls/${urlId}`, {
      headers,
    });

    if (recheck.ok) {
      const data = await recheck.json();
      return Response.json(buildReport(parsed.toString(), data?.data));
    }

    return Response.json({
      unavailable: false,
      queued: true,
      message:
        "This link hasn't been scanned before. We submitted it for analysis — check back in a minute and try again.",
    });
  } catch {
    return Response.json({ error: "Scan failed. Try again shortly." }, { status: 502 });
  }
}

function buildReport(url: string, data: unknown) {
  const attrs = (data as { attributes?: Record<string, unknown> })?.attributes ?? {};
  const stats = (attrs.last_analysis_stats ?? {}) as Record<string, number>;
  const categories = (attrs.categories ?? {}) as Record<string, string>;

  const malicious = stats.malicious ?? 0;
  const suspicious = stats.suspicious ?? 0;
  const harmless = stats.harmless ?? 0;
  const undetected = stats.undetected ?? 0;

  let verdict: "safe" | "suspicious" | "malicious" = "safe";
  if (malicious > 0) verdict = "malicious";
  else if (suspicious > 0) verdict = "suspicious";

  return {
    unavailable: false,
    queued: false,
    url,
    verdict,
    stats: { malicious, suspicious, harmless, undetected },
    categories: Object.values(categories).slice(0, 5),
    lastAnalysisDate: attrs.last_analysis_date ?? null,
  };
}
