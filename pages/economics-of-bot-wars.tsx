import React, { useState } from 'react';
import Layout from '@/components/Layout';
import { motion } from 'framer-motion';
import Head from 'next/head';
import Image from 'next/image';
import { 
  ShieldCheck, 
  Terminal, 
  Cpu, 
  Server, 
  Lock, 
  Zap, 
  Globe, 
  Code, 
  ChevronDown, 
  CheckCircle2, 
  AlertTriangle,
  Copy,
  Check,
  Layers,
  ArrowRight,
  Radio
} from 'lucide-react';

interface CodeSnippetProps {
  code: string;
  language: string;
}

const CodeSnippet: React.FC<CodeSnippetProps> = ({ code, language }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="my-6 rounded-2xl overflow-hidden bg-neutral-950 border border-white/10 shadow-2xl">
      <div className="flex items-center justify-between px-4 py-3 bg-neutral-900 border-b border-white/10 font-mono text-xs">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500/80" />
          <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
          <div className="w-3 h-3 rounded-full bg-green-500/80" />
        </div>
        <span className="text-gray-400 font-bold uppercase tracking-widest">{language}</span>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white transition-colors text-xs cursor-pointer"
        >
          {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
          <span>{copied ? 'Copied' : 'Copy'}</span>
        </button>
      </div>
      <pre className="p-5 text-xs md:text-sm font-mono text-gray-200 overflow-x-auto leading-relaxed">
        <code>{code}</code>
      </pre>
    </div>
  );
};

interface FAQItemProps {
  question: string;
  answer: string;
}

const FAQAccordion: React.FC<FAQItemProps> = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-white/10 py-4">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between py-2 text-left font-bold text-white hover:text-makima-red transition-colors gap-4 cursor-pointer"
      >
        <span className="text-base font-cinzel">{question}</span>
        <ChevronDown className={`w-5 h-5 shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180 text-makima-red' : 'text-gray-400'}`} />
      </button>
      {isOpen && (
        <div className="py-3 text-gray-300 text-sm leading-relaxed">
          {answer}
        </div>
      )}
    </div>
  );
};

