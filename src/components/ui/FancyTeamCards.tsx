"use client";

import { motion } from "framer-motion";

interface TeamMember {
  id: string;
  name: string;
  role: string;
  category: string;
  image: string;
  about: string;
  stats: string;
  location: string;
}

const TEAM_MEMBERS: TeamMember[] = [
  {
    id: "01",
    name: "Himanshu Chowdhry",
    role: "Founder & Managing Director",
    category: "Talent & Curation",
    image: "/founder_portrait.png",
    about: "Founder of Spectal Management. Built India's leading boutique talent & event agency from New Delhi, working with 50+ artists across music and comedy.",
    stats: "50+ Headliners",
    location: "New Delhi",
  },
  {
    id: "02",
    name: "Sourav Yadav",
    role: "Live Events Lead",
    category: "Production & Tours",
    image: "/event_mainstage.png",
    about: "Heads live event operations at Spectal. Manages end-to-end concert and campus festival production across 30+ cities.",
    stats: "200+ Concerts",
    location: "30+ Cities",
  },
  {
    id: "03",
    name: "Spectal Team",
    role: "Creative & Show Operations",
    category: "Brand Experiences",
    image: "/event_spatial.png",
    about: "A tight-knit team of creators, producers, and strategists delivering 200+ events and 50+ brand experiences.",
    stats: "50+ Brand Tours",
    location: "Pan India",
  },
];

export default function FancyTeamCards() {
  return (
    <section id="team" className="w-full py-24 md:py-32 flex flex-col items-center justify-center relative bg-black border-t border-white/10 z-20 pointer-events-auto">
      <div className="max-w-7xl w-full mx-auto px-6 md:px-12 flex flex-col select-none">
        
        {/* Editorial Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-6 border-b border-white/10 pb-8">
          <div className="flex flex-col items-start">
            <span className="text-xs font-mono tracking-[0.4em] text-spectal-red mb-3 uppercase">
              03 // LEADERSHIP
            </span>
            <h2 className="text-3xl md:text-5xl font-light tracking-tight text-white uppercase font-boldonse">
              The People Behind <span className="font-serif italic text-spectal-mint">Spectal</span>
            </h2>
          </div>
          <p className="max-w-xs text-xs font-mono text-white/40 uppercase tracking-widest leading-relaxed">
            [ Curating experiences &amp; building careers across India ]
          </p>
        </div>

        {/* Awwwards Editorial Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 w-full">
          {TEAM_MEMBERS.map((member) => (
            <motion.div
              key={member.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="group flex flex-col justify-between cursor-pointer border-b border-white/10 pb-8"
            >
              {/* Image Container with Smooth Filter Transition */}
              <div className="relative w-full aspect-[4/5] rounded-2xl overflow-hidden mb-6 bg-zinc-900 border border-white/10">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover grayscale contrast-110 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-500" />
                
                {/* Index Overlay */}
                <div className="absolute top-4 left-4 text-xs font-mono tracking-widest text-white/80 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full border border-white/10">
                  {member.id}
                </div>

                {/* Category Tag */}
                <div className="absolute bottom-4 left-4 text-[10px] font-mono tracking-widest text-spectal-mint uppercase bg-black/60 backdrop-blur-md px-3 py-1 rounded-full border border-spectal-mint/20">
                  {member.category}
                </div>
              </div>

              {/* Text Information */}
              <div className="flex flex-col flex-grow justify-between">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-xl md:text-2xl font-medium tracking-tight text-white group-hover:text-spectal-mint transition-colors duration-300">
                      {member.name}
                    </h3>
                    <span className="text-lg text-white/40 group-hover:text-spectal-mint group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300">
                      ↗
                    </span>
                  </div>

                  <p className="text-xs font-mono tracking-widest text-spectal-red uppercase mb-4">
                    {member.role}
                  </p>

                  <p className="text-xs text-white/60 font-light leading-relaxed mb-6">
                    {member.about}
                  </p>
                </div>

                {/* Footer Metadata */}
                <div className="flex items-center justify-between text-[10px] font-mono tracking-widest text-white/30 uppercase pt-4 border-t border-white/5">
                  <span>{member.stats}</span>
                  <span>{member.location}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
