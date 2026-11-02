import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Sparkles, Send, RotateCcw, Share2, Check } from 'lucide-react';
import { playSparkleChime, playPopSound } from '../utils/audioSynthesizer';
import { triggerHeartShower } from '../utils/confettiHelper';

export default function FinalSurprise({ onReplay, senderName, onOpenLoveModal }) {
  const [hugCount, setHugCount] = useState(18);
  const [copied, setCopied] = useState(false);
  const [flyingHearts, setFlyingHearts] = useState([]);

  const handleSendHug = () => {
    playSparkleChime();
    setHugCount((prev) => prev + 1);

    // Add flying hearts animation
    const newId = Date.now();
    const newHeart = {
      id: newId,
      x: (Math.random() - 0.5) * 120,
    };
    setFlyingHearts((prev) => [...prev, newHeart]);
    setTimeout(() => {
      setFlyingHearts((prev) => prev.filter((h) => h.id !== newId));
    }, 1400);

    triggerHeartShower();
  };

  const handleWhatsAppShare = () => {
    const text = encodeURIComponent(
      `Thank you ${senderName || 'Karan'} for this breathtaking 18th birthday surprise website! It made my day so special and magical! ❤️✨ - Avu`
    );
    window.open(`https://api.whatsapp.com/send?text=${text}`, '_blank');
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    playPopSound();
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="final-surprise" className="py-16 sm:py-24 px-3 sm:px-6 relative z-10 overflow-hidden text-center w-full">
      {/* Twilight Ambient Glow */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-rose-100/30 to-pink-200/50 pointer-events-none" />

      {/* Floating Sky Lanterns in background */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          animate={{
            y: [-15, -160],
            x: [0, (i % 2 === 0 ? 20 : -20)],
            opacity: [0.3, 0.75, 0],
          }}
          transition={{
            duration: 8 + i * 2,
            repeat: Infinity,
            delay: i * 2.2,
            ease: 'linear',
          }}
          style={{
            left: `${10 + i * 16}%`,
            bottom: '10%',
          }}
          className="absolute pointer-events-none z-0"
        >
          <div className="w-5 sm:w-6 h-7 sm:h-9 rounded-t-lg rounded-b-md bg-gradient-to-t from-amber-400 via-rose-300 to-amber-100 shadow-[0_0_12px_rgba(251,191,36,0.8)] opacity-75" />
        </motion.div>
      ))}

      {/* Main Cinematic Card - Fluid for 360px+ screens */}
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="relative z-10 max-w-3xl mx-auto glass-panel-deep p-6 sm:p-14 rounded-3xl border-2 border-pink-200/90 shadow-2xl flex flex-col items-center w-full"
      >
        {/* Crown & Stars */}
        <div className="flex items-center gap-2 mb-4 sm:mb-6">
          <span className="text-2xl sm:text-3xl">👑</span>
          <Sparkles className="w-5 sm:w-6 h-5 sm:h-6 text-pink-500 animate-spin" style={{ animationDuration: '6s' }} />
          <span className="text-2xl sm:text-3xl">🌸</span>
        </div>

        {/* Display Text 1: Title */}
        <h2 className="font-serif text-2xl xs:text-3xl sm:text-5xl md:text-6xl font-extrabold text-rose-950 mb-4 sm:mb-6 leading-tight px-1">
          Happy 18th Birthday, <span className="rose-gold-gradient font-black">AVU</span>! <span className="text-pink-500 inline-block animate-pulse">❤️</span>
        </h2>

        {/* Display Text 2 & 3: Deep Wish as required */}
        <div className="space-y-3 sm:space-y-4 max-w-2xl mb-8 sm:mb-10 px-2">
          <p className="font-serif text-base xs:text-lg sm:text-2xl text-rose-900 font-semibold leading-relaxed">
            "May this new chapter bring you endless happiness, beautiful memories and everything your heart wishes for."
          </p>
          <p className="font-script text-xl xs:text-2xl sm:text-3xl text-pink-600 leading-relaxed font-bold">
            "Never stop being the wonderful person you are."
          </p>
        </div>

        {/* Personalized Sender Dedication */}
        <div className="mb-8 p-3 sm:p-4 rounded-2xl bg-white/70 border border-pink-200 max-w-md w-full text-xs sm:text-sm text-rose-800">
          <p className="text-rose-600 font-sans mb-1">
            From someone who wants to make your day extra special...
          </p>
          <p className="font-serif font-bold text-base sm:text-lg text-rose-950">
            {senderName || 'Karan'} ❤️
          </p>
        </div>

        {/* Interactive Birthday Hug Shower Button with Flying Hearts */}
        <div className="relative mb-6 sm:mb-8 w-full max-w-xs sm:max-w-md">
          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            onClick={handleSendHug}
            className="w-full py-4 px-6 rounded-full font-serif font-bold text-white bg-gradient-to-r from-pink-500 via-rose-500 to-amber-400 hover:from-pink-600 hover:to-rose-600 shadow-xl shadow-pink-300/60 cursor-pointer border border-white/50 text-sm sm:text-lg flex items-center justify-center gap-2 active:scale-95 touch-manipulation"
          >
            <Heart className="w-5 h-5 fill-white" />
            <span>Send Avu a Birthday Hug ({hugCount})</span>
          </motion.button>

          {/* Flying Hearts burst from button */}
          <AnimatePresence>
            {flyingHearts.map((h) => (
              <motion.div
                key={h.id}
                initial={{ opacity: 1, y: 0, x: h.x, scale: 0.8 }}
                animate={{ opacity: 0, y: -110, scale: 1.5 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1.2, ease: 'easeOut' }}
                className="absolute top-0 left-1/2 -translate-x-1/2 text-2xl pointer-events-none"
              >
                💖
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Action Buttons: WhatsApp Message, Copy Link & Replay */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-2.5 sm:gap-3 w-full max-w-lg mb-6 sm:mb-8">
          {/* WhatsApp share */}
          <button
            onClick={handleWhatsAppShare}
            className="w-full sm:flex-1 py-3.5 px-5 rounded-full font-sans font-semibold text-white bg-[#25D366] hover:bg-[#20bd5a] shadow-md transition-all hover:scale-102 cursor-pointer text-xs sm:text-sm flex items-center justify-center gap-2 active:scale-95 touch-manipulation"
          >
            <Send className="w-4 h-4" />
            <span>Reply via WhatsApp 💬</span>
          </button>

          {/* Copy link */}
          <button
            onClick={handleCopyLink}
            className="w-full sm:w-auto py-3.5 px-5 rounded-full font-sans font-medium text-rose-800 glass-panel hover:bg-white border border-pink-200 transition-all hover:scale-102 cursor-pointer text-xs sm:text-sm flex items-center justify-center gap-2 active:scale-95 touch-manipulation"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-emerald-500" />
                <span>Link Copied!</span>
              </>
            ) : (
              <>
                <Share2 className="w-4 h-4 text-rose-500" />
                <span>Share Link</span>
              </>
            )}
          </button>

          {/* Replay */}
          <button
            onClick={onReplay}
            className="w-full sm:w-auto py-3.5 px-5 rounded-full font-sans font-medium text-rose-800 glass-panel hover:bg-white border border-pink-200 transition-all hover:scale-102 cursor-pointer text-xs sm:text-sm flex items-center justify-center gap-2 active:scale-95 touch-manipulation"
          >
            <RotateCcw className="w-4 h-4 text-pink-500" />
            <span>Replay Surprise</span>
          </button>
        </div>

        {/* Footer Credit & Love Note */}
        <div className="pt-5 border-t border-pink-200/80 w-full text-center">
          <p className="font-script text-xl sm:text-2xl text-rose-800 font-bold mb-1">
            Made with all the love in the universe ❤️
          </p>
          <p className="text-[11px] sm:text-xs text-rose-500 font-sans tracking-wide">
            A bespoke 18th birthday gift crafted especially for AVU.
          </p>
        </div>
      </motion.div>
    </section>
  );
}
