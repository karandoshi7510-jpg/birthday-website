import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Sparkles } from 'lucide-react';
import { triggerHeartShower, triggerBirthdayBlast } from '../utils/confettiHelper';
import { playPopSound } from '../utils/audioSynthesizer';

export default function DirectLoveModal({ isOpen, onContinue, senderName }) {
  if (!isOpen) return null;

  const handleContinue = () => {
    playPopSound();
    triggerBirthdayBlast();
    triggerHeartShower();
    onContinue();
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-gradient-to-b from-[#FFF0F3] via-[#FFE4E8] to-[#FCE7F3] min-h-[100dvh] overflow-y-auto select-none"
      >
        {/* Ambient Glowing Orbs */}
        <div className="absolute w-72 sm:w-96 h-72 sm:h-96 rounded-full bg-pink-400/25 blur-3xl -top-10 -left-10 animate-pulse-glow pointer-events-none" />
        <div className="absolute w-72 sm:w-96 h-72 sm:h-96 rounded-full bg-rose-400/20 blur-3xl -bottom-10 -right-10 animate-pulse-glow pointer-events-none" />

        {/* Floating Heart / Petal Icons in background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(12)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute text-xl sm:text-2xl opacity-40"
              style={{
                left: `${(i * 9 + 4) % 94}%`,
                top: `${(i * 8 + 6) % 92}%`,
              }}
              animate={{
                y: [-10, 10, -10],
                rotate: [-8, 8, -8],
                scale: [0.9, 1.1, 0.9],
              }}
              transition={{
                duration: 4 + (i % 3),
                repeat: Infinity,
                delay: i * 0.3,
                ease: 'easeInOut',
              }}
            >
              {i % 2 === 0 ? '💖' : '🌸'}
            </motion.div>
          ))}
        </div>

        {/* Content Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: -20 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="relative z-10 max-w-lg w-full glass-panel-deep p-5 sm:p-8 rounded-3xl border-2 border-pink-200/90 shadow-2xl text-center my-auto"
        >
          {/* Avu's Portrait + Glowing Heart Badge */}
          <div className="relative my-2 sm:my-3 flex items-center justify-center">
            {/* Outer pulsating radial glow */}
            <motion.div
              animate={{ scale: [1, 1.3, 1], opacity: [0.4, 0.75, 0.4] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute w-28 sm:w-32 h-28 sm:h-32 rounded-full bg-pink-400/40 blur-xl"
            />

            {/* Avu's Real Photo inside Glowing Romantic Frame */}
            <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-full p-1 bg-gradient-to-tr from-rose-500 via-pink-400 to-amber-300 shadow-xl shadow-pink-300/60">
              <img
                src="/photos/avu2_traditional_pink.jpg"
                alt="Avu"
                className="w-full h-full object-cover rounded-full"
              />
              {/* Pinned Glowing Heart Badge */}
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute -bottom-1 -right-1 w-9 h-9 rounded-full bg-gradient-to-tr from-pink-600 to-rose-500 flex items-center justify-center text-white shadow-md border-2 border-white"
              >
                <Heart className="w-5 h-5 fill-white" />
              </motion.div>
            </div>
          </div>

          {/* Staggered Direct Love Message */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="mt-3"
          >
            <h2 className="font-serif text-2xl xs:text-3xl sm:text-4xl font-extrabold text-rose-950 tracking-tight">
              Hey <span className="rose-gold-gradient font-black">AVU</span> <span className="text-pink-500">❤️</span>
            </h2>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="font-script text-lg xs:text-xl sm:text-2xl text-rose-700/90 mt-1 italic"
          >
            I have something special to tell you...
          </motion.p>

          {/* Prominent Love Statement */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6, duration: 0.6, type: 'spring' }}
            className="my-4 py-2.5 px-3 sm:px-4 rounded-2xl bg-gradient-to-r from-pink-50 via-rose-50 to-pink-50 border border-pink-200/80 shadow-inner"
          >
            <h3 className="font-serif text-xl xs:text-2xl sm:text-3xl font-black text-rose-600 tracking-wide flex items-center justify-center gap-2">
              <span>I LOVE YOU SO MUCH!</span>
              <span className="text-pink-500">❤️</span>
            </h3>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="font-sans text-xs xs:text-sm sm:text-base text-rose-900/90 leading-relaxed max-w-sm mx-auto font-medium"
          >
            You are one of the most special people in my life. Today is your day, and I want to make your 18th birthday unforgettable.
          </motion.p>

          {/* Sender sign-off preview */}
          {senderName && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 0.5 }}
              className="mt-3 text-xs sm:text-sm font-handwriting text-rose-700 text-xl font-bold"
            >
              — Forever yours, <span className="underline decoration-pink-300">{senderName || 'Karan'} ❤️</span>
            </motion.p>
          )}

          {/* Large touch-friendly Action Button */}
          <motion.button
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1, duration: 0.5 }}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            onClick={handleContinue}
            className="w-full mt-5 py-3.5 sm:py-4 px-6 rounded-full font-serif font-bold text-white text-sm sm:text-lg bg-gradient-to-r from-pink-500 via-rose-500 to-amber-400 hover:from-pink-600 hover:to-rose-600 shadow-xl shadow-pink-300/60 flex items-center justify-center gap-2 cursor-pointer border border-white/50 active:scale-95 touch-manipulation"
          >
            <span>Enter Your Birthday Wonderland</span>
            <Sparkles className="w-4 sm:w-5 h-4 sm:h-5 text-amber-100" />
          </motion.button>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
