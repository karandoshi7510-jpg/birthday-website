import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, PartyPopper, ChevronDown, Cake, Heart } from 'lucide-react';
import { triggerBirthdayBlast, triggerHeartShower } from '../utils/confettiHelper';
import { playPopSound } from '../utils/audioSynthesizer';

export default function HeroSection({ onScrollToSection, onOpenLoveModal }) {
  const handlePopConfetti = () => {
    playPopSound();
    triggerBirthdayBlast();
    setTimeout(() => {
      triggerHeartShower();
    }, 200);
  };

  // Floating Balloons data (scaled and positioned safely)
  const balloons = [
    { id: 1, color: 'from-pink-300 to-rose-400', left: '3%', delay: 0, duration: 5, size: 'w-10 h-14 sm:w-16 sm:h-20' },
    { id: 2, color: 'from-rose-200 to-pink-300', left: '12%', delay: 1.5, duration: 6, size: 'w-9 h-12 sm:w-14 sm:h-18' },
    { id: 3, color: 'from-amber-100 to-pink-200', right: '12%', delay: 0.8, duration: 5.5, size: 'w-9 h-12 sm:w-14 sm:h-18' },
    { id: 4, color: 'from-pink-400 to-rose-500', right: '3%', delay: 2.2, duration: 6.5, size: 'w-10 h-14 sm:w-16 sm:h-20' },
  ];

  return (
    <section className="relative min-h-[92vh] flex flex-col items-center justify-center pt-24 sm:pt-28 pb-14 px-3 sm:px-6 text-center overflow-hidden w-full">
      {/* Floating Balloons */}
      {balloons.map((b) => (
        <motion.div
          key={b.id}
          style={{ left: b.left, right: b.right }}
          animate={{
            y: [-8, 12, -8],
            rotate: [-3, 4, -3],
          }}
          transition={{
            duration: b.duration,
            delay: b.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute top-16 sm:top-24 pointer-events-none hidden xs:flex flex-col items-center z-10"
        >
          <div
            className={`${b.size} rounded-[50%_50%_50%_50%_/_40%_40%_60%_60%] bg-gradient-to-tr ${b.color} shadow-md relative flex items-center justify-center border border-white/40`}
          >
            <div className="absolute top-1.5 left-2 w-2 h-3.5 rounded-full bg-white/60 blur-[0.5px] rotate-[-25deg]" />
            <div className="absolute -bottom-1 w-2 h-1.5 bg-rose-400 rounded-xs" />
          </div>
          <div className="w-0.5 h-16 sm:h-24 bg-gradient-to-b from-pink-300/80 to-transparent" />
        </motion.div>
      ))}

      {/* Hero Content Container */}
      <div className="relative z-20 max-w-4xl mx-auto flex flex-col items-center w-full">
        {/* Crown & Intro pill */}
        <motion.div
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full glass-panel border border-pink-200/80 shadow-xs mb-3 sm:mb-4"
        >
          <span className="text-base sm:text-lg">👑</span>
          <span className="text-[11px] sm:text-xs font-bold tracking-wider text-rose-800 uppercase">
            Official 18th Birthday Celebration
          </span>
          <Sparkles className="w-3.5 h-3.5 text-pink-500" />
        </motion.div>

        {/* WEBSITE TITLE */}
        <motion.h1
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="font-serif text-3xl xs:text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-rose-950 mb-1 sm:mb-2 leading-tight px-1"
        >
          AVU TURNS <span className="rose-gold-gradient font-black">18</span> <span className="text-pink-500 inline-block animate-pulse">❤️</span>
        </motion.h1>

        {/* SUBTITLE */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="font-script text-xl xs:text-2xl sm:text-3xl md:text-4xl text-rose-700/95 max-w-2xl mb-4 sm:mb-6 leading-relaxed px-2"
        >
          A New Chapter, A Thousand Dreams & A Million Beautiful Moments.
        </motion.p>

        {/* Real Birthday Girl Polaroid Highlight */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85, rotate: -3 }}
          animate={{ opacity: 1, scale: 1, rotate: -2 }}
          whileHover={{ scale: 1.05, rotate: 0 }}
          transition={{ duration: 0.6, delay: 0.35 }}
          className="relative my-2 cursor-pointer group"
          onClick={() => onScrollToSection('scrapbook')}
        >
          {/* Polaroid frame */}
          <div className="bg-white p-2.5 pb-5 rounded-xl shadow-xl border border-pink-100 flex flex-col items-center max-w-[170px] sm:max-w-[200px]">
            <div className="w-36 sm:w-44 h-44 sm:h-52 rounded-lg overflow-hidden relative shadow-inner bg-rose-50">
              <img
                src="/photos/avu3_twirl_joy.jpg"
                alt="Avu Birthday Girl"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute top-2 right-2 px-2 py-0.5 rounded-full bg-white/90 backdrop-blur-xs text-[10px] font-bold text-rose-800 shadow-xs flex items-center gap-1">
                <span>Queen Avu</span>
                <Sparkles className="w-3 h-3 text-pink-500" />
              </div>
            </div>
            <span className="font-handwriting text-rose-700 text-lg sm:text-xl mt-2 font-bold flex items-center gap-1">
              <span>Turning 18 Today</span>
              <Heart className="w-3.5 h-3.5 fill-pink-500 text-pink-500" />
            </span>
          </div>
        </motion.div>

        {/* GIANT ANIMATED NUMBER 18 */}
        <motion.div
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 0.9,
            delay: 0.45,
            type: 'spring',
            stiffness: 90,
            damping: 12,
          }}
          className="relative my-1 sm:my-3 select-none group"
        >
          {/* Ambient Pulsing Aura Behind 18 */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-pink-300 via-rose-300 to-amber-200 opacity-40 blur-3xl scale-110 animate-pulse-glow" />

          {/* Number 18 with 3D gradient text styling */}
          <div className="relative text-7xl xs:text-8xl sm:text-9xl md:text-[10rem] font-serif font-black tracking-tighter leading-none">
            <span className="rose-gold-gradient drop-shadow-xl inline-block filter hover:scale-105 transition-transform duration-500">
              18
            </span>

            {/* Floating Sparkles pinned on the number */}
            <motion.span
              animate={{ rotate: 360, scale: [1, 1.25, 1] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
              className="absolute -top-2 -right-1 sm:-top-3 sm:right-2 text-xl sm:text-3xl text-amber-300 filter drop-shadow"
            >
              ✨
            </motion.span>
            <motion.span
              animate={{ y: [-3, 3, -3] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute bottom-2 -left-3 sm:-left-5 text-xl sm:text-3xl text-pink-400 filter drop-shadow"
            >
              💖
            </motion.span>
          </div>
        </motion.div>

        {/* WELCOME TEXT as specified */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.55 }}
          className="max-w-xl mx-auto mb-5 sm:mb-8 px-2"
        >
          <p className="font-serif text-base xs:text-lg sm:text-2xl text-rose-900 font-semibold leading-relaxed">
            Finally 18! Welcome to a beautiful new chapter of your life, <span className="font-bold text-pink-600 underline decoration-pink-300 decoration-wavy">AVU</span>.
          </p>
          <p className="text-xs sm:text-sm text-rose-700/80 mt-1.5 font-sans">
            Eighteen years of spreading warmth, laughs, and pure magic everywhere you go.
          </p>
        </motion.div>

        {/* Action Buttons: Confetti & Cake & Love Message */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.7 }}
          className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3.5 mb-8 sm:mb-10 w-full px-2"
        >
          {/* Confetti Trigger */}
          <button
            onClick={handlePopConfetti}
            className="flex-1 xs:flex-none flex items-center justify-center gap-2 px-5 py-3.5 rounded-full font-serif font-bold text-white bg-gradient-to-r from-pink-500 via-rose-500 to-rose-400 hover:from-pink-600 hover:to-rose-500 shadow-lg shadow-pink-300/50 cursor-pointer border border-white/40 text-xs sm:text-sm active:scale-95 touch-manipulation"
          >
            <PartyPopper className="w-4 h-4" />
            <span>Pop Confetti! 🎉</span>
          </button>

          {/* Jump to Cake */}
          <button
            onClick={() => onScrollToSection('cake')}
            className="flex-1 xs:flex-none flex items-center justify-center gap-2 px-5 py-3.5 rounded-full font-serif font-semibold text-rose-800 glass-panel hover:bg-white/90 shadow-xs border border-pink-200 text-xs sm:text-sm active:scale-95 touch-manipulation cursor-pointer"
          >
            <Cake className="w-4 h-4 text-pink-500" />
            <span>Blow 18 Candles</span>
          </button>

          {/* Read Love Message button */}
          {onOpenLoveModal && (
            <button
              onClick={onOpenLoveModal}
              className="w-full xs:w-auto flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-full text-rose-700 bg-pink-100/70 hover:bg-pink-100 text-xs font-semibold border border-pink-200 cursor-pointer active:scale-95 touch-manipulation"
            >
              <span>Read Love Message ❤️</span>
            </button>
          )}
        </motion.div>

        {/* Milestone Cards Banner */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="grid grid-cols-3 gap-2 sm:gap-4 max-w-md w-full mb-8 px-2"
        >
          <div className="glass-card p-2 sm:p-3 rounded-2xl text-center border border-pink-100">
            <span className="text-sm xs:text-base sm:text-xl font-bold font-serif text-rose-800">18</span>
            <p className="text-[9px] xs:text-[10px] sm:text-xs text-rose-600 font-medium mt-0.5">Glorious Years</p>
          </div>
          <div className="glass-card p-2 sm:p-3 rounded-2xl text-center border border-pink-100">
            <span className="text-sm xs:text-base sm:text-xl font-bold font-serif text-rose-800">1000+</span>
            <p className="text-[9px] xs:text-[10px] sm:text-xs text-rose-600 font-medium mt-0.5">Sweet Dreams</p>
          </div>
          <div className="glass-card p-2 sm:p-3 rounded-2xl text-center border border-pink-100">
            <span className="text-sm xs:text-base sm:text-xl font-bold font-serif text-rose-800">∞</span >
            <p className="text-[9px] xs:text-[10px] sm:text-xs text-rose-600 font-medium mt-0.5">Moments of Love</p>
          </div>
        </motion.div>

        {/* Scroll down indicator */}
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          onClick={() => onScrollToSection('scrapbook')}
          className="flex flex-col items-center gap-1 cursor-pointer text-rose-400 hover:text-rose-600 transition-colors pt-2"
        >
          <span className="text-[10px] sm:text-xs font-serif tracking-widest uppercase">Explore Scrapbook Memories</span>
          <ChevronDown className="w-4 h-4" />
        </motion.div>
      </div>
    </section>
  );
}
