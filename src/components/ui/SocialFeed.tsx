"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Inline SVG Icons (Zero dependency, fast & reliable)
function IconInstagram({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
    </svg>
  );
}

function IconHeart({ className = "w-3 h-3" }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
    </svg>
  );
}

function IconComment({ className = "w-3 h-3" }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M21.99 4c0-1.1-.89-2-1.99-2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h14l4 4-.01-18zM18 14H6v-2h12v2zm0-3H6V9h12v2zm0-3H6V6h12v2z" />
    </svg>
  );
}

function IconExternalLink({ className = "w-3 h-3" }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
    </svg>
  );
}

function IconMusic({ className = "w-3 h-3", style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg className={className} style={style} fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z" />
    </svg>
  );
}

function IconPlay({ className = "w-2.5 h-2.5" }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M8 5v14l11-7z" />
    </svg>
  );
}

interface ReelItem {
  id: string;
  location: string;
  year: string;
  title: string;
  videoSrc: string;
  poster: string;
  caption: string;
  likes: string;
  comments: string;
  views: string;
  audioTrack: string;
  url: string;
}

const INSTAGRAM_REELS: ReelItem[] = [
  {
    id: "01",
    location: "New Delhi, DL",
    year: "2025",
    title: "Mainstage Arena Showreel",
    videoSrc: "/verticalformat.mp4",
    poster: "/feed_delhi.png",
    caption: "20,000+ voices screaming as one. Unfiltered mainstage energy from the capital. 🖤 #SpectalLive",
    likes: "42.8K",
    comments: "842",
    views: "185K",
    audioTrack: "Ritviz • Udd Gaye (Live Spectal Edit)",
    url: "https://www.instagram.com/spectal.management/",
  },
  {
    id: "02",
    location: "Mumbai, MH",
    year: "2024",
    title: "Bandra Jazz & Nightclub",
    videoSrc: "/loader.mp4",
    poster: "/feed_mumbai.png",
    caption: "Intimate late-night jazz sessions after dark in Bandra. Pure soul and rhythm.",
    likes: "28.2K",
    comments: "418",
    views: "94K",
    audioTrack: "Nikhil D'Souza • After Dark Live",
    url: "https://www.instagram.com/spectal.management/",
  },
  {
    id: "03",
    location: "Bengaluru, KA",
    year: "2024",
    title: "BLR Festival Aftermovie",
    videoSrc: "/verticalformat.mp4",
    poster: "/feed_bengaluru.png",
    caption: "Lights, lasers, and 30+ headliners taking over Bengaluru. What a weekend! 🚀",
    likes: "51.5K",
    comments: "1.2K",
    views: "320K",
    audioTrack: "Nucleya • Bass Raja (Arena Mix)",
    url: "https://www.instagram.com/spectal.management/",
  },
  {
    id: "04",
    location: "Goa, GA",
    year: "2023",
    title: "Sunset Beach Fest Reel",
    videoSrc: "/horizontalformat.mp4",
    poster: "/feed_goa.png",
    caption: "Golden hour beats by the ocean. Bringing festival energy to Goa's coastline.",
    likes: "19.9K",
    comments: "340",
    views: "88K",
    audioTrack: "When Chai Met Toast • Yellow Paper Daisy",
    url: "https://www.instagram.com/spectal.management/",
  },
  {
    id: "05",
    location: "Pune, MH",
    year: "2023",
    title: "Campus Fest Mainstage",
    videoSrc: "/verticalformat.mp4",
    poster: "/feed_pune.png",
    caption: "College festival mainstage packed to maximum capacity. Gen-Z energy at its peak!",
    likes: "33.3K",
    comments: "612",
    views: "145K",
    audioTrack: "Seedhe Maut • Nayaab Live Tour",
    url: "https://www.instagram.com/spectal.management/",
  },
];

