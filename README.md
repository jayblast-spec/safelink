<div align="center">

# SafeLink

### Inspect Before You Click

SafeLink checks a URL's redirect chain and social-engineering signals before anyone in your team clicks it, returning a clear verdict instead of raw technical output.

<p>
  <a href="https://safelink-wheat.vercel.app"><img alt="Live Demo" src="https://img.shields.io/badge/Live-Demo-1D4ED8?style=for-the-badge&logo=vercel&logoColor=white"></a>
  <a href="https://github.com/jayblast-spec/safelink"><img alt="GitHub Repo" src="https://img.shields.io/badge/GitHub-Repository-181717?style=for-the-badge&logo=github&logoColor=white"></a>
</p>

<p>
  <img alt="Next.js" src="https://img.shields.io/badge/Next.js-App%20Router-000000?style=flat-square&logo=next.js&logoColor=white">
  <img alt="React" src="https://img.shields.io/badge/React-19-1D4ED8?style=flat-square&logo=react&logoColor=white">
  <img alt="TypeScript" src="https://img.shields.io/badge/TypeScript-Strict-3178C6?style=flat-square&logo=typescript&logoColor=white">
  <img alt="Tailwind CSS" src="https://img.shields.io/badge/Tailwind%20CSS-4-38BDF8?style=flat-square&logo=tailwindcss&logoColor=white">
  <img alt="Vercel" src="https://img.shields.io/badge/Vercel-Deployment-000000?style=flat-square&logo=vercel&logoColor=white">
</p>

<p>
  <img alt="Animated SafeLink headline" src="https://readme-typing-svg.demolab.com?font=JetBrains+Mono&weight=700&size=18&duration=2600&pause=650&color=1D4ED8&center=true&vCenter=true&width=760&lines=Paste+a+URL+%E2%86%92+get+a+verdict;Redirect+chain+inspection%2C+hop+by+hop;Safe+%2F+Suspicious+%2F+Dangerous%2C+plain+English;No+signup%2C+results+in+seconds">
</p>

</div>

## What It Does

SafeLink takes any URL and returns a plain-English risk verdict by tracing its full redirect chain and evaluating the destination for phishing and social-engineering signals — designed for the moment before someone clicks a link from an email, text, or DM.

## How It Works

- Next.js App Router front end (`app/page.tsx`) handles the URL input and renders the verdict.
- `app/api/url-scan/route.ts` submits the URL to VirusTotal's real API (identified by a base64 URL ID) and reads back the multi-engine verdict server-side — no visitor-supplied key needed, the app holds its own.
- Styling is Tailwind CSS 4.

## Engineering Notes

**The real problem:** a phishing link needs a verdict *before* you click, not after — and running your own malware sandbox per request isn't realistic for a free tool, so the real leverage is aggregating engines that already do this at scale.

**The approach:** `url-scan` submits the target to VirusTotal, which runs it against dozens of antivirus/URL-reputation engines simultaneously, then polls for the completed analysis rather than trusting a possibly-stale cached verdict.

**One real number:** URLs are identified to VirusTotal by a base64-encoded (padding-stripped) form of the URL itself — VirusTotal's own addressing scheme, not an internally invented ID.

**Not handled yet:** with no `VIRUSTOTAL_API_KEY` configured, the endpoint returns `{ unavailable: true }` rather than a fake verdict — and the homepage "intelligence" summary is a decorative layer disconnected from the real scan result.

## Live

Production: **https://safelink-wheat.vercel.app**

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js (App Router) |
| UI Library | React 19 |
| Language | TypeScript |
| Styling | Tailwind CSS 4 |
| Server Logic | Next.js API routes (`/api/url-scan`, `/api/intelligence`) |
| Deployment | Vercel |

<p align="center">
  <img alt="ArkNet Digital" src="https://capsule-render.vercel.app/api?type=rect&height=70&color=0:1D4ED8,55:0B1E3D,100:020617&text=ArkNet%20Digital%20%7C%20Contact%3A%20michael%40arknet.digital&fontColor=FAFAFA&fontSize=16&fontAlign=50&animation=fadeIn">
</p>
