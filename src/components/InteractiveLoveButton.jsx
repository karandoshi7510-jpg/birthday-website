import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Sparkles, Edit3, Check, X } from 'lucide-react';
import { triggerHeartShower } from '../utils/confettiHelper';
import { playSparkleChime, playCardFlipSound } from '../utils/audioSynthesizer';

export default function InteractiveLoveButton({ senderName, onUpdateSenderName }) {
  const [isRevealed, setIsRevealed] = useState(false);
  const [isEditingSender, setIsEditingSender] = useState(false);
  const [tempName, setTempName] = useState(senderName || 'Karan');

  const handleOpenSecret = () => {
    playSparkleChime();
    triggerHeartShower();
    setIsRevealed(true);
  };

  const handleSaveSender = (e) => {
    e.preventDefault();
    const clean = tempName.trim() || 'Karan';
    onUpdateSenderName(clean);
    setIsEditingSender(false);
    playCardFlipSound();
  };

  return (
    <section className="py-12 px-3 sm:px-4 max-w-2xl mx-auto text-center relative z-20 w-full overflow-hidden">
      {/* 3. INTERACTIVE LOVE BUTTON */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="flex flex-col items-center w-full"
      >
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleOpenSecret}
          className="w-full max-w-xs sm:max-w-md py-4 px-6 rounded-full font-serif font-bold text-white text-base sm:text-lg bg-gradient-to-r from-rose-500 via-pink-500 to-rose-400 hover:from-rose-600 hover:to-pink-600 shadow-xl shadow-pink-300/50 cursor-pointer border border-white/60 flex items-center justify-center gap-2.5 active:scale-95 touch-manipulation transition-all"
        >
          <span>One More Thing...</span>
          <Heart className="w-5 h-5 fill-white text-white animate-pulse" />
        </motion.button>
        <span className="text-[11px] sm:text-xs text-rose-500 font-sans mt-2">
          Tap to reveal an unspoken truth for Avu ✨
        </span>

        {/* 4. PERSONALIZED SENDER MESSAGE WITH PHOTO AVATAR */}
        <div className="mt-8 p-4 sm:p-5 rounded-3xl glass-panel border border-pink-200/80 max-w-md w-full shadow-sm flex flex-col items-center">
          {/* Karan & Avu Mini Photo Avatar */}
          <div className="relative mb-2">
            <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-pink-400 shadow-md">
              <img
                src="/photos/karan_and_avu.jpg"
                alt="Karan and Avu"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-pink-500 flex items-center justify-center text-white text-[10px]">
              ❤️
            </div>
          </div>

          <p className="text-xs sm:text-sm text-rose-700 font-sans mb-1.5">
            From someone who wants to make your day extra special...
          </p>

          {!isEditingSender ? (
            <div className="flex items-center justify-center gap-2">
              <span className="font-serif font-bold text-base sm:text-xl text-rose-950 px-3.5 py-1 rounded-xl bg-pink-100/60 border border-pink-200">
                {senderName || 'Karan'}
              </span>
              <button
                type="button"
                onClick={() => {
                  setTempName(senderName === 'Karan' ? '' : senderName);
                  setIsEditingSender(true);
                }}
                className="p-1.5 rounded-full hover:bg-pink-100 text-rose-600 transition-colors cursor-pointer"
                title="Edit Sender Name"
                aria-label="Edit Sender Name"
              >
                <Edit3 className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <form onSubmit={handleSaveSender} className="flex items-center gap-2 mt-1 w-full max-w-xs">
              <input
                type="text"
                placeholder="Type your name..."
                value={tempName}
                onChange={(e) => setTempName(e.target.value)}
                autoFocus
                className="flex-1 text-xs sm:text-sm px-3 py-1.5 rounded-xl border border-pink-300 bg-white focus:outline-none focus:ring-2 focus:ring-pink-400"
              />
              <button
                type="submit"
                className="px-3 py-1.5 rounded-xl bg-pink-500 text-white text-xs font-semibold hover:bg-pink-600 cursor-pointer flex items-center gap-1 shadow-xs"
              >
                <Check className="w-3.5 h-3.5" />
                <span>Save</span>
              </button>
              <button
                type="button"
                onClick={() => setIsEditingSender(false)}
                className="p-1.5 rounded-xl text-rose-600 hover:bg-pink-50 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </form>
          )}

          <p className="text-[10px] text-rose-400 mt-1.5">
            (Tap the pencil icon to edit)
          </p>
        </div>
      </motion.div>

      {/* Love Message Reveal Modal */}
      <AnimatePresence>
        {isRevealed && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 select-none">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsRevealed(false)}
              className="fixed inset-0 bg-rose-950/75 backdrop-blur-sm"
            />

            {/* Modal Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 15 }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
              className="relative z-10 max-w-md w-full glass-panel-deep p-5 sm:p-8 rounded-3xl border-2 border-pink-200 shadow-2xl text-center max-h-[92dvh] overflow-y-auto"
            >
              {/* Karan & Avu Romantic Photo Showcase */}
              <div className="relative mx-auto mb-3 w-40 sm:w-48 rounded-2xl overflow-hidden shadow-xl border-4 border-white bg-white group">
                <img
                  src="/photos/karan_and_avu.jpg"
                  alt="Karan and Avu Together"
                  className="w-full h-44 sm:h-52 object-cover"
                />
                <div className="absolute top-2 right-2 px-2 py-0.5 rounded-full bg-black/60 text-white text-[10px] font-bold flex items-center gap-1">
                  <span>You & Me</span>
                  <Heart className="w-3 h-3 fill-pink-400 text-pink-400" />
                </div>
              </div>

              {/* Exact Requested Message */}
              <div className="space-y-3 my-2">
                <p className="font-serif text-base sm:text-xl text-rose-950 font-semibold leading-relaxed">
                  "AVU, no matter how many birthdays come, I hope you always keep smiling. You deserve all the happiness in this world."
                </p>

                <div className="py-2.5 px-4 rounded-xl bg-pink-100/70 border border-pink-200">
                  <span className="font-serif font-black text-2xl sm:text-3xl text-rose-600 tracking-wide inline-flex items-center gap-2">
                    <span>I LOVE YOU!</span>
                    <Heart className="w-6 h-6 fill-rose-600 text-rose-600 animate-pulse" />
                  </span>
                </div>
              </div>

              {/* From Sender display */}
              <div className="mt-3 pt-3 border-t border-pink-100 text-xs text-rose-600 font-handwriting text-xl">
                Always & Forever, <span className="font-bold underline decoration-pink-300">{senderName || 'Karan'} ❤️</span>
              </div>

              {/* Close Button */}
              <button
                type="button"
                onClick={() => setIsRevealed(false)}
                className="w-full mt-5 py-3.5 px-6 rounded-full font-serif font-bold text-white bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 shadow-md shadow-pink-200 transition-all cursor-pointer active:scale-95 touch-manipulation text-sm sm:text-base"
              >
                I Promise to Keep Smiling 💖
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