function ReelCard({
  reel,
  index,
  activeHover,
  setActiveHover,
}: {
  reel: ReelItem;
  index: number;
  activeHover: string | null;
  setActiveHover: (id: string | null) => void;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = true;
      videoRef.current.play().catch(() => {
        // Autoplay policy fallback
      });
    }
  }, []);

  const hoverId = `${reel.id}-${index}`;

  return (
    <motion.a
      href={reel.url}
      target="_blank"
      rel="noopener noreferrer"
      onMouseEnter={() => setActiveHover(hoverId)}
      onMouseLeave={() => setActiveHover(null)}
      className="flex-shrink-0 w-[280px] md:w-[320px] lg:w-[340px] group relative flex flex-col justify-between bg-zinc-950 border border-white/10 rounded-2xl overflow-hidden cursor-pointer hover:border-spectal-red/50 transition-all duration-500 shadow-2xl"
    >
      {/* Reel Header (Location & Reel Tag) */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-white/10 text-[10px] font-mono tracking-widest uppercase text-white/60 bg-black/60 z-20">
        <span className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-spectal-red animate-pulse" />
          {reel.location}
        </span>
        <span className="text-spectal-mint font-bold flex items-center gap-1">
          <IconPlay className="w-2 h-2" /> REEL
        </span>
      </div>

      {/* Playable Video Reel Container */}
      <div className="relative w-full aspect-[9/16] overflow-hidden bg-zinc-900">
        <video
          ref={videoRef}
          src={reel.videoSrc}
          autoPlay
          loop
          muted
          playsInline
          poster={reel.poster}
          onCanPlay={(e) => e.currentTarget.play()}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
        />

        {/* Dark Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent group-hover:opacity-30 transition-opacity duration-500 z-10" />

        {/* Instagram Reels Watermark Badge */}
        <div className="absolute top-4 right-4 z-20 bg-black/60 backdrop-blur-md p-2.5 rounded-full border border-white/10 text-white text-xs shadow-lg">
          <IconInstagram className="w-3.5 h-3.5" />
        </div>

        {/* Bottom Permanent Video Spec (Track & Views) */}
        <div className="absolute bottom-4 left-4 right-4 z-20 flex flex-col gap-1 text-white">
          <div className="flex items-center gap-2 text-[10px] font-mono text-spectal-mint uppercase tracking-wider truncate">
            <IconMusic className="w-2.5 h-2.5 animate-spin" style={{ animationDuration: "4s" }} />
            <span className="truncate">{reel.audioTrack}</span>
          </div>
          <div className="flex items-center justify-between text-xs font-bold font-boldonse">
            <span className="truncate">{reel.title}</span>
            <span className="text-[10px] font-mono text-white/60 ml-2">{reel.views} views</span>
          </div>
        </div>

        {/* Authentic Instagram Post Hover Overlay Reveal */}
        <AnimatePresence>
          {activeHover === hoverId && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 15 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="absolute inset-0 bg-black/88 backdrop-blur-md p-5 flex flex-col justify-between z-30"
            >
              {/* Overlay Header: Instagram User Pill */}
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-full p-[1.5px] bg-gradient-to-tr from-yellow-500 via-rose-500 to-purple-600">
                    <div className="w-full h-full bg-black rounded-full flex items-center justify-center">
                      <span className="text-[8px] font-black text-spectal-red">S</span>
                    </div>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] font-mono font-bold text-white leading-none">spectal.management</span>
                    <span className="text-[8px] font-mono text-spectal-mint leading-none mt-0.5">Verified Instagram Reel</span>
                  </div>
                </div>
                <IconExternalLink className="text-white/40 w-3.5 h-3.5" />
              </div>

              {/* Overlay Middle: Post Caption */}
              <p className="text-xs text-white/90 font-light leading-relaxed my-3 line-clamp-5">
                {reel.caption}
              </p>

              {/* Overlay Footer: Likes, Comments & CTA */}
              <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs font-mono text-white/80">
                <div className="flex items-center gap-4">
                  <span className="flex items-center gap-1.5 text-spectal-red font-bold">
                    <IconHeart className="w-3 h-3 text-spectal-red" /> {reel.likes}
                  </span>
                  <span className="flex items-center gap-1.5 text-spectal-mint">
                    <IconComment className="w-3 h-3 text-spectal-mint" /> {reel.comments}
                  </span>
                </div>
                <span className="text-[9px] uppercase tracking-widest text-spectal-mint font-bold group-hover:underline">
                  WATCH REEL ↗
                </span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.a>
  );
}

export default function SocialFeed() {
  const [activeHover, setActiveHover] = useState<string | null>(null);

  // Duplicated array for seamless infinite marquee loop
  const marqueeReels = [...INSTAGRAM_REELS, ...INSTAGRAM_REELS];

  return (
    <section className="w-full bg-black text-white py-24 md:py-32 border-t border-white/10 relative z-20 pointer-events-auto overflow-hidden">
      {/* Ambient Red & Mint Lighting */}
      <div className="absolute top-1/2 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-spectal-red/5 rounded-full blur-[160px] pointer-events-none z-0" />

      <div className="max-w-[1600px] mx-auto px-6 md:px-12 relative z-10 mb-16">
        {/* Editorial Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 border-b border-white/10 pb-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-3xl"
          >
            <span className="text-xs font-mono tracking-[0.4em] text-spectal-red mb-4 uppercase block">
              // REELS &amp; LIVE SHOWREELS
            </span>
            <h2 className="text-4xl md:text-6xl font-boldonse font-medium tracking-tight leading-[1.0] text-white uppercase">
              ENTER THE WORLD WE <span className="text-spectal-mint font-serif italic font-light">CREATE</span> AFTER DARK
            </h2>
          </motion.div>

          <a
            href="https://www.instagram.com/spectal.management/"
            target="_blank"
            rel="noopener noreferrer"
            data-interactive="true"
            className="inline-flex items-center gap-3 text-xs font-mono tracking-widest uppercase text-spectal-mint border border-spectal-mint/30 hover:border-spectal-mint px-6 py-3 rounded-full hover:bg-spectal-mint/10 transition-all duration-300 w-fit flex-shrink-0"
          >
            <IconInstagram className="w-4 h-4" />
            <span>@spectal.management</span>
          </a>
        </div>
      </div>

      {/* Infinite Marquee Container of Playable Video Reels */}
      <div className="w-full overflow-hidden relative select-none">
        {/* Left & Right Vignette Fades */}
        <div className="absolute top-0 bottom-0 left-0 w-24 bg-gradient-to-r from-black to-transparent z-30 pointer-events-none" />
        <div className="absolute top-0 bottom-0 right-0 w-24 bg-gradient-to-l from-black to-transparent z-30 pointer-events-none" />

        <div className="animate-marquee hover:[animation-play-state:paused] flex items-center gap-6 w-max py-4">
          {marqueeReels.map((reel, index) => (
            <ReelCard
              key={`${reel.id}-${index}`}
              reel={reel}
              index={index}
              activeHover={activeHover}
              setActiveHover={setActiveHover}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
