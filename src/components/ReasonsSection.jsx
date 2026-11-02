import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Sparkles,
  Heart,
  Smile,
  Shield,
  Palette,
  Crown,
  Star,
  Coffee,
  Gem,
  Feather,
  Sun,
  Flame,
  Moon,
  Glasses,
  Flower2,
  Compass,
  Bird,
  HeartHandshake,
  CheckCircle2,
  Unlock,
} from 'lucide-react';
import { REASONS_LIST } from '../data/birthdayData';
import { playCardFlipSound, playSparkleChime } from '../utils/audioSynthesizer';
import { triggerStarFairyDust } from '../utils/confettiHelper';

const ICON_MAP = {
  Smile,
  Heart,
  Sparkles,
  Shield,
  Palette,
  Crown,
  Star,
  Coffee,
  Gem,
  Feather,
  Sun,
  Flame,
  Moon,
  Glasses,
  Flower2,
  Compass,
  Bird,
  HeartHandshake,
};

export default function ReasonsSection() {
  const [openedCards, setOpenedCards] = useState(new Set([1])); // First one open by default

  const toggleCard = (id) => {
    playCardFlipSound();
    setOpenedCards((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
        if (next.size === 18) {
          playSparkleChime();
          triggerStarFairyDust();
        }
      }
      return next;
    });
  };

  const handleRevealAll = () => {
    playSparkleChime();
    triggerStarFairyDust();
    setOpenedCards(new Set(REASONS_LIST.map((r) => r.id)));
  };

  const unlockedCount = openedCards.size;
  const progressPercent = Math.round((unlockedCount / 18) * 100);

  return (
    <section id="reasons" className="py-16 sm:py-20 px-3 sm:px-6 max-w-7xl mx-auto relative z-10 w-full overflow-hidden">
      {/* Section Header */}
      <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12 px-2">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-rose-100/70 text-rose-800 text-xs font-semibold mb-3 tracking-wider uppercase border border-rose-200"
        >
          <Sparkles className="w-3.5 h-3.5 text-pink-500" />
          <span>18 Years • 18 Reasons</span>
          <Sparkles className="w-3.5 h-3.5 text-pink-500" />
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="font-serif text-2xl xs:text-3xl sm:text-5xl font-bold text-rose-950 mb-2 sm:mb-4"
        >
          18 Little Reasons Why You're Special
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="font-sans text-xs xs:text-sm sm:text-base text-rose-700/80 mb-5 sm:mb-6"
        >
          Eighteen sweet truths and heartfelt compliments celebrating every sparkle that makes you AVU.
        </motion.p>

        {/* Discovery Progress Bar */}
        <div className="glass-panel p-3.5 sm:p-4 rounded-2xl max-w-md mx-auto border border-pink-200">
          <div className="flex justify-between items-center text-xs font-medium text-rose-800 mb-2">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-pink-500" />
              <span>Discovered: {unlockedCount} / 18</span>
            </span>
            <span className="font-bold text-pink-600">{progressPercent}%</span>
          </div>

          <div className="w-full h-2.5 bg-pink-100 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-pink-400 via-rose-400 to-amber-300 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${progressPercent}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>

          {unlockedCount < 18 ? (
            <button
              onClick={handleRevealAll}
              className="mt-3 text-xs text-rose-600 hover:text-rose-800 font-medium inline-flex items-center gap-1 cursor-pointer transition-colors active:scale-95 touch-manipulation"
            >
              <Unlock className="w-3.5 h-3.5 text-pink-500" />
              <span>Reveal all 18 reasons at once ✨</span>
            </button>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mt-2.5 text-xs font-serif font-bold text-pink-600"
            >
              🎉 All 18 reasons unlocked! You are truly one of a kind, Avu. ❤️
            </motion.div>
          )}
        </div>
      </div>

      {/* 18 Interactive Cards Grid - Touch Optimized */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-5 px-1">
        {REASONS_LIST.map((reason, index) => {
          const isOpen = openedCards.has(reason.id);
          const IconComponent = ICON_MAP[reason.icon] || Heart;

          return (
            <motion.div
              key={reason.id}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-20px' }}
              transition={{ duration: 0.4, delay: (index % 6) * 0.05 }}
              onClick={() => toggleCard(reason.id)}
              className="relative cursor-pointer select-none group touch-manipulation active:scale-[0.98] transition-transform"
            >
              <div
                className={`relative rounded-3xl p-4 sm:p-6 transition-all duration-300 border ${
                  isOpen
                    ? 'glass-panel-deep border-pink-300 shadow-xl shadow-pink-200/50 sm:-translate-y-1'
                    : 'glass-card border-white/80 hover:border-pink-300 hover:shadow-md'
                }`}
              >
                {/* Top Badge: Number and Category */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-gradient-to-tr from-pink-500 to-rose-400 text-white font-serif font-bold text-xs flex items-center justify-center shadow-xs">
                      #{reason.id}
                    </span>
                    <span className="text-[10px] sm:text-[11px] font-semibold text-rose-500 tracking-wider uppercase">
                      {reason.category}
                    </span>
                  </div>

                  {/* Icon */}
                  <div
                    className={`w-8 h-8 sm:w-9 sm:h-9 rounded-2xl flex items-center justify-center transition-colors ${
                      isOpen
                        ? 'bg-pink-500 text-white shadow-xs'
                        : 'bg-pink-100 text-pink-600 group-hover:bg-pink-200'
                    }`}
                  >
                    <IconComponent className="w-4 h-4 sm:w-5 sm:h-5" />
                  </div>
                </div>

                {/* Title */}
                <h3 className="font-serif text-lg sm:text-xl font-bold text-rose-950 mb-1.5">
                  {reason.title}
                </h3>

                {/* Animated Revealed Content */}
                <AnimatePresence initial={false}>
                  {isOpen ? (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.25 }}
                      className="overflow-hidden"
                    >
                      <p className="text-xs sm:text-sm font-sans text-rose-800/90 leading-relaxed pt-2 border-t border-pink-200/60">
                        {reason.text}
                      </p>
                      <div className="mt-2.5 flex items-center justify-end gap-1 text-[11px] font-script text-pink-500 text-base">
                        <span>Pure love for Avu</span>
                        <Heart className="w-3.5 h-3.5 fill-pink-500" />
                      </div>
                    </motion.div>
                  ) : (
                    <div className="flex items-center gap-1.5 text-xs text-rose-400 font-medium pt-2 border-t border-pink-100/60">
                      <Sparkles className="w-3.5 h-3.5 text-pink-400" />
                      <span>Tap to reveal secret...</span>
                    </div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
