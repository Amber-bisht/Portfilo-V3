import React, { useState, useEffect } from 'react';
import Layout from '@/components/Layout';
import Head from 'next/head';
import Link from 'next/link';
import BlogAudioPlayer from '@/components/BlogAudioPlayer';
import { 
  Play, 
  Pause, 
  RotateCcw, 
  Volume2, 
  Copy, 
  Check, 
  ChevronRight,
  Shield,
  Layers,
  Terminal,
  AlertCircle
} from 'lucide-react';

interface CodeSnippetProps {
  code: string;
  language?: string;
}

const CodeSnippet: React.FC<CodeSnippetProps> = ({ code, language = 'text' }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="my-6 rounded-xl overflow-hidden bg-neutral-950 border border-white/10">
      <div className="flex items-center justify-between px-4 py-2.5 bg-neutral-900/90 border-b border-white/10 font-mono text-xs text-zinc-400">
        <span className="uppercase tracking-wider text-[11px] font-semibold">{language}</span>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-white/5 hover:bg-white/10 text-zinc-300 hover:text-white transition-colors text-xs cursor-pointer"
        >
          {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
          <span>{copied ? 'Copied' : 'Copy'}</span>
        </button>
      </div>
      <pre className="p-4 md:p-5 text-xs md:text-sm font-mono text-zinc-200 overflow-x-auto leading-relaxed">
        <code>{code}</code>
      </pre>
    </div>
  );
};

