import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Sparkles } from 'lucide-react';
import { playSparkleChime } from '../utils/audioSynthesizer';
import { triggerHeartShower, triggerBirthdayBlast } from '../utils/confettiHelper';

export default function OpeningSurprise({ onOpenSurprise }) {
  const [isOpening, setIsOpening] = useState(false);

  const handleOpen = () => {
    if (isOpening) return;
    setIsOpening(true);
    playSparkleChime();
    triggerHeartShower();

    setTimeout(() => {
      triggerBirthdayBlast();
    }, 400);

    // Transition smoothly to direct love message / celebration
    setTimeout(() => {
      onOpenSurprise();
    }, 950);
  };

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.03 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center p-3 sm:p-6 min-h-[100dvh] bg-gradient-to-b from-[#FFF0F3] via-[#FFE4E8] to-[#FCE7F3] overflow-y-auto select-none"
    >
      {/* Ambient background glowing circles */}
      <div className="absolute w-72 sm:w-[480px] h-72 sm:h-[480px] rounded-full bg-pink-300/30 blur-3xl -top-24 -left-16 animate-pulse-glow pointer-events-none" />
      <div className="absolute w-72 sm:w-[420px] h-72 sm:h-[420px] rounded-full bg-rose-200/40 blur-3xl -bottom-16 -right-16 animate-pulse-glow pointer-events-none" />

      {/* Floating Sparkles & Butterflies in background */}
      <motion.div
        animate={{ y: [-8, 8, -8], rotate: [0, 5, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-8 left-4 sm:left-16 text-xl sm:text-3xl opacity-60 pointer-events-none"
      >
        🦋
      </motion.div>
      <motion.div
        animate={{ y: [8, -8, 8], rotate: [0, -8, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-12 right-4 sm:right-16 text-xl sm:text-3xl opacity-60 pointer-events-none"
      >
        🌸
      </motion.div>
      <motion.div
        animate={{ y: [-6, 6, -6], scale: [1, 1.15, 1] }}
        transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute bottom-10 left-6 sm:left-24 text-lg sm:text-2xl opacity-60 pointer-events-none"
      >
        ✨
      </motion.div>
      <motion.div
        animate={{ y: [6, -6, 6] }}
        transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute bottom-12 right-6 sm:right-24 text-xl sm:text-3xl opacity-60 pointer-events-none"
      >
        💖
      </motion.div>

      {/* Main Envelope Card Container */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="relative z-10 max-w-md w-full flex flex-col items-center text-center my-auto px-2"
      >
        {/* Subtitle / Whisper Tag */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/80 border border-pink-200 shadow-xs text-xs sm:text-sm font-medium text-rose-700 mb-4 sm:mb-6 backdrop-blur-xs"
        >
          <Sparkles className="w-3.5 h-3.5 text-pink-500" />
          <span>A Secret Delivery for Chapter 18</span>
          <Sparkles className="w-3.5 h-3.5 text-pink-500" />
        </motion.div>

        {/* 3D Animated Envelope - fluid responsive sizing for 360px+ screens */}
        <div
          onClick={handleOpen}
          className="relative w-full max-w-[270px] xs:max-w-[300px] sm:max-w-[340px] h-44 xs:h-48 sm:h-52 mb-6 sm:mb-8 cursor-pointer group select-none transition-transform duration-300 hover:scale-102 active:scale-98 touch-manipulation"
          style={{ perspective: '1000px' }}
        >
          {/* Envelope Glow */}
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-pink-400 to-rose-400 opacity-20 blur-xl group-hover:opacity-40 transition-opacity" />

          {/* Envelope Base / Pocket */}
          <div className="absolute inset-0 bg-[#FFF5F7] rounded-2xl shadow-xl border-2 border-[#F9D2DC] flex items-center justify-center overflow-hidden">
            {/* Inner Letter Peek */}
            <motion.div
              animate={{
                y: isOpening ? -65 : 0,
                opacity: isOpening ? 1 : 0.85,
              }}
              transition={{ duration: 0.7, ease: 'easeInOut' }}
              className="absolute w-5/6 h-32 sm:h-36 bg-gradient-to-b from-[#FFFDFB] to-[#FFF1F4] rounded-lg shadow-md border border-pink-100 p-2 sm:p-3 flex flex-col items-center justify-center"
            >
              <span className="font-script text-xl sm:text-2xl text-rose-500">Avu Turns 18</span>
              <span className="text-[9px] sm:text-[10px] text-rose-400 font-sans tracking-widest uppercase mt-1">
                A Thousand Dreams Await ✨
              </span>
            </motion.div>

            {/* Diagonal Envelope Bottom Folds */}
            <div className="absolute inset-0 pointer-events-none">
              <div
                className="absolute inset-0"
                style={{
                  clipPath: 'polygon(0% 100%, 50% 50%, 100% 100%)',
                  backgroundColor: '#FFEBF0',
                }}
              />
              <div
                className="absolute inset-0"
                style={{
                  clipPath: 'polygon(0% 0%, 50% 50%, 0% 100%)',
                  backgroundColor: '#FFE4EB',
                }}
              />
              <div
                className="absolute inset-0"
                style={{
                  clipPath: 'polygon(100% 0%, 50% 50%, 100% 100%)',
                  backgroundColor: '#FFE4EB',
                }}
              />
            </div>
          </div>

          {/* Envelope Flap (Top Triangular Fold) */}
          <motion.div
            animate={{
              rotateX: isOpening ? 180 : 0,
              zIndex: isOpening ? 0 : 20,
            }}
            transition={{ duration: 0.7, ease: 'easeInOut' }}
            style={{
              transformOrigin: 'top center',
              clipPath: 'polygon(0% 0%, 100% 0%, 50% 100%)',
            }}
            className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-[#FCE1E8] to-[#F9D1DC] shadow-md rounded-t-2xl"
          />

          {/* Golden Wax Seal Stamp */}
          <motion.div
            animate={{
              scale: isOpening ? [1, 1.3, 0] : [1, 1.05, 1],
              opacity: isOpening ? [1, 1, 0] : 1,
            }}
            transition={
              isOpening
                ? { duration: 0.5 }
                : { duration: 2.2, repeat: Infinity, ease: 'easeInOut' }
            }
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30 w-12 sm:w-14 h-12 sm:h-14 rounded-full bg-gradient-to-tr from-[#9B4D5B] via-[#E5989B] to-[#F4ACB7] p-0.5 shadow-xl flex items-center justify-center border-2 border-white/70"
          >
            <div className="w-full h-full rounded-full bg-gradient-to-tr from-[#B76E79] to-[#C97A85] flex flex-col items-center justify-center text-white shadow-inner">
              <span className="font-serif font-bold text-base sm:text-lg tracking-wider text-amber-100">A</span>
              <span className="text-[7px] font-sans tracking-widest text-pink-200 uppercase -mt-1">18</span>
            </div>
          </motion.div>

          {/* Floating Hearts bursting from envelope on opening */}
          <AnimatePresence>
            {isOpening && (
              <>
                {[...Array(6)].map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 1, scale: 0.4, y: 0, x: 0 }}
                    animate={{
                      opacity: 0,
                      scale: 1.5,
                      y: -130 - Math.random() * 70,
                      x: (i - 2.5) * 40,
                    }}
                    transition={{ duration: 0.8, ease: 'easeOut' }}
                    className="absolute top-1/2 left-1/2 z-40 text-2xl text-pink-500 pointer-events-none"
                  >
                    ❤️
                  </motion.div>
                ))}
              </>
            )}
          </AnimatePresence>
        </div>

        {/* Text Section as specified by user */}
        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.6 }}
          className="font-serif text-xl xs:text-2xl sm:text-3xl text-rose-950 font-bold mb-2.5 max-w-sm leading-snug tracking-tight px-1"
        >
          Hey <span className="rose-gold-gradient font-black">AVU</span>! Someone has prepared something special for you...
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="text-xs sm:text-sm text-rose-700/80 mb-6 font-sans max-w-xs"
        >
          A gentle tap is all it takes to unlock a world filled with magic, memories, and 18 years of pure sunshine.
        </motion.p>

        {/* Surprise Button - large touch friendly */}
        <motion.button
          onClick={handleOpen}
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.96 }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="w-full max-w-xs sm:max-w-sm py-4 px-6 rounded-full font-serif font-bold text-white text-base sm:text-lg shadow-xl shadow-pink-400/40 cursor-pointer overflow-hidden rose-gold-bg border border-white/50 active:scale-95 touch-manipulation flex items-center justify-center gap-2.5"
        >
          <span>Open Your Birthday Surprise</span>
          <Heart className="w-5 h-5 fill-white text-white animate-pulse" />
        </motion.button>
      </motion.div>
    </motion.div>
  );
}
