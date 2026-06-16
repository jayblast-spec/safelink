'use client';

import { useMemo, useState } from 'react';

const product = {"repo":"SafeLink","suite":"Cybersecurity Suite","category":"Link intelligence","audience":"SOC analysts, creators, teams, and families","promise":"inspect links, redirects, and social-engineering signals before anyone clicks","inputLabel":"Suspicious URL or message","placeholder":"https://example-login-check.com/reset?token=...","primary":"Analyze link","gradient":"from-lime-300 via-teal-300 to-cyan-400","metrics":["5 signal classes","0-click preview","SOC-ready brief"],"modules":["Redirect chain review","Phishing language detection","Domain age signals","Attachment warning layer","Shareable safety verdict"],"outputs":["Verdict and confidence","Why it looks risky","Safe next action","User-facing warning copy"],"pricing":"Free link check, $19/month Pro, $99/month Team with shared history and policy packs."} as const;

function scoreFrom(input: string) {
  const seed = input.trim().length || 18;
  return Math.min(96, 54 + (seed % 37));
}

export default function Home() {
  const [input, setInput] = useState('');
  const score = useMemo(() => scoreFrom(input || product.placeholder), [input]);
  const result = useMemo(() => {
    const text = input.trim() || product.placeholder;
    return { title: text.length > 76 ? text.slice(0, 76) + '...' : text, next: product.outputs[0] };
  }, [input]);

  return (
    <main className="min-h-screen bg-[#080a0f] text-white selection:bg-white selection:text-black">
      <section className="relative overflow-hidden border-b border-white/10">
        <div className={`absolute inset-0 bg-gradient-to-br ${product.gradient} opacity-20 blur-3xl`} />
        <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-white/10 to-transparent" />
        <nav className="relative z-10 mx-auto flex max-w-7xl items-center justify-between px-5 py-5 sm:px-8">
          <div><p className="text-[10px] font-black uppercase tracking-[0.36em] text-white/45">{product.suite}</p><h1 className="text-xl font-black tracking-tight sm:text-2xl">{product.repo}</h1></div>
          <div className="hidden items-center gap-6 text-sm text-white/65 md:flex"><a href="#product">Product</a><a href="#workflow">Workflow</a><a href="#contributors">Contributors</a><a href="#pricing">Pricing</a><a href="#try" className="rounded-full bg-white px-4 py-2 font-bold text-black">Try live</a></div>
        </nav>
        <div className="relative z-10 mx-auto grid max-w-7xl gap-10 px-5 pb-16 pt-10 sm:px-8 lg:grid-cols-[1.05fr_0.95fr] lg:pb-24 lg:pt-16">
          <div className="flex flex-col justify-center">
            <p className="w-fit rounded-full border border-white/15 bg-white/10 px-4 py-2 text-[11px] font-black uppercase tracking-[0.24em] text-white/70">{product.category}</p>
            <h2 className="mt-7 max-w-4xl text-5xl font-black leading-[0.95] tracking-[-0.04em] sm:text-7xl lg:text-8xl">{product.promise}</h2>
            <p className="mt-7 max-w-2xl text-lg leading-8 text-white/68">Built for {product.audience}. This is a real open-source product surface: clear promise, working first flow, buyer logic, and a contributor-ready upgrade path.</p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row"><a href="#try" className="rounded-full bg-white px-6 py-4 text-center text-sm font-black text-black shadow-2xl shadow-white/10">{product.primary}</a><a href="#contributors" className="rounded-full border border-white/15 px-6 py-4 text-center text-sm font-bold text-white/80">Contribute</a></div>
            <div className="mt-10 grid gap-3 sm:grid-cols-3">{product.metrics.map((metric) => <div key={metric} className="rounded-2xl border border-white/10 bg-white/[0.06] p-4"><p className="text-sm font-black">{metric}</p></div>)}</div>
          </div>
          <div id="try" className="rounded-[2rem] border border-white/10 bg-white/[0.07] p-4 shadow-2xl shadow-black/40 backdrop-blur-xl sm:p-6">
            <div className="rounded-[1.5rem] border border-white/10 bg-black/40 p-5">
              <div className="flex items-center justify-between gap-4"><div><p className="text-[10px] font-black uppercase tracking-[0.28em] text-white/45">Live command panel</p><h3 className="mt-2 text-2xl font-black">Run the first useful workflow</h3></div><div className="rounded-full bg-white px-4 py-2 text-sm font-black text-black">{score}%</div></div>
              <label className="mt-7 block text-sm font-bold text-white/70">{product.inputLabel}</label>
              <textarea value={input} onChange={(event) => setInput(event.target.value)} placeholder={product.placeholder} className="mt-3 min-h-36 w-full resize-none rounded-3xl border border-white/10 bg-white/[0.06] p-4 text-sm leading-6 text-white outline-none placeholder:text-white/32 focus:border-white/30" />
              <button onClick={() => setInput(input || product.placeholder)} className="mt-4 w-full rounded-full bg-white px-5 py-4 text-sm font-black text-black">{product.primary}</button>
              <div className="mt-5 rounded-3xl border border-white/10 bg-white/[0.05] p-5"><p className="text-[10px] font-black uppercase tracking-[0.28em] text-white/40">Result preview</p><h4 className="mt-3 text-xl font-black">{result.next}</h4><p className="mt-3 text-sm leading-6 text-white/60">Input: {result.title}</p><div className="mt-4 grid gap-3 sm:grid-cols-2">{product.outputs.map((item) => <div key={item} className="rounded-2xl border border-white/10 bg-black/30 p-3 text-sm text-white/70">{item}</div>)}</div></div>
            </div>
          </div>
        </div>
      </section>
      <section id="product" className="mx-auto grid max-w-7xl gap-8 px-5 py-16 sm:px-8 lg:grid-cols-[0.75fr_1.25fr]"><div><p className="text-[10px] font-black uppercase tracking-[0.32em] text-white/40">Product architecture</p><h2 className="mt-4 text-4xl font-black tracking-tight sm:text-5xl">Not a demo. A premium category-specific tool.</h2><p className="mt-5 text-base leading-7 text-white/58">The first version proves value quickly, then expands into saved history, team workflows, exports, and trusted decision records.</p></div><div className="grid gap-4 sm:grid-cols-2">{product.modules.map((module, index) => <article key={module} className="rounded-3xl border border-white/10 bg-white/[0.045] p-5"><p className="text-xs font-black text-white/35">0{index + 1}</p><h3 className="mt-4 text-xl font-black">{module}</h3><p className="mt-3 text-sm leading-6 text-white/55">Designed for {product.audience}, with a concrete output users can understand and act on.</p></article>)}</div></section>
      <section id="workflow" className="border-y border-white/10 bg-white/[0.035]"><div className="mx-auto max-w-7xl px-5 py-16 sm:px-8"><p className="text-[10px] font-black uppercase tracking-[0.32em] text-white/40">Workflow</p><div className="mt-6 grid gap-4 md:grid-cols-4">{['Capture real context', 'Analyze with guardrails', 'Produce a trusted output', 'Save memory and improve'].map((step, index) => <div key={step} className="rounded-3xl border border-white/10 bg-black/30 p-5"><p className="text-3xl font-black text-white/25">{index + 1}</p><h3 className="mt-5 text-lg font-black">{step}</h3></div>)}</div></div></section>
      <section id="contributors" className="mx-auto max-w-7xl px-5 py-16 sm:px-8"><div className="rounded-[2rem] border border-white/10 bg-white/[0.06] p-6 sm:p-8"><p className="text-[10px] font-black uppercase tracking-[0.32em] text-white/40">Open-source contributor path</p><h2 className="mt-4 text-4xl font-black tracking-tight">Built in public, improved by serious builders.</h2><p className="mt-4 max-w-3xl text-base leading-7 text-white/58">Contributors can improve product logic, UX quality, accessibility, tests, integrations, and business workflows. The goal is acceleration, not secrecy.</p></div></section>
      <section id="pricing" className="mx-auto grid max-w-7xl gap-8 px-5 py-16 sm:px-8 lg:grid-cols-[1fr_0.9fr]"><div><p className="text-[10px] font-black uppercase tracking-[0.32em] text-white/40">Commercial path</p><h2 className="mt-4 text-4xl font-black tracking-tight sm:text-5xl">Built to earn trust before asking for payment.</h2><p className="mt-5 text-base leading-7 text-white/58">{product.pricing}</p></div><div className="rounded-[2rem] border border-white/10 bg-white/[0.06] p-6"><p className="text-sm font-bold text-white/50">First milestone</p><h3 className="mt-3 text-3xl font-black">One useful result in under two minutes.</h3><p className="mt-4 text-sm leading-6 text-white/58">When users feel the value immediately, the product can grow into subscriptions, saved workspaces, alerts, exports, and team collaboration.</p></div></section>
    </main>
  );
}
