"use client";

import React, { useRef, useEffect } from "react";
import { motion, useInView } from "framer-motion";

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
    title: "Spectal Mainstage Experience",
    videoSrc: "/real_reel_00001.mp4",
    poster: "/feed_delhi.png",
    caption: "Feeling the heat on the mainstage! What a night this was with 20k+ screaming voices. Pure magic. ✨🚀",
    likes: "12.4K",
    comments: "342",
    views: "215K",
    audioTrack: "Original Audio • Spectal Live",
    url: "https://www.instagram.com/reel/DYpOev-IoD4/?igsh=dzJ0dnQ3YW53c2Zv",
  },
  {
    id: "02",
    location: "Mumbai, MH",
    year: "2024",
    title: "After Dark & Jazz Nights",
    videoSrc: "/real_reel_00002.mp4",
    poster: "/feed_mumbai.png",
    caption: "Intimate sessions in Bandra. When the lights go down, the groove comes alive. 🎷",
    likes: "8.2K",
    comments: "211",
    views: "89K",
    audioTrack: "Original Audio • Late Night Grooves",
    url: "https://www.instagram.com/reel/DW82kJcE29p/?igsh=NGNiNXhvZnN5OTky",
  },
  {
    id: "03",
    location: "Bengaluru, KA",
    year: "2024",
    title: "BLR Festival Aftermovie",
    videoSrc: "/real_reel_00003.mp4",
    poster: "/feed_bengaluru.png",
    caption: "Lasers, lights, and non-stop energy in Bengaluru. Thank you to everyone who made this special!",
    likes: "15.1K",
    comments: "530",
    views: "340K",
    audioTrack: "Original Audio • Festival Mix",
    url: "https://www.instagram.com/reel/DOGurP4D5YI/?igsh=NG95cXF0MGFwcmJu",
  },
  {
    id: "04",
    location: "Goa, GA",
    year: "2023",
    title: "Sunset Sessions by the Beach",
    videoSrc: "/real_reel_00004.mp4",
    poster: "/feed_goa.png",
    caption: "Golden hour beats. Bringing the ultimate festival vibes straight to the coastline.",
    likes: "9.5K",
    comments: "185",
    views: "112K",
    audioTrack: "Original Audio • Beach Vibes",
    url: "https://www.instagram.com/reel/DNqNglJo_gR/?igsh=a3Qzd3EwZTZ0emJ6",
  },
  {
    id: "05",
    location: "Delhi, IN",
    year: "2025",
    title: "Live Performance & Crowd",
    videoSrc: "/real_reel_00005.mp4",
    poster: "/feed_reel5.png",
    caption: "Electric moments from the stage! Unforgettable energy with the squad. 🔥⚡",
    likes: "18.6K",
    comments: "412",
    views: "290K",
    audioTrack: "Original Audio • Spectal Live",
    url: "https://www.instagram.com/p/DZ70-PLmHey/?img_index=2&igsh=emZzeG9zb2ZqdXBh",
  },
  {
    id: "06",
    location: "Mumbai, MH",
    year: "2025",
    title: "Campus Takeover & Lights",
    videoSrc: "/real_reel_00006.mp4",
    poster: "/feed_reel6.png",
    caption: "Taking over campus grounds across India. High octane visuals & production. 🚀✨",
    likes: "24.1K",
    comments: "689",
    views: "450K",
    audioTrack: "Original Audio • Spectal Campus",
    url: "https://www.instagram.com/reel/DbYNpTWI-wr/?igsh=MTlpdjFpaXVhdnV3dg==",
  },
  {
    id: "07",
    location: "India Tour",
    year: "2025",
    title: "Cultural IP & Festivals",
    videoSrc: "/real_reel_00007.mp4",
    poster: "/feed_reel7.png",
    caption: "Bringing youth culture to life. Behind the scenes with Spectal. 🎧🔥",
    likes: "14.8K",
    comments: "305",
    views: "195K",
    audioTrack: "Original Audio • Spectal IP",
    url: "https://www.instagram.com/p/Dbs_nMDmDun/?igsh=MTlhdDJ2eGw3ZmtxZQ==",
  },
];

