import React from 'react';
import { motion } from 'framer-motion';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs) {
  return twMerge(clsx(inputs));
}

const navItems = [
  { label: "Home", href: "#home" },
  { label: "Reel Edit", href: "#reels" },
  { label: "Motion Graphic", href: "#motion" },
  { label: "Broadcast Editing", href: "#broadcast" },
  { label: "Text Editing", href: "#text" },
  { label: "Reviews", href: "#reviews" },
  { label: "Contact Me", href: "#contact" },
];

const Navbar = () => {
  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="absolute top-10 left-1/2 -translate-x-1/2 z-[50] w-[95%] max-w-fit px-4"
    >
      <div className="relative group bg-obsidian/40 backdrop-blur-2xl border border-white/5 rounded-2xl flex items-center justify-start md:justify-center gap-1 md:gap-2 p-1.5 px-4 shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-x-auto no-scrollbar scroll-smooth">
        {navItems.map((item) => (
          <a
            key={item.label}
            href={item.href}
            onClick={(e) => {
              e.preventDefault();
              const target = document.querySelector(item.href);
              if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
              }
            }}
            className="group/item relative px-4 py-2 rounded-xl text-[10px] md:text-sm font-medium tracking-wide whitespace-nowrap transition-all duration-500 text-white/50 hover:text-white"
          >
            {/* Cinematic Glow Background */}
            <div className="absolute inset-0 bg-gradient-to-b from-accent/20 to-transparent transition-all duration-500 rounded-xl blur-md -z-10 scale-110 opacity-0 group-hover/item:opacity-100" />

            {/* Soft Button Surface */}
            <div className="absolute inset-0 bg-white/5 transition-all duration-500 rounded-xl -z-10 opacity-0 group-hover/item:opacity-100" />

            {/* Bottom Accent Line */}
            <motion.span
              className="absolute inset-x-4 -bottom-0.5 h-[1.5px] bg-gradient-to-r from-transparent via-accent to-transparent transition-all duration-500 opacity-0 group-hover/item:opacity-100"
            />

            <span className="relative z-10">{item.label}</span>
          </a>
        ))}
      </div>
    </motion.nav>
  );
};

export default Navbar;
