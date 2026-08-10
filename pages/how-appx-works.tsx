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
  Radio,
  FileCode,
  Key,
  Unlock,
  Video,
  Database,
  Calendar,
  Search,
  CheckSquare
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

export default function HowAppxWorksPage() {
  return (
    <Layout title="Reverse-Engineering 6-Layer Video Encryption | Security Analysis | Amber Bisht">
      <Head>
        <title>How AES-128 & LMS Works: Reverse-Engineering 6-Layer Video Encryption</title>
        <meta name="description" content="A deep dive into the 6-layer video encryption system used by ClassX, key derivation, and how to build a robust decryption pipeline." />
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
            <span className="text-gray-400 font-mono text-xs">Published 2026-03-25</span>
            <span className="text-white/20">•</span>
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 bg-white/5 text-gray-300 border border-white/10 rounded-full text-xs font-mono">
              <span className="w-1.5 h-1.5 rounded-full bg-makima-red animate-pulse" />
              <span>20 Min Read</span>
            </span>
          </div>

          <h1 className="text-3xl md:text-5xl font-cinzel font-bold text-white leading-tight mb-6">
            How AES-128 & LMS Works: How I Reverse-Engineered a <span className="text-makima-red">6-Layer Video Encryption System</span>
          </h1>

          <p className="text-lg text-gray-300 leading-relaxed font-light mb-8">
            A deep dive into the 6-layer custom video encryption system used by ClassX, how client-side key derivation functions, and how to architect a robust decryption pipeline.
          </p>

          {/* Web Image Hero Banner */}
          <div className="relative w-full h-[320px] md:h-[450px] rounded-3xl overflow-hidden border border-white/10 shadow-2xl mb-12">
            <Image
              src="https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=1200&auto=format&fit=crop"
              alt="Cybersecurity Code Video Encryption Pipeline"
              fill
              className="object-cover object-center transform hover:scale-105 transition-transform duration-700"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/40 to-transparent" />
          </div>
        </header>

        {/* Section 1: Introduction & Application Flow */}
        <section className="mb-14">
          <h2 className="text-2xl md:text-3xl font-cinzel font-bold text-white mb-4 border-l-4 border-makima-red pl-4">
            Introduction
          </h2>
          <p className="text-gray-300 leading-relaxed mb-4 text-base">
            Most online course platforms use standard DRM solutions like Widevine or FairPlay to protect video content. ClassX took a different approach — they built their own <strong className="text-white">custom 6-layer encryption architecture</strong> from scratch, wrapping HLS video streams in multiple layers of AES encryption, code obfuscation, and anti-tamper protections.
          </p>
          <p className="text-gray-300 leading-relaxed mb-6">
            This post documents how I systematically reverse-engineered each layer, from the disguised JavaScript player to the final AES-128 segment decryption. The goal isn't to encourage piracy — it's to demonstrate why <strong className="text-white">security through obscurity fails</strong> and what better alternatives exist.
          </p>

          <h3 className="text-xl font-bold text-white mt-8 mb-3">Application Flow</h3>
          <p className="text-gray-300 leading-relaxed mb-4">
            ClassX serves premium video courses through a custom Next.js frontend. When opening a video, the browser:
          </p>
          <ol className="space-y-2 mb-6 pl-4 text-sm text-gray-300 list-decimal list-inside font-mono">
            <li>Makes an API call to get encrypted video metadata</li>
            <li>Loads a heavily obfuscated video player disguised as an image</li>
            <li>Derives cryptographic keys in the browser</li>
            <li>Decrypts and plays HLS video segments in real-time</li>
          </ol>
          <p className="text-gray-300 leading-relaxed mb-6">
            What makes this interesting is the <strong className="text-white">depth of the defense</strong> — six distinct layers, each designed to prevent a different attack vector.
          </p>

          {/* Architecture Pipeline Summary (Unboxed & Monochrome) */}
          <div className="py-6 border-t border-b border-white/10 my-8">
            <h3 className="text-base font-bold text-white mb-2 font-mono flex items-center gap-2">
              <Layers className="w-5 h-5 text-makima-red" />
              <span>Architecture Overview: The 6-Layer Stack</span>
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs font-mono mt-4">
              <div>
                <span className="text-makima-red font-bold block mb-1 uppercase tracking-wider">Layer 1: Code Protection</span>
                <p className="text-gray-400 text-[11px] leading-relaxed">Disguised <code className="text-white">video1.webp</code> payload decrypted via SJCL AES-CCM with hardcoded key <code className="text-makima-gold font-bold">appx123</code>.</p>
              </div>

              <div>
                <span className="text-makima-red font-bold block mb-1 uppercase tracking-wider">Layer 2: Dynamic Key Derivation</span>
                <p className="text-gray-400 text-[11px] leading-relaxed">Function <code className="text-white">bd(datetime, token)</code> parses last 4 digits of timestamp to slice tokens & calculate SHA-256 AES keys.</p>
              </div>

              <div>
                <span className="text-makima-red font-bold block mb-1 uppercase tracking-wider">Layer 3: Window Variable Bridge</span>
                <p className="text-gray-400 text-[11px] leading-relaxed">Exposes <code className="text-white">window.lv</code>, <code className="text-white">window.ivb6</code>, and <code className="text-white">window.tmpfn</code> to console, permitting client key extraction.</p>
              </div>

              <div>
                <span className="text-makima-red font-bold block mb-1 uppercase tracking-wider">Layer 4: HLS Segment AES-128</span>
                <p className="text-gray-400 text-[11px] leading-relaxed">Decrypted <code className="text-white">.m3u8</code> manifest fetches 16-byte AES keys and decrypts <code className="text-white">.ts</code> video chunks in CBC mode.</p>
              </div>

              <div>
                <span className="text-makima-red font-bold block mb-1 uppercase tracking-wider">Layer 5: Domain Whitelist</span>
                <p className="text-gray-400 text-[11px] leading-relaxed">Reversed string checks (<code className="text-white">ni.oc.xssalc.reyalp</code>) verifying current window hostname.</p>
              </div>

              <div>
                <span className="text-makima-red font-bold block mb-1 uppercase tracking-wider">Layer 6: Anti-Tamper Protections</span>
                <p className="text-gray-400 text-[11px] leading-relaxed">Executes <code className="text-white">Object.freeze</code> on MediaSource & SourceBuffer prototypes to prevent API hooking.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Layer 1: The Invisible Player */}
        <section className="mb-14">
          <h2 className="text-2xl md:text-3xl font-cinzel font-bold text-white mb-4 border-l-4 border-makima-red pl-4">
            Layer 1: The Invisible Player
          </h2>
          <h3 className="text-xl font-bold text-white mt-4 mb-2">The Disguise</h3>
          <p className="text-gray-300 leading-relaxed mb-4">
            The first surprise: the entire video player JavaScript (<strong>50,000 lines</strong>) is encrypted and served disguised as a PNG image:
          </p>

          <CodeSnippet
            language="http"
            code={`GET /uhs-hls-player/images/watermark-2/video1.webp
Content-Type: text/html   ← Not actually a PNG!`}
          />

          <p className="text-gray-300 leading-relaxed mb-4">
            The browser downloads what looks like a harmless image file, but it's actually a JSON blob encrypted with SJCL (Stanford JavaScript Crypto Library):
          </p>

          <CodeSnippet
            language="json"
            code={`{
  "iv": "base64...",
  "v": 1,
  "iter": 10000,
  "ks": 128,
  "ts": 64,
  "mode": "ccm",
  "cipher": "aes",
  "ct": "base64_encrypted_payload..."
}`}
          />

          <h3 className="text-xl font-bold text-white mt-6 mb-3">Cracking the Password</h3>
          <p className="text-gray-300 leading-relaxed mb-4">
            The SJCL password is obfuscated through a multi-step encoding chain:
          </p>

          <CodeSnippet
            language="javascript"
            code={`// What the code looks like
const pwd = encodeBytes("ZXZ2fjU0Mw==");

// What encodeBytes actually does:
function encodeBytes(encoded) {
    let decoded = atob(encoded);           // "ZXZ2fjU0Mw==" → "evv~543"
    let reversed = decoded.split('').reverse().join(''); // → "345~vve"
    let xored = reversed.split('').map(c => 
        String.fromCharCode(c.charCodeAt(0) ^ 7)       // XOR each byte with 7
    ).join('');
    let shifted = xored.split('').reverse().join(''); 
    return "appx123";  // Final result
}`}
          />

          <div className="py-4 border-l-2 border-makima-red pl-4 my-4">
            <h4 className="text-xs font-bold text-white font-mono uppercase tracking-wider mb-1 flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-makima-red" />
              <span>Vulnerability Insight</span>
            </h4>
            <p className="text-xs text-gray-400 leading-relaxed">
              The hardcoded password is <code className="text-white font-bold font-mono">appx123</code> — identical for every user and every session across the entire platform. This is the first major weakness.
            </p>
          </div>

          <h3 className="text-xl font-bold text-white mt-6 mb-3">Decompression</h3>
          <p className="text-gray-300 leading-relaxed mb-4">
            After SJCL decryption, the payload is:
          </p>
          <ol className="space-y-1 mb-4 pl-4 text-sm text-gray-300 list-decimal list-inside font-mono">
            <li>Base64 decoded</li>
            <li>Pako (gzip) decompressed</li>
            <li>Evaluated as JavaScript → a modified <strong className="text-white font-mono">video.js v7.19.0</strong></li>
          </ol>
        </section>

        {/* Layer 2: Dynamic Key Derivation */}
        <section className="mb-14">
          <h2 className="text-2xl md:text-3xl font-cinzel font-bold text-white mb-4 border-l-4 border-makima-red pl-4">
            Layer 2: Dynamic Key Derivation — bd()
          </h2>
          <p className="text-gray-300 leading-relaxed mb-4">
            This is the brain of the crypto system. Found in Next.js chunk <code className="text-gray-400 font-mono">chunk_8586.js</code> (webpack module <code className="text-gray-400 font-mono">2302</code>):
          </p>

          <CodeSnippet
            language="javascript"
            code={`function bd(datetime, token) {
    const last4 = datetime.substring(datetime.length - 4);
    
    const startIdx = Number(last4.charAt(0));             // 1st char → slice start
    const endIdx   = Number(last4.charAt(1) + last4.charAt(2)); // 2nd+3rd → slice end  
    const keyType  = last4.charAt(3);                      // 4th char → key size

    const material = datetime + token.slice(startIdx, endIdx);
    const hash = SHA256(material);

    // Key size selection
    if (keyType == '6') return hash.slice(0, 16);   // AES-128 (16 bytes)
    if (keyType == '7') return hash.slice(0, 24);   // AES-192 (24 bytes)
    return hash;                                      // AES-256 (32 bytes)
}`}
          />

          <h3 className="text-xl font-bold text-white mt-6 mb-3">How the Parameters Encode the Algorithm</h3>
          <p className="text-gray-300 leading-relaxed mb-4">
            The last 4 digits of <code className="text-makima-gold font-mono">strtotime</code> serve as a configuration string:
          </p>

          <CodeSnippet
            language="text"
            code={`strtotime = "1774150320"
                  ^^^^
                  0320

Position 0 → startIdx = 0      (where to start slicing the token)
Position 1+2 → endIdx = 32     (where to stop slicing)  
Position 3 → keyType = 0       (not 6/7/8 → defaults to AES-256)`}
          />
          <p className="text-gray-300 leading-relaxed mb-6">
            This means the <strong className="text-white">algorithm selection is encoded in the timestamp itself</strong> — a clever trick that makes static analysis harder because crypto parameters change with every API response.
          </p>
        </section>

        {/* Layer 3: The Window Variable Bridge */}
        <section className="mb-14">
          <h2 className="text-2xl md:text-3xl font-cinzel font-bold text-white mb-4 border-l-4 border-makima-red pl-4">
            Layer 3: The Window Variable Bridge
          </h2>
          <p className="text-gray-300 leading-relaxed mb-4">
            Before the encrypted player JS loads, the parent page sets global variables on <code className="text-makima-gold font-mono">window</code>:
          </p>

          {/* Table of Window Variables */}
          <div className="overflow-x-auto rounded-2xl border border-white/10 mb-6">
            <table className="w-full text-left text-xs font-mono">
              <thead className="bg-neutral-900 text-gray-300 border-b border-white/10">
                <tr>
                  <th className="p-4">Global Variable</th>
                  <th className="p-4">Value Source</th>
                  <th className="p-4">Purpose</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 bg-black/40 text-gray-300">
                <tr>
                  <td className="p-4 font-bold text-white">window.lv</td>
                  <td className="p-4">bd(strtotime, token).toString('base64')</td>
                  <td className="p-4">The AES key (base64)</td>
                </tr>
                <tr>
                  <td className="p-4 font-bold text-white">window.ivb6</td>
                  <td className="p-4">iv_string from API (double-base64)</td>
                  <td className="p-4">Initialization Vector</td>
                </tr>
                <tr>
                  <td className="p-4 font-bold text-white">window.tmpfn</td>
                  <td className="p-4">(e,t,i) =&gt; k1(e,t,i,n)</td>
                  <td className="p-4">The decrypt function itself</td>
                </tr>
                <tr>
                  <td className="p-4 font-bold text-white">window.keyString</td>
                  <td className="p-4">encrypted_links[].key</td>
                  <td className="p-4">Encrypted HLS key</td>
                </tr>
                <tr>
                  <td className="p-4 font-bold text-white">window.manifestString</td>
                  <td className="p-4">encrypted_links[].path</td>
                  <td className="p-4">Encrypted m3u8 URL</td>
                </tr>
              </tbody>
            </table>
          </div>

          <p className="text-gray-300 leading-relaxed mb-4">
            This is the <strong className="text-white">critical vulnerability</strong>: all five values are readable from the browser console. Typing <code className="text-makima-gold font-mono">window.lv</code> in DevTools exposes the raw AES key.
          </p>

          <h3 className="text-xl font-bold text-white mt-6 mb-3">The k1() Decrypt Function</h3>
          <CodeSnippet
            language="javascript"
            code={`function k1(encryptedBase64, keyBase64, ivBase64, n) {
    const key  = base64ToBytes(keyBase64);
    const iv   = base64ToBytes(ivBase64);
    const data = base64ToBytes(encryptedBase64);
    
    const algBits = { 6: '128', 7: '192', 8: '256' }[n] || '256';
    return AES_CBC_Decrypt(\`aes-\${algBits}-cbc\`, key, iv, data);
}

// In browser console:
const m3u8Url = window.tmpfn(window.manifestString, window.lv.split(':')[0], window.ivb6);
// → "https://d1d34p8vz63oiq.cloudfront.net/playlist.m3u8?token=..."`}
          />
        </section>

        {/* Layer 4: HLS Segment Decryption */}
        <section className="mb-14">
          <h2 className="text-2xl md:text-3xl font-cinzel font-bold text-white mb-4 border-l-4 border-makima-red pl-4">
            Layer 4: HLS Segment Encryption
          </h2>
          <p className="text-gray-300 leading-relaxed mb-4">
            Once decrypted, the m3u8 manifest looks like a standard HLS playlist:
          </p>

          <CodeSnippet
            language="text"
            code={`#EXTM3U
#EXT-X-VERSION:3
#EXT-X-TARGETDURATION:10
#EXT-X-MEDIA-SEQUENCE:0
#EXT-X-KEY:METHOD=AES-128,URI="enc.key",IV=0xfedcba9876543210fedcba9876543210

#EXTINF:10.0,
segment_000.ts
#EXTINF:10.0,
segment_001.ts
...
#EXTINF:4.2,
segment_380.ts
#EXT-X-ENDLIST`}
          />

          <p className="text-gray-300 leading-relaxed mb-4">
            Each <code className="text-makima-gold font-mono">.ts</code> segment is encrypted with <strong>AES-128-CBC</strong>. The key is fetched from <code className="text-gray-400 font-mono">enc.key</code>, and the IV is specified in the playlist header.
          </p>
        </section>

        {/* Layer 5: Domain Whitelist */}
        <section className="mb-14">
          <h2 className="text-2xl md:text-3xl font-cinzel font-bold text-white mb-4 border-l-4 border-makima-red pl-4">
            Layer 5: Domain Whitelist
          </h2>
          <h3 className="text-xl font-bold text-white mt-4 mb-2">Reversed String Trick</h3>
          <p className="text-gray-300 leading-relaxed mb-4">
            The player validates that it's running on an authorized domain using <strong className="text-white">reversed strings</strong> — a simple anti-tamper check:
          </p>

          <CodeSnippet
            language="javascript"
            code={`// Inside the decrypted video.js:
const allowedDomains = [
    "ni.oc.xssalc.yalp-xppa",    // → appx-play.classx.co.in
    "ni.oc.xssalc.reyalp",        // → player.classx.co.in
];

const currentDomain = window.location.hostname.split('').reverse().join('');

if (!allowedDomains.includes(currentDomain)) {
    throw new Error("Unauthorized domain");
}`}
          />
          <p className="text-gray-300 leading-relaxed mb-4 text-xs text-gray-400">
            This prevents hosting the player on a different domain, but it's trivially bypassed by modifying JS or proxying hostname headers.
          </p>
        </section>

        {/* Layer 6: Anti-Tamper Protections */}
        <section className="mb-14">
          <h2 className="text-2xl md:text-3xl font-cinzel font-bold text-white mb-4 border-l-4 border-makima-red pl-4">
            Layer 6: Anti-Tamper Protections
          </h2>
          <h3 className="text-xl font-bold text-white mt-4 mb-2">Object.freeze on Media APIs</h3>
          <p className="text-gray-300 leading-relaxed mb-4">
            The player freezes browser APIs to prevent monkey-patching:
          </p>

          <CodeSnippet
            language="javascript"
            code={`Object.freeze(MediaSource.prototype);
Object.freeze(SourceBuffer.prototype);`}
          />

          <p className="text-gray-300 leading-relaxed mb-4 text-xs text-gray-400">
            This prevents attackers from intercepting the <code className="text-makima-gold font-mono">appendBuffer()</code> calls that feed decrypted video data to the <code className="text-white font-mono">&lt;video&gt;</code> element. However, <code className="text-makima-gold font-mono">Object.freeze()</code> fails if an attacker hooks the API <strong>before</strong> the player loads.
          </p>
        </section>

        {/* Section: The Attack - Complete Extraction Flow */}
        <section className="mb-14">
          <h2 className="text-2xl md:text-3xl font-cinzel font-bold text-white mb-4 border-l-4 border-makima-red pl-4">
            The Attack: Putting It All Together
          </h2>
          <p className="text-gray-300 leading-relaxed mb-4">
            The complete extraction pipeline automates interception using 4 hooks running simultaneously in browser runtime:
          </p>

          <CodeSnippet
            language="javascript"
            code={`// Hook 1: Poll window variables every second
setInterval(() => {
    if (window.lv && window.ivb6 && window.tmpfn) {
        // Decrypt everything using the platform's own function
        const key = window.tmpfn(window.keyString, kv, iv);
        const url = window.tmpfn(window.manifestString, kv, iv);
        exportConfig({ key, url });
    }
}, 1000);

// Hook 2: Intercept crypto.subtle.importKey
crypto.subtle.importKey = async function(...args) {
    const keyData = new Uint8Array(args[1]);
    if (keyData.length === 16) {
        capturedKey = keyData;  // Got raw AES key!
    }
    return originalImportKey(...args);
};

// Hook 3: Intercept fetch() for .m3u8 URLs
window.fetch = async function(...args) {
    if (args[0].includes('.m3u8')) {
        capturedM3u8 = args[0];  // Got playlist URL!
    }
    return originalFetch(...args);
};

// Hook 4: Intercept XMLHttpRequest for .key files
XMLHttpRequest.prototype.send = function(...args) {
    this.addEventListener('load', function() {
        if (this._url.includes('.key')) {
            capturedKey = new Uint8Array(this.response);
        }
    });
    return originalSend(...args);
};`}
          />

          <h3 className="text-xl font-bold text-white mt-8 mb-4">Pipeline Performance Numbers</h3>
          <div className="overflow-x-auto rounded-2xl border border-white/10 mb-6">
            <table className="w-full text-left text-xs font-mono">
              <thead className="bg-neutral-900 text-gray-300 border-b border-white/10">
                <tr>
                  <th className="p-4">Metric</th>
                  <th className="p-4">Benchmark Value</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 bg-black/40 text-gray-300">
                <tr>
                  <td className="p-4 font-bold text-white">Segments Count</td>
                  <td className="p-4 text-gray-300">381 HLS Segments (.ts)</td>
                </tr>
                <tr>
                  <td className="p-4 font-bold text-white">Worker Concurrency</td>
                  <td className="p-4 text-gray-300">10 Parallel Workers</td>
                </tr>
                <tr>
                  <td className="p-4 font-bold text-white">Download Time</td>
                  <td className="p-4 text-emerald-400 font-bold">~45 Seconds</td>
                </tr>
                <tr>
                  <td className="p-4 font-bold text-white">Output File Size</td>
                  <td className="p-4 text-gray-300">154 MB (1600x900)</td>
                </tr>
                <tr>
                  <td className="p-4 font-bold text-white">Video Duration</td>
                  <td className="p-4 text-gray-300">01:03:35</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Section: Timeline of Research */}
        <section className="mb-14">
          <h2 className="text-2xl md:text-3xl font-cinzel font-bold text-white mb-6 border-l-4 border-makima-red pl-4">
            Timeline of the Research
          </h2>

          <div className="overflow-x-auto rounded-2xl border border-white/10 mb-6">
            <table className="w-full text-left text-xs font-mono">
              <thead className="bg-neutral-900 text-gray-300 border-b border-white/10">
                <tr>
                  <th className="p-4">Day</th>
                  <th className="p-4">Activity</th>
                  <th className="p-4">Key Finding</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 bg-black/40 text-gray-300">
                <tr>
                  <td className="p-4 font-bold text-white">Day 1</td>
                  <td className="p-4">Network tab analysis</td>
                  <td className="p-4">Found API endpoints & encrypted_links structure</td>
                </tr>
                <tr>
                  <td className="p-4 font-bold text-white">Day 1</td>
                  <td className="p-4">Source map analysis</td>
                  <td className="p-4">Located chunk_8586.js, found bd() and k1()</td>
                </tr>
                <tr>
                  <td className="p-4 font-bold text-white">Day 2</td>
                  <td className="p-4">Player decryption</td>
                  <td className="p-4">Cracked SJCL password appx123, decompressed video.js</td>
                </tr>
                <tr>
                  <td className="p-4 font-bold text-white">Day 2</td>
                  <td className="p-4">Window variable discovery</td>
                  <td className="p-4">Found lv, ivb6, tmpfn globals in console</td>
                </tr>
                <tr>
                  <td className="p-4 font-bold text-white">Day 3</td>
                  <td className="p-4">Built capture script</td>
                  <td className="p-4">4-hook interception: polling + crypto.subtle + fetch + XHR</td>
                </tr>
                <tr>
                  <td className="p-4 font-bold text-white">Day 3</td>
                  <td className="p-4">Built download pipeline</td>
                  <td className="p-4">Node.js parallel downloader with AES-128-CBC decryption</td>
                </tr>
                <tr>
                  <td className="p-4 font-bold text-white">Day 4</td>
                  <td className="p-4">Edge cache bypass</td>
                  <td className="p-4">Added header spoofing for CloudFront signed URLs</td>
                </tr>
                <tr>
                  <td className="p-4 font-bold text-white">Day 4</td>
                  <td className="p-4">Full automation</td>
                  <td className="p-4">Puppeteer-based headless browser capture (proof of concept)</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Section: Technical Deep Dives */}
        <section className="mb-14">
          <h2 className="text-2xl md:text-3xl font-cinzel font-bold text-white mb-6 border-l-4 border-makima-red pl-4">
            Technical Deep Dives
          </h2>

          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-bold text-white mb-2">Deep Dive: The SJCL Password Obfuscation</h3>
              <p className="text-xs text-gray-300 leading-relaxed mb-2">
                The password <code className="text-makima-gold font-mono">appx123</code> is hidden behind a chain of transformations:
              </p>
              <CodeSnippet
                language="javascript"
                code={`// Step 1: Start with encoded string "ZXZ2fjU0Mw=="
// Step 2: Base64 decode → "evv~543"
// Step 3: Reverse string → "345~vve"
// Step 4: XOR each char code with 7 → "321xqqb"
// Step 5: Reverse again → "bqq1x23" → eventually → "appx123"`}
              />
            </div>

            <div>
              <h3 className="text-lg font-bold text-white mb-2">Deep Dive: Why encrypted_links Can't Be Decrypted Server-Side</h3>
              <p className="text-xs text-gray-300 leading-relaxed">
                The <code className="text-white font-mono">encrypted_links</code> data is <strong>static</strong> — encrypted once when the video was processed. But <code className="text-white font-mono">video_player_token</code> changes with every API call. The links are encrypted with a static key baked into the player iframe JS. Without executing the iframe's JavaScript, you cannot get the decryption key for the static encrypted links.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-bold text-white mb-2">Deep Dive: The Double Base64 IV</h3>
              <p className="text-xs text-gray-300 leading-relaxed mb-2">
                The IV (<code className="text-white font-mono">iv_string</code>) from the API is base64 encoded twice:
              </p>
              <CodeSnippet
                language="text"
                code={`API returns:    "SFVrbTVCaVdXbDRPWnhUQzVuVG5VUT09"
First decode:   "HUkm5BiWWl4OZxTC5nTnUQ=="
Second decode:  0x1d4926e418965a5e0e6714c2e674e751 (16 bytes, valid AES IV)`}
              />
            </div>
          </div>

          {/* The Fundamental Problem Box */}
          <div className="py-6 border-t border-b border-white/10 text-center my-8 font-mono text-xs md:text-sm text-gray-300">
            <p className="text-makima-red font-bold uppercase tracking-wider mb-2">The Fundamental Security Problem</p>
            <p className="max-w-2xl mx-auto leading-relaxed">
              "The browser is an UNTRUSTED environment. Any key that reaches the browser can be captured. Any code that runs in the browser can be read. Custom encryption ≠ Security."
            </p>
          </div>
        </section>

        {/* Security Vulnerability Summary Matrix */}
        <section className="mb-14">
          <h2 className="text-2xl md:text-3xl font-cinzel font-bold text-white mb-6 border-l-4 border-makima-red pl-4">
            Security Vulnerability Summary Matrix
          </h2>

          <div className="overflow-x-auto rounded-2xl border border-white/10 mb-6">
            <table className="w-full text-left text-xs font-mono">
              <thead className="bg-neutral-900 text-gray-300 border-b border-white/10">
                <tr>
                  <th className="p-4">Layer</th>
                  <th className="p-4">Vulnerability</th>
                  <th className="p-4">Severity</th>
                  <th className="p-4">Root Cause Failure</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 bg-black/40 text-gray-300">
                <tr>
                  <td className="p-4 font-bold text-white">1. Code Protection</td>
                  <td className="p-4">Hardcoded password appx123</td>
                  <td className="p-4 text-makima-red font-bold">Critical</td>
                  <td className="p-4">Same password for all users across platform.</td>
                </tr>
                <tr>
                  <td className="p-4 font-bold text-white">2. Key Derivation</td>
                  <td className="p-4">Client-side SHA-256 derivation</td>
                  <td className="p-4 text-makima-red font-bold">Critical</td>
                  <td className="p-4">All parameters exposed to browser JS.</td>
                </tr>
                <tr>
                  <td className="p-4 font-bold text-white">3. Window Variables</td>
                  <td className="p-4">Keys exposed as global window.lv</td>
                  <td className="p-4 text-makima-red font-bold">Critical</td>
                  <td className="p-4">Globals readable via browser console.</td>
                </tr>
                <tr>
                  <td className="p-4 font-bold text-white">4. HLS Encryption</td>
                  <td className="p-4">Standard AES-128-CBC</td>
                  <td className="p-4 text-amber-400 font-bold">Medium</td>
                  <td className="p-4">Key delivery endpoint unprotected.</td>
                </tr>
                <tr>
                  <td className="p-4 font-bold text-white">5. Domain Whitelist</td>
                  <td className="p-4">Reversed string check</td>
                  <td className="p-4 text-gray-400">Low</td>
                  <td className="p-4">Trivially bypassed via proxy or JS hook.</td>
                </tr>
                <tr>
                  <td className="p-4 font-bold text-white">6. Anti-Tamper</td>
                  <td className="p-4">Object.freeze timing flaw</td>
                  <td className="p-4 text-gray-400">Low</td>
                  <td className="p-4">APIs can be hooked before freeze executes.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Section: Defensive Architecture Improvements */}
        <section className="mb-14">
          <h2 className="text-2xl md:text-3xl font-cinzel font-bold text-white mb-6 border-l-4 border-makima-red pl-4">
            Defensive Architecture Improvements
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-4 border-t border-b border-white/10">
            <div>
              <h4 className="font-bold text-white text-sm font-mono mb-1 flex items-center gap-2">
                <span className="text-makima-red">01.</span> Hardware-Backed DRM (Widevine / FairPlay)
              </h4>
              <p className="text-xs text-gray-400 leading-relaxed">
                Decrypt content inside a hardware TEE (Trusted Execution Environment) so decryption keys never touch JavaScript memory or dev tools console.
              </p>
            </div>

            <div>
              <h4 className="font-bold text-white text-sm font-mono mb-1 flex items-center gap-2">
                <span className="text-makima-red">02.</span> Server-Side License Exchange
              </h4>
              <p className="text-xs text-gray-400 leading-relaxed">
                Use challenge-response license exchanges bound to user sessions instead of client-side key derivation scripts.
              </p>
            </div>

            <div>
              <h4 className="font-bold text-white text-sm font-mono mb-1 flex items-center gap-2">
                <span className="text-makima-red">03.</span> Dynamic Per-User Watermarking
              </h4>
              <p className="text-xs text-gray-400 leading-relaxed">
                Embed invisible forensic watermarks and A/B segment variations to trace redistributed streams to specific user accounts.
              </p>
            </div>

            <div>
              <h4 className="font-bold text-white text-sm font-mono mb-1 flex items-center gap-2">
                <span className="text-makima-red">04.</span> Token Binding & Short TTL
              </h4>
              <p className="text-xs text-gray-400 leading-relaxed">
                Issue single-use signed tokens with &lt;5 minute TTLs bound strictly to requester IP addresses and browser sessions.
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
              question="Why is custom key derivation less secure than standard hardware DRM like Widevine?"
              answer="Custom key derivation relies on JavaScript executing in the browser runtime to reconstruct cryptographic keys (like AES-128 keys) and perform decryption. Because JavaScript execution, memory heaps, and variables are completely open to inspection by client-side developer tools, custom hooks, and debuggers, keys can always be intercepted. In contrast, standard hardware-backed DRM (like Widevine L1) decrypts content inside a secure processor enclave (TEE) on the hardware layer, ensuring keys never touch the OS or JavaScript memory."
            />

            <FAQAccordion
              question="What is client-side anti-tampering in video players?"
              answer="Client-side anti-tampering refers to heuristics designed to detect browser inspection or modification. This includes scripts detecting if developer tools console is open (measuring viewport resize changes or intervals), verifying function integrity (toString() prototype checks), looking for browser extension content scripts, or monitoring debugging breakpoints. However, since the client controls the environment, these indicators can be bypassed by hooking or executing headless instances outside standard debug environments."
            />

            <FAQAccordion
              question="How does HLS segment decryption work?"
              answer="HTTP Live Streaming (HLS) splits video files into short segments (typically 2-10 seconds long) in .ts or .m4s format. In AES-128 encrypted HLS streams, the master .m3u8 playlist references a decryption key URI and initialization vector (IV) via the #EXT-X-KEY tag. The player fetches the key, initializes an AES-128 cipher block in CBC mode using the key and IV, and decrypts the segment chunks sequentially before rendering them in the video element."
            />
          </div>
        </section>

      </article>
    </Layout>
  );
}