function ReelCard({
  reel,
  isInView,
}: {
  reel: ReelItem;
  isInView: boolean;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (isInView) {
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          // Autoplay policy prevented playback, poster remains sharp
        });
      }
    } else {
      video.pause();
    }
  }, [isInView]);

  return (
    <a
      href={reel.url}
      target="_blank"
      rel="noopener noreferrer"
      data-interactive="true"
      data-cursor="WATCH"
      className="flex-shrink-0 w-[270px] sm:w-[300px] md:w-[330px] group relative flex flex-col justify-between bg-zinc-950 border border-white/10 rounded-2xl overflow-hidden hover:border-spectal-red hover:shadow-[0_0_30px_rgba(201,73,61,0.25)] transition-all duration-300 transform-gpu"
    >
      {/* Reel Header (Reel Tag) */}
      <div className="flex items-center justify-end px-4 py-3 border-b border-white/10 text-[10px] font-mono tracking-widest uppercase text-white/70 bg-black/70 backdrop-blur-sm z-20">
        <span className="text-spectal-mint font-bold flex items-center gap-1">
          <IconPlay className="w-2 h-2" /> REEL
        </span>
      </div>

      {/* Video Reel Container */}
      <div className="relative w-full aspect-[9/16] overflow-hidden bg-zinc-900 flex items-center justify-center">
        <video
          ref={videoRef}
          src={reel.videoSrc}
          poster={reel.poster}
          loop
          muted
          playsInline
          preload="metadata"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out will-change-transform transform-gpu"
        />

        {/* Gradient Overlay for Readable Text */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent group-hover:from-black/95 transition-all duration-300 z-10 pointer-events-none" />

        {/* Instagram Watermark Badge */}
        <div className="absolute top-3.5 right-3.5 z-20 bg-black/60 backdrop-blur-md p-2 rounded-full border border-white/15 text-white text-xs shadow-lg group-hover:bg-spectal-red group-hover:border-spectal-red transition-colors duration-300">
          <IconInstagram className="w-3.5 h-3.5" />
        </div>

        {/* Top User Pill on Hover */}
        <div className="absolute top-3.5 left-3.5 z-20 flex items-center gap-2 bg-black/70 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/15">
          <div className="w-4 h-4 rounded-full bg-spectal-red flex items-center justify-center">
            <span className="text-[7px] font-black text-white">S</span>
          </div>
          <span className="text-[9px] font-mono text-white/90">@spectal.management</span>
        </div>

        {/* Bottom Details & CTA Overlay */}
        <div className="absolute bottom-0 inset-x-0 p-4 z-20 flex flex-col text-white">
          {/* Hover CTA Bar */}
          <div className="flex items-center justify-between text-xs font-mono">
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1 text-spectal-red font-bold text-[10px]">
                <IconHeart className="w-3 h-3 text-spectal-red" /> {reel.likes}
              </span>
            </div>
            <span className="text-[9px] uppercase tracking-widest text-spectal-mint font-bold group-hover:text-white transition-colors duration-200">
              WATCH ON INSTAGRAM ↗
            </span>
          </div>
        </div>
      </div>
    </a>
  );
}

export default function SocialFeed() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { margin: "300px 0px" });

  // Doubled array for seamless infinite marquee loop (2x is all that's needed)
  const marqueeReels = [
    ...INSTAGRAM_REELS,
    ...INSTAGRAM_REELS,
  ];

  return (
    <section
      id="reels"
      ref={sectionRef}
      className="w-full bg-black text-white py-20 md:py-32 border-t border-white/10 relative z-20 pointer-events-auto overflow-hidden"
    >
      {/* Ambient Red & Mint Background Glow */}
      <div
        className="absolute top-1/2 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] pointer-events-none z-0 opacity-30"
        style={{
          background: "radial-gradient(circle, rgba(201, 73, 61, 0.25) 0%, rgba(0, 0, 0, 0) 70%)",
        }}
      />

      <div className="max-w-[1600px] mx-auto px-6 md:px-12 relative z-10 mb-14">
        {/* Editorial Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 border-b border-white/10 pb-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: "-10%" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-3xl flex flex-col gap-2"
          >
            <h2 className="text-4xl md:text-6xl font-syne font-bold tracking-tight leading-[1.1] md:leading-[1.15] text-white uppercase">
              BUILT BY <span className="text-spectal-mint font-serif italic font-light">SPECTAL</span>
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
        <div className="absolute top-0 bottom-0 left-0 w-20 md:w-32 bg-gradient-to-r from-black via-black/80 to-transparent z-30 pointer-events-none" />
        <div className="absolute top-0 bottom-0 right-0 w-20 md:w-32 bg-gradient-to-l from-black via-black/80 to-transparent z-30 pointer-events-none" />

        <div className="animate-marquee hover:[animation-play-state:paused] flex items-center gap-6 w-max py-4 will-change-transform transform-gpu">
          {marqueeReels.map((reel, index) => (
            <ReelCard
              key={`${reel.id}-${index}`}
              reel={reel}
              isInView={isInView}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
