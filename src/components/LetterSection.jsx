import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Sparkles, RotateCcw, FastForward, Feather } from 'lucide-react';
import { HEARTFELT_LETTER } from '../data/birthdayData';
import { playSparkleChime } from '../utils/audioSynthesizer';
import { triggerHeartShower } from '../utils/confettiHelper';

export default function LetterSection({ senderName }) {
  const [isOpen, setIsOpen] = useState(false);
  const [typedChars, setTypedChars] = useState(0);
  const [isTypingDone, setIsTypingDone] = useState(false);

  // Concatenate all letter text into a single continuous stream
  const fullText = React.useMemo(() => {
    return HEARTFELT_LETTER.paragraphs.join('\n\n');
  }, []);

  const handleOpenLetter = () => {
    if (!isOpen) {
      setIsOpen(true);
      playSparkleChime();
      triggerHeartShower();
      setTypedChars(0);
      setIsTypingDone(false);
    }
  };

  // Typing effect loop
  useEffect(() => {
    if (!isOpen || isTypingDone) return;

    if (typedChars < fullText.length) {
      const timeout = setTimeout(() => {
        setTypedChars((prev) => prev + 1);
      }, 18);
      return () => clearTimeout(timeout);
    } else {
      setIsTypingDone(true);
    }
  }, [isOpen, typedChars, fullText.length, isTypingDone]);

  const handleSkipTyping = () => {
    setTypedChars(fullText.length);
    setIsTypingDone(true);
  };

  const handleReplayLetter = () => {
    playSparkleChime();
    setTypedChars(0);
    setIsTypingDone(false);
  };

  // Current displayed typed text
  const displayedText = fullText.substring(0, typedChars);

  return (
    <section id="letter" className="py-16 sm:py-20 px-3 sm:px-6 max-w-4xl mx-auto relative z-10 w-full overflow-hidden">
      {/* Section Header */}
      <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12 px-2">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-pink-100/70 text-rose-700 text-xs font-semibold mb-3 tracking-wider uppercase border border-pink-200"
        >
          <Feather className="w-3.5 h-3.5" />
          <span>Written From The Heart</span>
          <Sparkles className="w-3.5 h-3.5" />
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="font-serif text-2xl xs:text-3xl sm:text-5xl font-bold text-rose-950 mb-2 sm:mb-3"
        >
          A Letter For AVU
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="font-sans text-xs xs:text-sm sm:text-base text-rose-700/80"
        >
          An honest, sweet, and timeless message celebrating the woman you are blossoming into.
        </motion.p>
      </div>

      {/* Main Container */}
      <div className="relative flex flex-col items-center w-full px-1">
        {/* Animated Envelope when NOT opened */}
        {!isOpen && (
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.02 }}
            onClick={handleOpenLetter}
            className="w-full max-w-xs sm:max-w-md h-56 sm:h-72 rounded-3xl bg-gradient-to-tr from-[#FFE4E8] via-[#FFF0F3] to-[#FCE7F3] border-2 border-pink-200/90 shadow-2xl p-4 sm:p-6 flex flex-col items-center justify-center cursor-pointer relative overflow-hidden group select-none active:scale-98 touch-manipulation"
          >
            {/* Ambient Envelope glow */}
            <div className="absolute inset-0 bg-pink-400/10 opacity-0 group-hover:opacity-100 transition-opacity blur-xl" />

            {/* Faux Ribbon */}
            <div className="absolute top-0 bottom-0 w-6 sm:w-8 bg-gradient-to-b from-rose-300 via-pink-300 to-rose-300 opacity-70 shadow-xs" />
            <div className="absolute left-0 right-0 h-6 sm:h-8 bg-gradient-to-r from-rose-300 via-pink-300 to-rose-300 opacity-70 shadow-xs" />

            {/* Wax Seal Center */}
            <div className="relative z-10 w-16 sm:w-20 h-16 sm:h-20 rounded-full bg-gradient-to-tr from-[#9B4D5B] to-[#E5989B] p-1 shadow-xl flex items-center justify-center border-2 border-white/80 group-hover:scale-105 transition-transform">
              <div className="w-full h-full rounded-full bg-[#B76E79] flex flex-col items-center justify-center text-white shadow-inner">
                <span className="font-serif font-bold text-base sm:text-xl text-amber-100">AVU</span>
                <span className="text-[7px] sm:text-[8px] font-sans tracking-widest text-pink-200 uppercase">18</span>
              </div>
            </div>

            <span className="relative z-10 mt-4 sm:mt-5 font-serif font-semibold text-rose-900 text-base sm:text-lg group-hover:text-pink-600 transition-colors flex items-center gap-2">
              <Mail className="w-4 h-4 text-pink-500" />
              <span>Tap to Open Your Letter</span>
            </span>
            <span className="relative z-10 text-[11px] sm:text-xs text-rose-500/80 font-sans mt-0.5">
              Specially penned for your 18th birthday
            </span>
          </motion.div>
        )}

        {/* Opened Letter Parchment */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: 25, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              className="w-full max-w-2xl bg-[#FFFDF9] rounded-3xl p-5 sm:p-10 shadow-2xl border border-[#F4E1D2] relative overflow-hidden"
              style={{
                backgroundImage:
                  'radial-gradient(#E8D5C4 0.75px, transparent 0.75px), radial-gradient(#E8D5C4 0.75px, #FFFDF9 0.75px)',
                backgroundSize: '24px 24px',
                backgroundPosition: '0 0, 12px 12px',
              }}
            >
              {/* Decorative Corner Borders */}
              <div className="absolute top-3 left-3 w-5 h-5 border-t-2 border-l-2 border-[#D4A373]/50 rounded-tl-lg" />
              <div className="absolute top-3 right-3 w-5 h-5 border-t-2 border-r-2 border-[#D4A373]/50 rounded-tr-lg" />
              <div className="absolute bottom-3 left-3 w-5 h-5 border-b-2 border-l-2 border-[#D4A373]/50 rounded-bl-lg" />
              <div className="absolute bottom-3 right-3 w-5 h-5 border-b-2 border-r-2 border-[#D4A373]/50 rounded-br-lg" />

              {/* Letter Controls Header */}
              <div className="flex flex-wrap items-center justify-between gap-2 pb-4 border-b border-pink-100 mb-5">
                <div className="flex items-center gap-1.5 text-[11px] sm:text-xs font-semibold text-rose-700 tracking-wider uppercase font-sans">
                  <span className="w-2 h-2 rounded-full bg-pink-500 animate-ping" />
                  <span>{HEARTFELT_LETTER.date}</span>
                </div>

                <div className="flex items-center gap-1.5">
                  {!isTypingDone && (
                    <button
                      type="button"
                      onClick={handleSkipTyping}
                      className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-pink-50 hover:bg-pink-100 text-pink-700 text-xs font-medium cursor-pointer transition-colors active:scale-95 touch-manipulation"
                    >
                      <FastForward className="w-3.5 h-3.5" />
                      <span>Skip Typing</span>
                    </button>
                  )}
                  {isTypingDone && (
                    <button
                      type="button"
                      onClick={handleReplayLetter}
                      className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-pink-50 hover:bg-pink-100 text-rose-700 text-xs font-medium cursor-pointer transition-colors active:scale-95 touch-manipulation"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>Replay</span>
                    </button>
                  )}
                </div>
              </div>

              {/* Salutation */}
              <h3 className="font-script text-2xl xs:text-3xl sm:text-4xl text-rose-800 mb-4 font-bold">
                {HEARTFELT_LETTER.salutation}
              </h3>

              {/* Typewriter Body */}
              <div className="font-editorial text-base xs:text-lg sm:text-xl text-[#3D2E2B] leading-relaxed whitespace-pre-line tracking-wide">
                {displayedText}
                {!isTypingDone && (
                  <span className="inline-block w-1.5 sm:w-2 h-4 sm:h-5 bg-pink-500 ml-1 animate-pulse align-middle" />
                )}
              </div>

              {/* Closing Signature */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: isTypingDone ? 1 : 0.4 }}
                transition={{ duration: 0.6 }}
                className="mt-8 pt-5 border-t border-pink-100/80 flex flex-col items-end text-right"
              >
                <p className="font-serif italic text-xs sm:text-sm text-rose-700 mb-1">
                  {HEARTFELT_LETTER.closing}
                </p>
                <p className="font-script text-2xl sm:text-3xl text-rose-900 font-bold flex items-center gap-1.5">
                  <span>{senderName ? `${senderName} ❤️` : HEARTFELT_LETTER.signature}</span>
                </p>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