export default function EconomicsOfBotWarsPage() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeSection, setActiveSection] = useState('intro');

  const tocItems = [
    { id: 'intro', title: 'Introduction' },
    { id: 'edge-layers', title: 'Edge validation in layers' },
    { id: 'tcp-fingerprinting', title: 'TCP/IP fingerprinting (p0f)' },
    { id: 'tls-fingerprinting', title: 'TLS fingerprinting: JA3 to JA4' },
    { id: 'http2-fingerprinting', title: 'HTTP/2 fingerprinting' },
    { id: 'browser-interrogation', title: 'Runtime browser interrogation' },
    { id: 'evasion-strategies', title: 'How the other side responds' },
    { id: 'ip-reputation', title: 'Proxies & IP reputation' },
    { id: 'defensive-architecture', title: 'Building defenses that hold up' }
  ];

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200;
      for (const item of tocItems) {
        const element = document.getElementById(item.id);
        if (element) {
          const top = element.offsetTop;
          const height = element.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(item.id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <Layout title="The Economics of Bot Wars | Amber Bisht">
      <Head>
        <title>The Economics of Bot Wars: How CAPTCHAs, Fingerprinting, and Bypass Strategies Shape the Modern Web</title>
        <meta 
          name="description" 
          content="An in-depth security engineering analysis of how modern bot defense layers operate (TCP, TLS JA4, HTTP/2, DOM telemetry) and why bot mitigation is fundamentally an economic problem." 
        />
      </Head>

      <div className="bg-black text-white min-h-screen">
        
        {/* Top Header Hero */}
        <div className="pt-20 pb-12 px-6 max-w-5xl mx-auto text-center">
          
          {/* Metadata row */}
          <div className="flex items-center justify-center gap-3 text-xs md:text-sm font-sans text-zinc-400 mb-6">
            <span>January 22, 2026</span>
            <span className="text-zinc-600">·</span>
            <span className="text-zinc-300 font-medium">Security Deep Dive</span>
            <span className="text-zinc-600">·</span>
            <span>9 min read</span>
          </div>

          {/* Title */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.12] max-w-4xl mx-auto mb-6">
            The Economics of Bot Wars: How CAPTCHAs, Fingerprinting, and Bypass Strategies Shape the Modern Web
          </h1>

          {/* Byline */}
          <p className="text-sm md:text-base text-zinc-400 font-sans mb-10">
            By <span className="text-zinc-200 font-medium">Amber Bisht</span>, Full-Stack & Systems Engineer
          </p>

          {/* Minimalist Audio / Listen Bar with live audio playback */}
          <BlogAudioPlayer 
            audioSrc={['/bot1.mp3', '/bot2.mp3']} 
            trackLabels={['Part 1', 'Part 2']}
            initialDuration={525} 
          />
        </div>

        {/* Divider */}
        <div className="max-w-7xl mx-auto px-6">
          <div className="border-b border-zinc-800/80 mb-12" />
        </div>

        {/* Main Content Area with Sticky Left Sidebar */}
        <div className="max-w-7xl mx-auto px-6 pb-28 flex flex-col lg:flex-row items-stretch gap-12 lg:gap-16 relative">
          
          {/* Left Sticky Sidebar (Table of Contents) */}
          <aside className="lg:w-64 shrink-0 hidden lg:block self-stretch relative">
            <div className="sticky top-28 space-y-4">
              <div className="text-[11px] font-semibold uppercase tracking-wider text-zinc-500 mb-3">
                Contents
              </div>
              <nav className="space-y-2.5 text-xs font-sans">
                {tocItems.map((item) => (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    className={`block transition-colors leading-relaxed ${
                      activeSection === item.id 
                        ? 'text-white font-semibold' 
                        : 'text-zinc-400 hover:text-zinc-200'
                    }`}
                  >
                    {item.title}
                  </a>
                ))}
              </nav>
            </div>
          </aside>

          {/* Right Main Article */}
          <article className="max-w-3xl flex-1 text-zinc-300 text-base md:text-[17px] leading-[1.8] font-normal">
            
            {/* Section: Intro */}
            <section id="intro" className="mb-14 scroll-mt-24">
              <p className="mb-6">
                If you look at the raw request logs of any major web platform today, you&apos;ll see a quiet, ongoing war. Automated bot traffic now accounts for more than half of all internet activity, according to recent bad-bot telemetry. The web has quietly become a machine-majority landscape, and every major platform has had to build infrastructure to cope with it.
              </p>
              <p>
                To protect infrastructure, prevent ad revenue fraud, stop credential stuffing, and keep free API tiers from being drained, platforms deploy Web Application Firewalls and anti-bot systems — Cloudflare Turnstile, Akamai Bot Manager, hCaptcha, Datadome, and others. In this piece, we look at how these defense layers work mechanically, how modern automation gets around them, and why bot defense ultimately comes down to economics rather than pure cryptography.
              </p>
            </section>

            {/* Section: Edge validation happens in layers */}
            <section id="edge-layers" className="mb-14 scroll-mt-24">
              <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-white mt-12 mb-6">
                Edge validation happens in layers
              </h2>
              <p className="mb-6">
                When a connection hits a WAF-protected edge server, validation runs sequentially from the transport layer up through the application layer, long before your backend ever sees the request:
              </p>

              <ul className="space-y-3 mb-6 pl-5 list-disc text-zinc-300">
                <li>
                  <strong className="text-white">L4 Transport</strong> — a TCP SYN check (p0f-style) verifying TTL and window size at the kernel level.
                </li>
                <li>
                  <strong className="text-white">L5 Session</strong> — the TLS Client Hello, where a JA4 fingerprint is extracted and GREASE ciphers are validated.
                </li>
                <li>
                  <strong className="text-white">L7 Application</strong> — HTTP/2 SETTINGS frames, checked for stream priority tree structure and initial window updates.
                </li>
                <li>
                  <strong className="text-white">Runtime (V8)</strong> — JavaScript DOM telemetry that inspects browser prototypes and WebGL hardware reporting.
                </li>
              </ul>

              <p>
                Each of these layers catches a different class of forged client. Let&apos;s go through them one at a time.
              </p>
            </section>

            {/* Section: TCP/IP fingerprinting */}
            <section id="tcp-fingerprinting" className="mb-14 scroll-mt-24">
              <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-white mt-12 mb-6">
                TCP/IP fingerprinting happens before a single byte of TLS is read
              </h2>
              <p className="mb-6">
                Before any encrypted payload is touched, a WAF can already profile a connection using Passive OS Fingerprinting, or p0f. During the three-way TCP handshake, the client&apos;s SYN packet reveals its initial TTL (Linux typically ships 64, Windows 128), its maximum segment size, its initial window size, and the order in which it lists TCP options like MSS, window scale, SACK-permitted, NOP, and timestamps.
              </p>
              <p>
                This is why header spoofing alone doesn&apos;t work. If a scraper sets its headers to claim it&apos;s Chrome on Windows 11, but its SYN packet carries a TTL of 64 and Linux-ordered TCP options, the WAF can drop the connection at the kernel layer before the forged headers are ever inspected.
              </p>
            </section>

            {/* Section: TLS fingerprinting */}
            <section id="tls-fingerprinting" className="mb-14 scroll-mt-24">
              <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-white mt-12 mb-6">
                TLS fingerprinting: JA3 gave way to JA4
              </h2>
              <p className="mb-6">
                Once the TCP socket is up, the client sends a TLS Client Hello containing its cryptographic preferences — and this, too, is a fingerprint. JA4 succeeded the older JA3 scheme with a more structured, human-readable format built as three parts: JA4a, JA4b, and JA4c.
              </p>
              <p className="mb-6">
                JA4a encodes the transport and negotiated protocol — for example, TCP, TLS 1.3, SNI presence, cipher count, extension count, and ALPN (HTTP/2). JA4b is a SHA-256 hash of the client&apos;s supported cipher suites, sorted alphabetically so that reordering doesn&apos;t create false mismatches. JA4c is a similar hash, but of the TLS extensions and signature algorithms.
              </p>
              <p>
                One detail trips up a lot of scraping tools: GREASE. Chromium-based browsers deliberately inject meaningless placeholder values into their cipher and extension lists — a mechanism designed to keep the protocol extensible without breaking on unexpected values. Standard HTTP client libraries like axios or Python&apos;s requests don&apos;t do this. So when a request shows up with a Chrome user-agent but no GREASE values in its TLS handshake, that mismatch alone is often enough to flag it instantly.
              </p>
            </section>

            {/* Section: HTTP/2 fingerprinting */}
            <section id="http2-fingerprinting" className="mb-14 scroll-mt-24">
              <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-white mt-12 mb-6">
                HTTP/2 has its own fingerprint too
              </h2>
              <p className="mb-6">
                If the connection negotiates HTTP/2, the client sends a SETTINGS frame right after the connection preface — and the exact values and ordering in that frame are characteristic of the client software that generated them. Real Chromium sends a specific, consistent profile (header table size, push settings, max concurrent streams, initial window size, and so on), produced by its underlying nghttp2 engine.
              </p>

              <CodeSnippet
                language="text"
                code={`[SETTINGS_HEADER_TABLE_SIZE: 65536]
[SETTINGS_ENABLE_PUSH: 0]
[SETTINGS_MAX_CONCURRENT_STREAMS: 1000]
[SETTINGS_INITIAL_WINDOW_SIZE: 6291456]
[SETTINGS_MAX_FRAME_SIZE: 16384]
[SETTINGS_MAX_HEADER_LIST_SIZE: 262144]`}
              />

              <p className="mb-6">
                Anti-bot systems check the order and values of these settings, the structure of the HTTP/2 stream priority tree used to sequence asset loading, and how WINDOW_UPDATE frames adjust flow-control capacity over time. Automation frameworks that build HTTP/2 requests from scratch, rather than through a real browser engine, tend to produce settings frames that don&apos;t match any known browser — another tell.
              </p>
              <p>
                As one security researcher put it: bot defense isn&apos;t a mathematical cryptography puzzle. It&apos;s a game of computational and financial economics.
              </p>
            </section>

            {/* Section: Runtime browser interrogation */}
            <section id="browser-interrogation" className="mb-14 scroll-mt-24">
              <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-white mt-12 mb-6">
                When the network layer passes, the browser gets interrogated
              </h2>
              <p className="mb-6">
                If a connection clears the network-level checks, many WAFs still serve a client-side JavaScript challenge that runs inside V8 and probes the browser environment directly.
              </p>
              <p className="mb-6">
                This looks for automation artifacts left behind by tools like Chrome DevTools Protocol drivers — properties such as <code className="text-zinc-200 bg-zinc-900 px-1.5 py-0.5 rounded font-mono text-sm">navigator.webdriver</code>, CDP-injected globals, or DOM properties prefixed with <code className="text-zinc-200 bg-zinc-900 px-1.5 py-0.5 rounded font-mono text-sm">__webdriver</code>, <code className="text-zinc-200 bg-zinc-900 px-1.5 py-0.5 rounded font-mono text-sm">__selenium</code>, or <code className="text-zinc-200 bg-zinc-900 px-1.5 py-0.5 rounded font-mono text-sm">$cdc_</code>. It also checks whether native methods have been tampered with: if a script has patched something like <code className="text-zinc-200 bg-zinc-900 px-1.5 py-0.5 rounded font-mono text-sm">document.createElement</code> using <code className="text-zinc-200 bg-zinc-900 px-1.5 py-0.5 rounded font-mono text-sm">Object.defineProperty</code> or a <code className="text-zinc-200 bg-zinc-900 px-1.5 py-0.5 rounded font-mono text-sm">Proxy</code>, calling <code className="text-zinc-200 bg-zinc-900 px-1.5 py-0.5 rounded font-mono text-sm">Function.prototype.toString</code> on it won&apos;t return the expected <code className="text-zinc-200 bg-zinc-900 px-1.5 py-0.5 rounded font-mono text-sm">[native code]</code> signature. Some scripts even parse the JavaScript error stack trace looking for file paths that reveal Puppeteer or Playwright.
              </p>
              <p>
                Hardware-level checks round this out. Canvas fingerprinting draws hidden shapes and text and hashes the resulting pixels, which vary subtly by GPU and anti-aliasing driver. WebGL renderer queries can reveal software renderers like SwiftShader or LLVMpipe, which are common inside virtual machines. And font enumeration measures the pixel bounds of fallback fonts rendered in a hidden iframe, which differs across real operating systems.
              </p>
            </section>

            {/* Section: How the other side responds */}
            <section id="evasion-strategies" className="mb-14 scroll-mt-24">
              <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-white mt-12 mb-6">
                How the other side responds
              </h2>
              <p className="mb-6">
                Operators building large-scale automation respond to each of these layers directly. Low-level network spoofing tools — compiled in Go or Rust, such as tls-client or curl-impersonate — reproduce a real browser&apos;s TLS cipher list, extension ordering, GREASE distribution, and HTTP/2 settings frame without the overhead of actually rendering a page. Browser-patching tools like Rebrowser modify Chromium at the V8 debugger level before any page script runs, which removes the prototype-tampering traces and CDP indicators that DOM telemetry checks look for.
              </p>
            </section>

            {/* Section: Proxies & ASN reputation */}
            <section id="ip-reputation" className="mb-14 scroll-mt-24">
              <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-white mt-12 mb-6">
                Proxies & IP reputation hierarchy
              </h2>
              <p className="mb-6">
                Then there&apos;s IP reputation, which is arguably the more decisive factor in practice. WAFs score incoming requests partly by the autonomous system network the IP belongs to:
              </p>

              {/* Minimalist OpenAI-Style Table */}
              <div className="overflow-x-auto my-8">
                <table className="w-full text-left text-sm font-sans border-collapse">
                  <thead>
                    <tr className="border-b border-zinc-800 text-zinc-400 text-xs font-medium uppercase tracking-wider">
                      <th className="py-3 px-4">Proxy type</th>
                      <th className="py-3 px-4">Cost</th>
                      <th className="py-3 px-4">ASN type</th>
                      <th className="py-3 px-4">Block risk</th>
                      <th className="py-3 px-4">Typical use</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-900 text-zinc-300 text-[13px]">
                    <tr>
                      <td className="py-3.5 px-4 font-medium text-white">Datacenter</td>
                      <td className="py-3.5 px-4 font-mono">$0.10–$0.50/GB</td>
                      <td className="py-3.5 px-4">Hosting providers (AWS, DigitalOcean, OVH)</td>
                      <td className="py-3.5 px-4 text-red-400 font-medium">Very high</td>
                      <td className="py-3.5 px-4 text-zinc-400">High-speed API queries on lightly protected targets</td>
                    </tr>
                    <tr>
                      <td className="py-3.5 px-4 font-medium text-white">Residential</td>
                      <td className="py-3.5 px-4 font-mono">$2–$12/GB</td>
                      <td className="py-3.5 px-4">Consumer ISPs (Comcast, BT)</td>
                      <td className="py-3.5 px-4 text-yellow-400 font-medium">Medium</td>
                      <td className="py-3.5 px-4 text-zinc-400">Standard web scraping and search</td>
                    </tr>
                    <tr>
                      <td className="py-3.5 px-4 font-medium text-white">Mobile LTE</td>
                      <td className="py-3.5 px-4 font-mono">$5–$20/GB</td>
                      <td className="py-3.5 px-4">Cellular carriers (AT&T, Verizon)</td>
                      <td className="py-3.5 px-4 text-emerald-400 font-medium">Very low</td>
                      <td className="py-3.5 px-4 text-zinc-400">Bypassing strict logins and CGNAT-protected endpoints</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <p>
                Mobile proxies are the hardest to block for a structural reason: carrier-grade NAT means a single public IPv4 address is shared by thousands of real devices at once. Blocking a mobile IP risks blocking a huge number of legitimate users along with it, so WAFs are systematically more lenient toward cellular ASNs.
              </p>
            </section>

            {/* Section: Building defenses that hold up */}
            <section id="defensive-architecture" className="mb-14 scroll-mt-24">
              <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-white mt-12 mb-6">
                Building defenses that hold up
              </h2>
              <p className="mb-6">
                None of this means defenders are stuck. A few architectural choices meaningfully raise the cost of automation:
              </p>

              <ul className="space-y-4 mb-8 pl-5 list-disc text-zinc-300">
                <li>
                  <strong className="text-white">Push validation to the edge.</strong> Serving JS challenges and validating TLS signatures inside edge workers (Cloudflare Workers, AWS CloudFront Functions) keeps this load off your database and application tier entirely.
                </li>
                <li>
                  <strong className="text-white">Cross-check identity claims.</strong> Verify that a request&apos;s TLS fingerprint actually matches the user-agent it claims — a &quot;Chrome&quot; request arriving with Python&apos;s TLS cipher list should be dropped at the edge, not deeper in the stack.
                </li>
                <li>
                  <strong className="text-white">Plant honeypots in the DOM.</strong> Hidden fields that real users never interact with, but that naive HTML-parsing scrapers will happily fill in or click, are a cheap and effective tripwire.
                </li>
                <li>
                  <strong className="text-white">Use edge-validated session cookies.</strong> Encrypted state flags checked continuously through a session make it expensive for automation to simply replay a single successful handshake indefinitely.
                </li>
              </ul>

              <p className="border-t border-zinc-800 pt-8 text-zinc-300">
                The throughline across all of this is that no single layer is decisive on its own. TCP fingerprinting, TLS fingerprinting, HTTP/2 fingerprinting, and JS-level telemetry each catch a different class of mismatch, and serious anti-bot systems layer them together. Automation, in turn, has to get every layer right simultaneously — which is precisely why this remains a game of raising the other side&apos;s cost, not a puzzle with a final, permanent solution.
              </p>
            </section>

          </article>
        </div>

      </div>
    </Layout>
  );
}
