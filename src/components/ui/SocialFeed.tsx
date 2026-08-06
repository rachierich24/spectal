"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaInstagram, FaHeart, FaComment, FaExternalLinkAlt, FaMusic, FaPlay } from "react-icons/fa";

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
    poster: "",
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
    poster: "",
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
    poster: "",
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
    poster: "",
    caption: "Golden hour beats. Bringing the ultimate festival vibes straight to the coastline.",
    likes: "9.5K",
    comments: "185",
    views: "112K",
    audioTrack: "Original Audio • Beach Vibes",
    url: "https://www.instagram.com/reel/DNqNglJo_gR/?igsh=a3Qzd3EwZTZ0emJ6",
  },
];

function ReelCard({ reel, index, activeHover, setActiveHover }: {
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
          <FaPlay className="text-[8px]" /> REEL
        </span>
      </div>

      {/* Playable Video Reel Container */}
      <div className="relative w-full aspect-[9/16] overflow-hidden bg-zinc-900 flex items-center justify-center">
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
          <FaInstagram />
        </div>

        {/* Bottom Permanent Video Spec (Track & Views) */}
        <div className="absolute bottom-4 left-4 right-4 z-20 flex flex-col gap-1 text-white">
          <div className="flex items-center gap-2 text-[10px] font-mono text-spectal-mint uppercase tracking-wider truncate">
            <FaMusic className="text-[9px] animate-spin" style={{ animationDuration: '4s' }} />
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
                <FaExternalLinkAlt className="text-white/40 text-xs" />
              </div>

              {/* Overlay Middle: Post Caption */}
              <p className="text-xs text-white/90 font-light leading-relaxed my-3 line-clamp-5">
                {reel.caption}
              </p>

              {/* Overlay Footer: Likes, Comments & CTA */}
              <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs font-mono text-white/80">
                <div className="flex items-center gap-4">
                  <span className="flex items-center gap-1.5 text-spectal-red font-bold">
                    <FaHeart className="text-xs" /> {reel.likes}
                  </span>
                  <span className="flex items-center gap-1.5 text-spectal-mint">
                    <FaComment className="text-xs" /> {reel.comments}
                  </span>
                </div>
                <span className="text-[9px] uppercase tracking-widest text-spectal-mint font-bold group-hover:underline">
                  WATCH REEL ON INSTAGRAM ↗
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

  // Triplicated array for seamless infinite marquee loop with 4 items
  const marqueeReels = [...INSTAGRAM_REELS, ...INSTAGRAM_REELS, ...INSTAGRAM_REELS];

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
            <h2 className="text-4xl md:text-6xl font-boldonse font-medium tracking-tight leading-[1.1] md:leading-[1.15] text-white uppercase">
              ENTER THE WORLD WE <br className="hidden md:block" />
              <span className="text-spectal-mint font-serif italic font-light">CREATE</span> AFTER DARK
            </h2>
          </motion.div>

          <a
            href="https://www.instagram.com/spectal.management/"
            target="_blank"
            rel="noopener noreferrer"
            data-interactive="true"
            className="inline-flex items-center gap-3 text-xs font-mono tracking-widest uppercase text-spectal-mint border border-spectal-mint/30 hover:border-spectal-mint px-6 py-3 rounded-full hover:bg-spectal-mint/10 transition-all duration-300 w-fit flex-shrink-0"
          >
            <FaInstagram className="text-base" />
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
