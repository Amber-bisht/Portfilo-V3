import React, { useState, useEffect } from 'react';
import Layout from '@/components/Layout';
import Head from 'next/head';
import BlogAudioPlayer from '@/components/BlogAudioPlayer';
import { 
  Play, 
  Pause, 
  Copy, 
  Check, 
  ShieldCheck, 
  Video, 
  Key, 
  Lock, 
  Server, 
  Layers, 
  AlertTriangle 
} from 'lucide-react';

export default function HowISecuredVideoStreamingLMSPage() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeSection, setActiveSection] = useState('intro');

  const tocItems = [
    { id: 'intro', title: 'Introduction' },
    { id: 'pipeline-end-to-end', title: 'The pipeline, end to end' },
    { id: 'cdn-signed-urls', title: 'Why CDN & signed URLs matter' },
    { id: 'aes-128-fit', title: 'Where AES-128 actually fits' },
    { id: 'access-control-rbac', title: 'RBAC & session accountability' },
    { id: 'what-this-leaves-out', title: 'What this deliberately leaves out' }
  ];

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 250;
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

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <Layout title="Building a Piracy-Resistant Video LMS | Amber Bisht">
      <Head>
        <title>Building a Piracy-Resistant Video LMS: Architecture Behind AES-128 HLS Delivery</title>
        <meta 
          name="description" 
          content="An engineering deep dive into the architecture of a piracy-resistant video LMS using AES-128 HLS encryption, AWS Elemental MediaConvert transcoding, CloudFront signed URLs, and Web Worker decryption." 
        />
      </Head>

      <div className="bg-black text-white min-h-screen">
        
        {/* Top Header Hero */}
        <div className="pt-20 pb-12 px-6 max-w-5xl mx-auto text-center">
          
          {/* Metadata row */}
          <div className="flex items-center justify-center gap-3 text-xs md:text-sm font-sans text-zinc-400 mb-6">
            <span>March 25, 2026</span>
            <span className="text-zinc-600">·</span>
            <span className="text-zinc-300 font-medium">Engineering Deep Dive</span>
            <span className="text-zinc-600">·</span>
            <span>5 min read</span>
          </div>

          {/* Title */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.12] max-w-4xl mx-auto mb-6">
            Building a Piracy-Resistant Video LMS: Architecture Behind AES-128 HLS Delivery
          </h1>

          {/* Byline */}
          <p className="text-sm md:text-base text-zinc-400 font-sans mb-10">
            By <span className="text-zinc-200 font-medium">Amber Bisht</span>, Full-Stack & Systems Engineer
          </p>

          {/* Minimalist Audio / Listen Bar with live audio playback */}
          <BlogAudioPlayer audioSrc="/lms.mp3" initialDuration={294} />
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
                Most learning platforms eventually run into the same problem: paid video content is trivial to rip once it reaches a browser, unless the delivery pipeline is designed with that assumption from day one. When I built my own LMS, the goal wasn&apos;t &quot;unbreakable&quot; DRM — nothing running in a browser truly is — it was to raise the cost of piracy high enough that casual downloading and account sharing stop being worth the effort, while keeping playback fast and infrastructure costs sane. Here&apos;s how the system is put together, layer by layer.
              </p>
            </section>

            {/* Section: The pipeline, end to end */}
            <section id="pipeline-end-to-end" className="mb-14 scroll-mt-24">
              <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-white mt-12 mb-6">
                The pipeline, end to end
              </h2>
              <p className="mb-6">
                An instructor uploads a raw MP4 to a private S3 bucket. That upload triggers an S3 event, which kicks off AWS Elemental MediaConvert to transcode the video and package it as HLS — a manifest file plus a sequence of short <code className="text-zinc-200 bg-zinc-900 px-1.5 py-0.5 rounded font-mono text-sm">.ts</code> segments rather than one large file. This is where AWS MediaConvert does the heavy lifting: producing multiple bitrate renditions for adaptive streaming, encrypting each segment with AES-128, and writing the output to a second, separate S3 bucket dedicated to processed content.
              </p>
              <p className="mb-6">
                Splitting raw and processed storage into two buckets isn&apos;t cosmetic. The raw bucket holds original uploads and is never exposed to the public internet — only the transcoding pipeline can read from it. The processed bucket holds encrypted, streaming-ready segments and is the only one CloudFront is allowed to serve from. If credentials for the CDN-facing bucket ever leaked, there&apos;d be nothing in it but already-encrypted, time-limited content — the source files stay isolated.
              </p>
            </section>

            {/* Section: Why the CDN and signed URLs matter as much as encryption */}
            <section id="cdn-signed-urls" className="mb-14 scroll-mt-24">
              <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-white mt-12 mb-6">
                Why the CDN and signed URLs matter as much as encryption
              </h2>
              <p className="mb-6">
                Encryption without access control just means someone has to work slightly harder before they can download the plaintext key along with the ciphertext. So the delivery layer does two things at once: CloudFront sits in front of the S3 processed bucket as the CDN, caching segments at the edge for low-latency playback, and every request to it has to carry a signed URL.
              </p>
              <p className="mb-6">
                Signed URLs (or signed cookies, depending on how playback is scoped) are generated server-side, per session, with a short expiry window — typically minutes, not hours. The signature is tied to the resource path and an expiry timestamp, so a URL copied out of the network tab and shared elsewhere stops working once it expires, and can&apos;t be replayed against a different segment. Pairing this with origin access control on the bucket means the S3 objects themselves are unreachable directly — CloudFront is the only path in, and CloudFront won&apos;t serve anything without a valid signature.
              </p>
            </section>

            {/* Section: Where AES-128 actually fits */}
            <section id="aes-128-fit" className="mb-14 scroll-mt-24">
              <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-white mt-12 mb-6">
                Where AES-128 actually fits
              </h2>
              <p className="mb-6">
                The HLS segments are encrypted with AES-128 in CBC mode, which is the standard, well-understood approach HLS itself was designed around — this isn&apos;t custom cryptography, it&apos;s the boring, correct primitive. Each <code className="text-zinc-200 bg-zinc-900 px-1.5 py-0.5 rounded font-mono text-sm">.ts</code> chunk is decrypted client-side as it&apos;s fetched, using a key delivered separately from the manifest.
              </p>
              <p className="mb-6">
                The part that actually matters for security isn&apos;t the AES-128 step itself — that&apos;s table stakes — it&apos;s how the key reaches the client. A key handed over as a static, unauthenticated fetch is only marginally better than no encryption at all, since anyone can just replay that same request. So the key exchange is bound to the session: a short-lived, per-session secret (in my case negotiated via an ECDH handshake) is used so the actual AES key is never transmitted as a bare value that could be captured once and reused indefinitely. Decryption itself happens off the main thread in a Web Worker, partly for playback performance and partly so the raw key material isn&apos;t sitting in globally accessible browser state.
              </p>
            </section>

            {/* Section: Access control: RBAC and session accountability */}
            <section id="access-control-rbac" className="mb-14 scroll-mt-24">
              <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-white mt-12 mb-6">
                Access control: RBAC and session accountability
              </h2>
              <p className="mb-6">
                Underneath all of this sits role-based access control. Students, instructors, and admins get distinctly scoped permissions at the API layer — an instructor can push content into the pipeline, but nothing in the student-facing service can mint upload credentials or reach the raw bucket. This is enforced server-side on every request, not inferred from what the frontend chooses to render.
              </p>
              <p className="mb-6">
                Session accountability is the other half of deterrence. Every playback session logs IP and user-agent, so unusual patterns — the same account streaming from many locations, or fetching segments far faster than real playback would require — get flagged automatically rather than relying on someone noticing manually. None of this stops a determined, technically capable person from extracting a video once. It&apos;s designed to make casual ripping and credential sharing costly and traceable enough that most people don&apos;t bother, which — for a browser-delivered video product — is a realistic bar, not a fantasy of an unbreakable client.
              </p>
            </section>

            {/* Section: What this deliberately leaves out */}
            <section id="what-this-leaves-out" className="mb-14 scroll-mt-24">
              <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-white mt-12 mb-6">
                What this deliberately leaves out
              </h2>
              <p className="mb-6">
                A write-up like this is useful to other engineers precisely because it stays at the architecture level: buckets, signing, key exchange patterns, RBAC boundaries. It&apos;s not useful to anyone trying to defeat a specific deployment, because it doesn&apos;t include actual key values, endpoint paths, internal function names, or the exact byte-level encoding of any handshake — those specifics are what turn an architecture explainer into an extraction script, and they&apos;re also the parts that should differ across environments and rotate over time anyway.
              </p>
              <p className="border-t border-zinc-800 pt-8 text-zinc-300">
                If you&apos;re documenting your own system for a portfolio or blog, that&apos;s the line worth holding: explain the <em>shape</em> of the defense, not the literal values that make a specific instance breakable.
              </p>
            </section>

          </article>
        </div>

      </div>
    </Layout>
  );
}