export default function EconomicsOfBotWarsPage() {
  return (
    <Layout title="The Economics of Bot Wars | Security Analysis | Amber Bisht">
      <Head>
        <title>The Economics of Bot Wars: CAPTCHAs, Fingerprinting & Bypass Mechanics</title>
        <meta name="description" content="An in-depth security analysis of modern bot protection mechanisms (Cloudflare, reCAPTCHA, JA3/JA4), automated bypasses, and low-level web defense." />
      </Head>

      <article className="py-16 px-4 md:px-8 max-w-5xl mx-auto text-gray-200">
        
        {/* Header Hero */}
        <header className="mb-12 relative">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-makima-red/15 blur-[120px] rounded-full pointer-events-none" />

          {/* Category & Metadata Pills */}
          <div className="flex items-center gap-3 mb-4 flex-wrap">
            <span className="px-3 py-1 bg-makima-red/10 border border-makima-red/30 text-makima-red rounded-full text-xs font-mono font-bold tracking-wider uppercase">
              Security Deep Dive
            </span>
            <span className="text-white/20">•</span>
            <span className="text-gray-400 font-mono text-xs">Published 2026-06-21</span>
            <span className="text-white/20">•</span>
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 bg-white/5 text-gray-300 border border-white/10 rounded-full text-xs font-mono">
              <span className="w-1.5 h-1.5 rounded-full bg-makima-red animate-pulse" />
              <span>15 Min Read</span>
            </span>
          </div>

          <h1 className="text-3xl md:text-5xl font-cinzel font-bold text-white leading-tight mb-6">
            The Economics of <span className="text-makima-red">Bot Wars</span>: How CAPTCHAs, Fingerprinting, and Bypass Strategies Shape the Modern Web
          </h1>

          <p className="text-lg text-gray-300 leading-relaxed font-light mb-8">
            An in-depth analysis of modern bot protection mechanisms (Cloudflare, reCAPTCHA, JA3/JA4), how automated bypasses operate, and why bot defense is fundamentally a game of economics rather than pure mathematics.
          </p>

          {/* Web Image Hero Banner */}
          <div className="relative w-full h-[320px] md:h-[450px] rounded-3xl overflow-hidden border border-white/10 shadow-2xl mb-12">
            <Image
              src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=1200&auto=format&fit=crop"
              alt="Cybersecurity Bot Wars Server Matrix"
              fill
              className="object-cover object-center transform hover:scale-105 transition-transform duration-700"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/40 to-transparent" />
          </div>
        </header>

        {/* Section 1: Introduction */}
        <section className="mb-14">
          <h2 className="text-2xl md:text-3xl font-cinzel font-bold text-white mb-4 border-l-4 border-makima-red pl-4">
            Introduction
          </h2>
          <p className="text-gray-300 leading-relaxed mb-4 text-base">
            If you look at the raw request logs of any major web platform today, you'll see a quiet, ongoing war. According to recent telemetry from bad-bot research, automated bot traffic consistently accounts for <strong className="text-white">over 50% of all internet activity</strong>. The web is now a machine-majority landscape.
          </p>
          <p className="text-gray-300 leading-relaxed mb-6">
            To defend their infrastructure, prevent ad revenue fraud, stop credential stuffing, and protect free API tiers, platforms implement complex Web Application Firewall (WAF) services and anti-bot systems like <strong className="text-white">Cloudflare Turnstile, Akamai Bot Manager, hCaptcha, and Datadome</strong>.
          </p>

          <p className="text-gray-300 leading-relaxed mb-8">
            In this deep dive, we'll analyze the low-level mechanics of these defense layers, explore how modern automation bypasses them, and explain why bot defense is fundamentally a game of economics rather than pure cryptography.
          </p>

          {/* Merged Network Stack: Edge Validation Lifecycle (Unboxed & Monochrome) */}
          <div className="py-6 border-t border-b border-white/10 my-8">
            <h3 className="text-base font-bold text-white mb-2 font-mono flex items-center gap-2">
              <Layers className="w-5 h-5 text-makima-red" />
              <span>The Network Stack: Edge Validation Lifecycle</span>
            </h3>
            <p className="text-xs text-gray-400 mb-6 leading-relaxed">
              When an incoming connection hits a WAF-protected edge server, validation executes sequentially from Layer 4 up to Layer 7 before the application backend ever sees the request.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-xs font-mono">
              <div>
                <span className="text-makima-red font-bold block mb-1 uppercase tracking-wider">01 / L4 Transport</span>
                <h4 className="text-white font-bold mb-1">TCP SYN Check (p0f)</h4>
                <p className="text-gray-400 text-[11px] leading-relaxed">TTL & Window Size verification at the OS kernel level.</p>
              </div>

              <div>
                <span className="text-makima-red font-bold block mb-1 uppercase tracking-wider">02 / L5 Session</span>
                <h4 className="text-white font-bold mb-1">TLS Client Hello</h4>
                <p className="text-gray-400 text-[11px] leading-relaxed">JA4 fingerprint extraction & GREASE cipher validation.</p>
              </div>

              <div>
                <span className="text-makima-red font-bold block mb-1 uppercase tracking-wider">03 / L7 Application</span>
                <h4 className="text-white font-bold mb-1">HTTP/2 Settings</h4>
                <p className="text-gray-400 text-[11px] leading-relaxed">H2 stream priority tree & initial window update verification.</p>
              </div>

              <div>
                <span className="text-makima-red font-bold block mb-1 uppercase tracking-wider">04 / Runtime V8</span>
                <h4 className="text-white font-bold mb-1">JS DOM Telemetry</h4>
                <p className="text-gray-400 text-[11px] leading-relaxed">Executes JS runtime challenges inspecting prototypes & WebGL hardware.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 1. TCP/IP Fingerprinting (L4 p0f) */}
        <section className="mb-14">
          <h2 className="text-2xl md:text-3xl font-cinzel font-bold text-white mb-4 border-l-4 border-makima-red pl-4">
            1. TCP/IP Fingerprinting (L4 p0f)
          </h2>
          <p className="text-gray-300 leading-relaxed mb-4">
            Before a single byte of TLS payload is decrypted, the WAF analyzes TCP connection parameters. This is called <strong className="text-white">Passive OS Fingerprinting (p0f)</strong>.
          </p>
          <p className="text-gray-300 leading-relaxed mb-4">
            During the initial three-way handshake, the client sends a <code className="text-makima-gold font-mono">SYN</code> packet. The WAF inspects:
          </p>

          <ul className="space-y-3 mb-6 pl-4 text-sm text-gray-300">
            <li className="flex items-start gap-2">
              <span className="text-makima-red font-mono">•</span>
              <span><strong className="text-white">Initial Time to Live (TTL):</strong> Operating systems initialize packets with specific TTL values (Linux: <code className="text-makima-gold font-mono">64</code>, Windows: <code className="text-makima-gold font-mono">128</code>, macOS: <code className="text-makima-gold font-mono">64</code>).</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-makima-red font-mono">•</span>
              <span><strong className="text-white">Maximum Segment Size (MSS):</strong> Dictated by network hardware and OS routing defaults.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-makima-red font-mono">•</span>
              <span><strong className="text-white">Window Size ($W$):</strong> Initial TCP buffer capacity.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-makima-red font-mono">•</span>
              <span><strong className="text-white">TCP Options & Layout Order:</strong> Sequence of parameters like MSS, Window Scale (WS), SACK-Permitted, NOP, and Timestamps (TS).</span>
            </li>
          </ul>

          <div className="py-4 border-l-2 border-makima-red pl-4 my-4">
            <h4 className="text-xs font-bold text-white font-mono uppercase tracking-wider mb-1 flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-makima-red" />
              <span>The Threat Signature</span>
            </h4>
            <p className="text-xs text-gray-400 leading-relaxed">
              If a scraper modifies headers to claim Chrome on Windows 11, but the underlying TCP <code className="text-white font-mono">SYN</code> packet arrives with a TTL of <code className="text-white font-mono">64</code> and Linux TCP options, the WAF drops the connection as a forged client at the kernel layer.
            </p>
          </div>
        </section>

        {/* Section 2. TLS Fingerprinting (L5 JA3 / JA4) */}
        <section className="mb-14">
          <h2 className="text-2xl md:text-3xl font-cinzel font-bold text-white mb-4 border-l-4 border-makima-red pl-4">
            2. TLS Fingerprinting (L5 JA3 / JA4)
          </h2>
          <p className="text-gray-300 leading-relaxed mb-4">
            Once the TCP socket is established, the client initiates the TLS handshake by sending a <code className="text-makima-gold font-mono">Client Hello</code> packet containing the browser's cryptographic options.
          </p>

          <h3 className="text-xl font-bold text-white mt-6 mb-3">The JA4 Spec Breakdown</h3>
          <p className="text-gray-300 leading-relaxed mb-4">
            JA4 introduces human-readable, deterministic groupings structured as <strong className="font-mono text-white">JA4a_JA4b_JA4c</strong>:
          </p>

          <div className="py-4 border-t border-b border-white/10 text-center font-mono text-xs md:text-sm text-gray-200 my-6">
            <span className="text-white font-bold">JA4 Formula</span> = <span className="text-makima-red font-bold">JA4a (Protocol/Settings)</span> _ <span className="text-gray-300">JA4b (Ciphers Hash)</span> _ <span className="text-gray-400">JA4c (Extensions Hash)</span>
            <div className="mt-2 text-xs text-gray-400">
              Example JA4 Hash: <code className="text-makima-gold font-bold">t13d1516h2_8daaf6152771_0b6e1b6f0012</code>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs font-mono my-6 py-4 border-b border-white/10">
            <div>
              <span className="text-makima-red font-bold block mb-1 uppercase tracking-wider">01. JA4a (Transport & ALPN)</span>
              <p className="text-gray-400 text-[11px] leading-relaxed">
                <code className="text-white font-bold">t</code> (TCP) | <code className="text-white font-bold">13</code> (TLS 1.3) | <code className="text-white font-bold">d</code> (SNI present) | <code className="text-white font-bold">15</code> (Cipher count) | <code className="text-white font-bold">16</code> (Extension count) | <code className="text-white font-bold">h2</code> (ALPN HTTP/2).
              </p>
            </div>

            <div>
              <span className="text-makima-red font-bold block mb-1 uppercase tracking-wider">02. JA4b (Ciphers)</span>
              <p className="text-gray-400 text-[11px] leading-relaxed">
                A SHA-256 hash of the list of cipher suites supported by the client, sorted alphabetically to eliminate false positives caused by cipher reordering.
              </p>
            </div>

            <div>
              <span className="text-makima-red font-bold block mb-1 uppercase tracking-wider">03. JA4c (Extensions)</span>
              <p className="text-gray-400 text-[11px] leading-relaxed">
                A SHA-256 hash of TLS extensions and signature algorithms, sorted alphabetically.
              </p>
            </div>
          </div>

          <h3 className="text-xl font-bold text-white mt-8 mb-3">Cryptographic GREASE Detection</h3>
          <p className="text-gray-300 leading-relaxed mb-4">
            Chromium-based browsers use <strong className="text-white">GREASE (Generate Random Extensions And Sustain Extensibility)</strong> to inject dummy values (such as <code className="text-makima-gold font-mono">0x0a0a</code> or <code className="text-makima-gold font-mono">0x1a1a</code>) into ciphers and extensions. Standard HTTP libraries (<code className="text-gray-400 font-mono">axios</code> or <code className="text-gray-400 font-mono">requests</code>) omit GREASE values. When a request presents a Chrome User-Agent but lacks GREASE, it is rejected instantly.
          </p>
        </section>

        {/* Section 3. HTTP/2 Fingerprinting */}
        <section className="mb-14">
          <h2 className="text-2xl md:text-3xl font-cinzel font-bold text-white mb-4 border-l-4 border-makima-red pl-4">
            3. HTTP/2 Fingerprinting (L7 Protocol Heuristics)
          </h2>
          <p className="text-gray-300 leading-relaxed mb-4">
            If the client negotiates HTTP/2 via ALPN, it sends an HTTP/2 connection preface followed by a <code className="text-makima-gold font-mono">SETTINGS</code> frame.
          </p>

          <CodeSnippet
            language="text"
            code={`Chromium HTTP/2 SETTINGS Frame Profile:
[SETTINGS_HEADER_TABLE_SIZE: 65536]
[SETTINGS_ENABLE_PUSH: 0]
[SETTINGS_MAX_CONCURRENT_STREAMS: 1000]
[SETTINGS_INITIAL_WINDOW_SIZE: 6291456]
[SETTINGS_MAX_FRAME_SIZE: 16384]
[SETTINGS_MAX_HEADER_LIST_SIZE: 262144]`}
          />

          <p className="text-gray-300 leading-relaxed mb-4">
            Modern anti-bot engines analyze the parameters of this frame:
          </p>
          <ul className="space-y-2 mb-6 pl-4 text-sm text-gray-300">
            <li className="flex items-start gap-2">
              <span className="text-makima-red font-mono">•</span>
              <span><strong className="text-white">H2 Settings Order & Values:</strong> Analyzes exact parameter order from Chromium's <code className="text-makima-gold font-mono">nghttp2</code> engine.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-makima-red font-mono">•</span>
              <span><strong className="text-white">H2 Stream Prioritization Trees (RFC 7540):</strong> Verifies custom dependency trees used to prioritize CSS/JS assets.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-makima-red font-mono">•</span>
              <span><strong className="text-white">WINDOW_UPDATE Frames:</strong> Tracks initial TCP/HTTP flow window capacity adjustments.</span>
            </li>
          </ul>
        </section>

        {/* Web Image Interstitial */}
        <div className="relative w-full h-[280px] rounded-3xl overflow-hidden border border-white/10 mb-14">
          <Image
            src="https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=1200&auto=format&fit=crop"
            alt="Matrix Code Data Security"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-neutral-950/70 flex items-center justify-center p-6 text-center">
            <blockquote className="text-lg md:text-xl font-cinzel font-bold text-white max-w-2xl">
              "Bot defense is not a mathematical cryptography puzzle; it is a game of computational and financial economics."
            </blockquote>
          </div>
        </div>

        {/* Section 4. JS Challenge: DOM Telemetry & V8 Sandboxing */}
        <section className="mb-14">
          <h2 className="text-2xl md:text-3xl font-cinzel font-bold text-white mb-4 border-l-4 border-makima-red pl-4">
            4. JS Challenge: DOM Telemetry & V8 Sandboxing
          </h2>
          <p className="text-gray-300 leading-relaxed mb-6">
            If the network layer looks legitimate, the WAF serves a client-side JavaScript challenge that executes inside V8 to gather deep environmental telemetry.
          </p>

          <h3 className="text-lg font-bold text-white mb-3">Advanced DOM Detection Vectors</h3>

          <div className="space-y-6">
            <div>
              <h4 className="text-sm font-bold text-makima-red font-mono mb-2">1. CDP & WebDriver Injections</h4>
              <p className="text-xs text-gray-300 leading-relaxed mb-2">
                Headless browsers controlled via Chrome DevTools Protocol (CDP) inject variables into the page runtime:
              </p>
              <ul className="list-disc pl-5 text-xs text-gray-400 space-y-1 font-mono">
                <li><code className="text-white">window.navigator.webdriver</code> (must be false or undefined).</li>
                <li>CDP functions like <code className="text-white">window.cdc_adoQy2ioDncZgoDYjhxTcjfq_Array</code>.</li>
                <li>Properties on document/window starting with <code className="text-white">__webdriver</code>, <code className="text-white">__selenium</code>, or <code className="text-white">$cdc_</code>.</li>
              </ul>
            </div>

            <div>
              <h4 className="text-sm font-bold text-makima-red font-mono mb-2">2. Native Method Prototype Verification</h4>
              <p className="text-xs text-gray-300 leading-relaxed mb-3">
                If automation scripts spoof properties using <code className="text-makima-gold font-mono">Object.defineProperty</code> or <code className="text-makima-gold font-mono">Proxy</code>, anti-bot scripts inspect prototype chains:
              </p>

              <CodeSnippet
                language="javascript"
                code={`// 1. Receiver Validation
Navigator.prototype.__lookupGetter__('languages').call(navigator);

// 2. Function Stringification (toString)
if (Function.prototype.toString.call(document.createElement) !== "function createElement() { [native code] }") {
  // Native code was intercepted!
}

// 3. V8 Call Stack Profiling
// Parses error.stack string for Puppeteer or Playwright file references`}
              />
            </div>

            <div>
              <h4 className="text-sm font-bold text-makima-red font-mono mb-2">3. Hardware Rendering & VM Checks</h4>
              <ul className="space-y-2 text-xs text-gray-300 pl-4">
                <li><strong className="text-white">• Canvas Fingerprinting:</strong> Draws hidden text/shapes; PNG hash varies per GPU anti-aliasing driver.</li>
                <li><strong className="text-white">• WebGL Renderer Inspection:</strong> Queries <code className="text-makima-gold font-mono">WEBGL_debug_renderer_info</code>. Words like <code className="text-white font-mono">SwiftShader</code>, <code className="text-white font-mono">LLVMpipe</code>, or <code className="text-white font-mono">VirtualBox</code> betray virtual machines.</li>
                <li><strong className="text-white">• Font Enumeration:</strong> Measures pixel bounds across fallback fonts inside a hidden <code className="text-makima-gold font-mono">&lt;iframe&gt;</code>.</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Section: The Evasion Stack */}
        <section className="mb-14">
          <h2 className="text-2xl md:text-3xl font-cinzel font-bold text-white mb-4 border-l-4 border-makima-red pl-4">
            The Evasion Stack: Bypassing Advanced Heuristics
          </h2>
          <p className="text-gray-300 leading-relaxed mb-4">
            To bypass deep inspection layers, operators deploy low-level evasion frameworks:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6 py-4 border-t border-b border-white/10">
            <div>
              <h4 className="text-sm font-bold text-white font-mono mb-2">Low-Level Network Spoofing</h4>
              <p className="text-xs text-gray-400 leading-relaxed">
                High-throughput crawlers compile custom Go/Rust networking binaries (<code className="text-makima-gold font-mono">tls-client</code> or <code className="text-makima-gold font-mono">curl-impersonate</code>) to spoof TLS ciphers, extension layouts, GREASE distribution profiles, and HTTP/2 settings frames without rendering overhead.
              </p>
            </div>

            <div>
              <h4 className="text-sm font-bold text-white font-mono mb-2">V8 Engine Patching (e.g., Rebrowser)</h4>
              <p className="text-xs text-gray-400 leading-relaxed">
                Tools like Rebrowser patch Chromium at the V8 debugger level before page scripts load, eliminating prototype trace leaks and blocking CDP automated script indicators.
              </p>
            </div>
          </div>
        </section>

        {/* Section: Proxies & CGNAT */}
        <section className="mb-14">
          <h2 className="text-2xl md:text-3xl font-cinzel font-bold text-white mb-4 border-l-4 border-makima-red pl-4">
            Proxies: The IP Reputation Hierarchy
          </h2>
          <p className="text-gray-300 leading-relaxed mb-6">
            The core of any automation campaign is IP routing. Anti-bot firewalls score requests based on their autonomous system network (ASN) classification.
          </p>

          {/* Full Proxy Table from MD */}
          <div className="overflow-x-auto rounded-2xl border border-white/10 mb-6">
            <table className="w-full text-left text-xs font-mono">
              <thead className="bg-neutral-900 text-gray-300 border-b border-white/10">
                <tr>
                  <th className="p-4">Proxy Type</th>
                  <th className="p-4">Cost per GB</th>
                  <th className="p-4">Target ASN Type</th>
                  <th className="p-4">Block Risk</th>
                  <th className="p-4">Best Use Case</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 bg-black/40 text-gray-300">
                <tr>
                  <td className="p-4 font-bold text-white">Datacenter</td>
                  <td className="p-4 text-gray-300">$0.10 - $0.50</td>
                  <td className="p-4">Hostings (AWS, DigitalOcean, OVH)</td>
                  <td className="p-4 text-makima-red font-bold">Very High</td>
                  <td className="p-4">High-speed API queries on basic platforms</td>
                </tr>
                <tr>
                  <td className="p-4 font-bold text-white">Residential</td>
                  <td className="p-4 text-gray-300">$2.00 - $12.00</td>
                  <td className="p-4">Consumer ISPs (Comcast, BT)</td>
                  <td className="p-4 text-gray-300 font-bold">Medium</td>
                  <td className="p-4">Standard web scraping & search engines</td>
                </tr>
                <tr>
                  <td className="p-4 font-bold text-white">Mobile LTE</td>
                  <td className="p-4 text-gray-300">$5.00 - $20.00</td>
                  <td className="p-4">Cellular Carriers (AT&T, Verizon)</td>
                  <td className="p-4 text-white font-bold">Very Low</td>
                  <td className="p-4">Bypassing strict logins / CGNAT protection</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h3 className="text-xl font-bold text-white mt-6 mb-3">The Power of CGNAT Mobile IPs</h3>
          <p className="text-gray-300 leading-relaxed">
            Mobile LTE proxies rely on <strong className="text-white">Carrier-Grade NAT (CGNAT)</strong>, which assigns a single public IPv4 address to thousands of devices simultaneously. If a WAF blocks a mobile IP, it risks blocking thousands of real human clients. Consequently, WAF engines assign exceptionally low risk scores to cellular ASNs.
          </p>
        </section>

        {/* Section: Defensive Strategy (Merged Unboxed Grid) */}
        <section className="mb-14">
          <h2 className="text-2xl md:text-3xl font-cinzel font-bold text-white mb-6 border-l-4 border-makima-red pl-4">
            Defensive Strategy: Building Resilient Architectures
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-4 border-t border-b border-white/10">
            <div>
              <h4 className="font-bold text-white text-sm font-mono mb-1 flex items-center gap-2">
                <span className="text-makima-red">01.</span> Edge Validation Workers
              </h4>
              <p className="text-xs text-gray-400 leading-relaxed">
                Serve JS challenges and validate TLS signatures inside Edge Workers (Cloudflare Workers / AWS CloudFront Functions) to preserve database and application capacity.
              </p>
            </div>

            <div>
              <h4 className="font-bold text-white text-sm font-mono mb-1 flex items-center gap-2">
                <span className="text-makima-red">02.</span> JA3/JA4 Edge Verification
              </h4>
              <p className="text-xs text-gray-400 leading-relaxed">
                Validate that the user's TLS profile matches the User-Agent claimed. Drop requests at the edge if Chrome User-Agent presents Python TLS ciphers.
              </p>
            </div>

            <div>
              <h4 className="font-bold text-white text-sm font-mono mb-1 flex items-center gap-2">
                <span className="text-makima-red">03.</span> DOM Honeypot Anchors
              </h4>
              <p className="text-xs text-gray-400 leading-relaxed">
                Inject hidden HTML fields (<code className="text-makima-gold font-mono">display: none</code>). Real users never click hidden elements; crawlers parsing raw HTML get blacklisted immediately.
              </p>
            </div>

            <div>
              <h4 className="font-bold text-white text-sm font-mono mb-1 flex items-center gap-2">
                <span className="text-makima-red">04.</span> Edge-Validated Session Cookies
              </h4>
              <p className="text-xs text-gray-400 leading-relaxed">
                Maintain state flags using encrypted, edge-validated cookies (<code className="text-makima-gold font-mono">_abck</code>) verified regularly during browsing sessions.
              </p>
            </div>
          </div>
        </section>

        {/* Section: Frequently Asked Questions */}
        <section className="mb-16">
          <h2 className="text-2xl md:text-3xl font-cinzel font-bold text-white mb-6 border-l-4 border-makima-red pl-4">
            Frequently Asked Questions
          </h2>

          <div className="space-y-2">
            <FAQAccordion
              question="How does JA4 TLS fingerprinting differ from legacy JA3?"
              answer="JA3 compiled cipher suites and extensions in the exact order they were received into a single comma-delimited string and hashed the result. This made it fragile and easy to bypass by reordering extensions. JA4 resolves this by sorting ciphers and extensions alphabetically before hashing, and structuring the output into a human-readable prefix (JA4a) representing options/counts, followed by sorted cryptographic hashes (JA4b, JA4c)."
            />

            <FAQAccordion
              question="Why are mobile LTE IP addresses (CGNAT) so difficult for WAFs to block?"
              answer="Carrier-Grade NAT (CGNAT) allows mobile network operators to share a single public IPv4 address among thousands of individual cellular mobile devices. If a WAF blocks a mobile IP, it will block not just the automated crawler, but thousands of legitimate mobile phone users. Consequently, security firewalls must assign low risk scores to mobile carrier ASNs."
            />

            <FAQAccordion
              question="Can headless browsers (Puppeteer, Playwright) ever fully bypass Cloudflare Turnstile or Akamai Bot Manager?"
              answer="No browser automation framework is fully undetectable. While patched drivers (like Rebrowser or Puppeteer-Stealth) attempt to mask CDP variables and override native method prototype traits, WAFs continually deploy updated scripts looking for V8 debugging protocols, graphics driver virtualization side-channels (like Canvas speed-testing), and mouse curve acceleration dynamics that betray automated execution."
            />
          </div>
        </section>

      </article>
    </Layout>
  );
}
