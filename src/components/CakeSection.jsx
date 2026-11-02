import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, PartyPopper, RotateCcw } from 'lucide-react';
import { playCandleBlowSound, playSparkleChime } from '../utils/audioSynthesizer';
import { triggerBirthdayBlast, triggerStarFairyDust, triggerHeartShower } from '../utils/confettiHelper';

export default function CakeSection() {
  // 18 candles state (true = lit, false = blown out)
  const [candles, setCandles] = useState(Array(18).fill(true));
  const [isWishGranted, setIsWishGranted] = useState(false);
  const [showWishModal, setShowWishModal] = useState(false);

  const litCount = candles.filter(Boolean).length;

  // Blow out an individual candle
  const blowCandle = (index) => {
    if (!candles[index]) return;
    const updated = [...candles];
    updated[index] = false;
    setCandles(updated);

    // If that was the last candle
    if (updated.filter(Boolean).length === 0) {
      celebrateWish();
    }
  };

  // Blow all 18 candles and grant wish
  const handleMakeWish = () => {
    playCandleBlowSound();
    setCandles(Array(18).fill(false));
    setIsWishGranted(true);

    setTimeout(() => {
      triggerBirthdayBlast();
      triggerHeartShower();
      triggerStarFairyDust();
      setShowWishModal(true);
    }, 400);
  };

  const celebrateWish = () => {
    playCandleBlowSound();
    setIsWishGranted(true);
    setTimeout(() => {
      triggerBirthdayBlast();
      setShowWishModal(true);
    }, 300);
  };

  // Relight candles
  const handleRelight = () => {
    playSparkleChime();
    setCandles(Array(18).fill(true));
    setIsWishGranted(false);
    setShowWishModal(false);
  };

  return (
    <section id="cake" className="py-16 sm:py-20 px-3 sm:px-6 max-w-5xl mx-auto relative z-10 text-center w-full overflow-hidden">
      {/* Section Header */}
      <div className="max-w-2xl mx-auto mb-8 sm:mb-10 px-2">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-pink-100/70 text-rose-700 text-xs font-semibold mb-3 tracking-wider uppercase border border-pink-200"
        >
          <Sparkles className="w-3.5 h-3.5 text-pink-500" />
          <span>Interactive 18th Birthday Ritual</span>
          <Sparkles className="w-3.5 h-3.5 text-pink-500" />
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="font-serif text-2xl xs:text-3xl sm:text-5xl font-bold text-rose-950 mb-2 sm:mb-3"
        >
          Make a Wish, Avu! 🎂
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="font-sans text-xs xs:text-sm sm:text-base text-rose-700/80 max-w-md mx-auto"
        >
          Eighteen glowing candles represent eighteen years of pure grace. Close your eyes, think of your sweetest dream, and blow them out!
        </motion.p>
      </div>

      {/* 3D-Style Tiered Birthday Cake Stage - Fluid Responsive */}
      <div className="relative max-w-full sm:max-w-lg mx-auto py-6 sm:py-8 flex flex-col items-center justify-center select-none px-2">
        {/* Glow behind cake */}
        <div className="absolute w-56 sm:w-72 h-56 sm:h-72 rounded-full bg-gradient-to-tr from-pink-300 to-amber-200 opacity-30 blur-3xl pointer-events-none" />

        {/* 18 CANDLES ROW - Fits all 360px+ screens smoothly */}
        <div className="relative z-20 flex justify-center items-end gap-0.5 xs:gap-1 sm:gap-1.5 px-1 -mb-1 sm:-mb-2 w-full max-w-full">
          {candles.map((isLit, i) => (
            <div
              key={i}
              onClick={() => blowCandle(i)}
              className="flex flex-col items-center cursor-pointer group touch-manipulation"
              title={`Candle #${i + 1} (${isLit ? 'Tap to blow out' : 'Blown out'})`}
            >
              {/* Animated Flame */}
              <div className="h-4 xs:h-5 sm:h-6 flex items-center justify-center">
                {isLit ? (
                  <motion.div
                    animate={{
                      scaleY: [1, 1.25, 0.95, 1.15, 1],
                      scaleX: [1, 0.9, 1.1, 0.95, 1],
                      rotate: [-2, 3, -1, 2, -2],
                    }}
                    transition={{
                      duration: 1.1 + (i % 5) * 0.15,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    }}
                    className="w-2 xs:w-2.5 sm:w-3 h-3.5 xs:h-4.5 sm:h-5 rounded-full bg-gradient-to-t from-amber-500 via-yellow-300 to-white shadow-[0_0_8px_#f59e0b] filter drop-shadow-xs origin-bottom"
                  />
                ) : (
                  /* Smoke Wisp after candle is blown out */
                  <motion.div
                    initial={{ opacity: 0.8, y: 0, scale: 0.8 }}
                    animate={{ opacity: 0, y: -12, scale: 1.4 }}
                    transition={{ duration: 1.2 }}
                    className="text-[9px] xs:text-[10px] text-gray-400 select-none font-bold"
                  >
                    ~
                  </motion.div>
                )}
              </div>

              {/* Candle Wick */}
              <div className="w-0.5 h-1 sm:h-1.5 bg-gray-700" />

              {/* Candle Body */}
              <div
                className={`w-2 xs:w-2.5 sm:w-3.5 h-8 xs:h-9 sm:h-12 rounded-t-xs shadow-xs border-x border-white/50 ${
                  i % 3 === 0
                    ? 'bg-gradient-to-b from-pink-300 to-rose-400'
                    : i % 3 === 1
                    ? 'bg-gradient-to-b from-amber-200 to-yellow-300'
                    : 'bg-gradient-to-b from-rose-200 to-pink-300'
                }`}
              >
                {/* Candle spiral stripes */}
                <div className="w-full h-full opacity-35 bg-[repeating-linear-gradient(45deg,transparent,transparent_2px,white_2px,white_4px)]" />
              </div>
            </div>
          ))}
        </div>

        {/* CAKE TIER 1 (TOP TIER - Strawberry Cream) */}
        <div className="relative z-10 w-full max-w-[210px] xs:max-w-[240px] sm:max-w-[280px] h-16 sm:h-20 rounded-t-3xl bg-gradient-to-b from-[#FFF0F3] via-[#FFE4E8] to-[#FFD1DC] shadow-md border-t-2 border-white flex flex-col items-center justify-start overflow-hidden">
          {/* Strawberry Frosting Drips */}
          <div className="w-full flex justify-between px-1.5 pt-0.5 opacity-80">
            {[...Array(9)].map((_, idx) => (
              <div
                key={idx}
                className="w-4 xs:w-5 sm:w-6 h-4 sm:h-5 rounded-b-full bg-gradient-to-b from-[#FF8FA3] to-[#FF758F] shadow-inner"
              />
            ))}
          </div>

          {/* Pearl & Flower decorations */}
          <div className="flex items-center gap-2 sm:gap-3 mt-1">
            <span className="text-[10px] sm:text-xs">🌸</span>
            <span className="font-serif font-bold text-[11px] sm:text-xs text-rose-800 tracking-wider">
              SWEET 18
            </span>
            <span className="text-[10px] sm:text-xs">🌸</span>
          </div>
        </div>

        {/* CAKE TIER 2 (BOTTOM TIER - Vanilla Sponge & Rose Gold Ribbon) */}
        <div className="relative z-10 w-full max-w-[260px] xs:max-w-[290px] sm:max-w-[340px] h-22 sm:h-28 rounded-t-xl rounded-b-2xl bg-gradient-to-b from-[#FFF5F7] via-[#FFEBF0] to-[#FCE1E8] shadow-xl border-t border-white/90 flex flex-col justify-between p-1.5 sm:p-2">
          {/* White cream rosettes border */}
          <div className="flex justify-around items-center -mt-1.5">
            {[...Array(12)].map((_, i) => (
              <div
                key={i}
                className="w-3 sm:w-4 h-3 sm:h-4 rounded-full bg-white shadow-xs border border-pink-100"
              />
            ))}
          </div>

          {/* Rose Gold Filigree Ribbon */}
          <div className="w-full py-1 bg-gradient-to-r from-rose-400 via-pink-300 to-amber-200 shadow-xs flex items-center justify-center">
            <span className="font-script text-white text-base sm:text-xl tracking-wider drop-shadow-xs">
              Queen Avu • Chapter 18
            </span>
          </div>

          {/* Bottom Piping */}
          <div className="flex justify-around items-center mb-0.5">
            {[...Array(14)].map((_, i) => (
              <div
                key={i}
                className="w-2.5 sm:w-3.5 h-2.5 sm:h-3.5 rounded-full bg-white shadow-xs"
              />
            ))}
          </div>
        </div>

        {/* GOLDEN CAKE STAND / PLATTER - 100% responsive */}
        <div className="relative z-0 -mt-1.5 w-full max-w-[290px] xs:max-w-[320px] sm:max-w-[370px] h-5 sm:h-6 rounded-[50%] bg-gradient-to-r from-[#E5A93C] via-[#FDE68A] to-[#C99026] shadow-xl border-t-2 border-white/80" />
        <div className="w-24 sm:w-32 h-5 sm:h-6 bg-gradient-to-b from-[#C99026] to-[#A36E13] rounded-b-xl shadow-md" />
        <div className="w-40 sm:w-56 h-2.5 sm:h-3 rounded-full bg-gradient-to-r from-[#A36E13] via-[#FDE68A] to-[#A36E13] shadow-lg" />

        {/* Candles Status Indicator */}
        <div className="mt-5 sm:mt-6 text-xs sm:text-sm font-medium text-rose-700 px-2">
          {litCount > 0 ? (
            <span>
              🕯️ <strong className="text-pink-600">{litCount}</strong> of 18 candles glowing. Tap candles or use button below:
            </span>
          ) : (
            <span className="text-pink-600 font-serif font-bold text-sm sm:text-base">
              ✨ All 18 candles blown out! Your wish is on its way to the stars. ✨
            </span>
          )}
        </div>

        {/* Buttons: Make a Wish & Relight */}
        <div className="mt-4 sm:mt-5 flex flex-wrap items-center justify-center gap-3 w-full max-w-sm sm:max-w-md px-2">
          {litCount > 0 ? (
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              onClick={handleMakeWish}
              className="w-full sm:w-auto flex items-center justify-center gap-2 py-4 px-6 rounded-full font-serif font-bold text-white bg-gradient-to-r from-pink-500 via-rose-500 to-amber-400 hover:from-pink-600 hover:to-rose-600 shadow-xl shadow-pink-300/60 cursor-pointer border border-white/50 text-sm sm:text-base active:scale-95 touch-manipulation"
            >
              <PartyPopper className="w-4 h-4 sm:w-5 sm:h-5" />
              <span>Make a Wish & Blow All 18 Candles 🎂</span>
            </motion.button>
          ) : (
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              onClick={handleRelight}
              className="w-full sm:w-auto flex items-center justify-center gap-2 py-3.5 px-6 rounded-full font-serif font-semibold text-rose-800 glass-panel hover:bg-white shadow-md cursor-pointer border border-pink-200 text-xs sm:text-sm active:scale-95 touch-manipulation"
            >
              <RotateCcw className="w-4 h-4 text-pink-500" />
              <span>Relight Candles & Make Another Wish</span>
            </motion.button>
          )}
        </div>
      </div>

      {/* Birthday Wish Celebration Modal */}
      <AnimatePresence>
        {showWishModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 select-none">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowWishModal(false)}
              className="fixed inset-0 bg-rose-950/75 backdrop-blur-sm"
            />

            {/* Modal Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 15 }}
              className="relative z-10 max-w-sm sm:max-w-md w-full bg-gradient-to-b from-[#FFFDFD] to-[#FFF0F4] rounded-3xl p-5 sm:p-8 shadow-2xl border-2 border-pink-200 text-center"
            >
              <div className="w-14 sm:w-16 h-14 sm:h-16 rounded-full bg-gradient-to-tr from-pink-400 to-amber-300 text-white flex items-center justify-center mx-auto mb-3 sm:mb-4 shadow-lg text-xl sm:text-2xl">
                ✨
              </div>

              <h3 className="font-serif text-xl sm:text-3xl font-bold text-rose-950 mb-1.5 sm:mb-2">
                Your Wish is Sent to the Stars!
              </h3>

              <p className="font-script text-xl sm:text-2xl text-pink-600 mb-3 sm:mb-4">
                Happy 18th Birthday, AVU ❤️
              </p>

              <p className="font-sans text-xs sm:text-sm text-rose-800/90 leading-relaxed mb-5 sm:mb-6">
                May every single candle you blew out tonight carry your deepest hopes and wildest dreams directly to the universe. You deserve all the happiness this world has to offer!
              </p>

              <button
                type="button"
                onClick={() => setShowWishModal(false)}
                className="w-full py-3.5 px-6 rounded-full font-serif font-bold text-white bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 shadow-md shadow-pink-200 transition-all cursor-pointer active:scale-95 touch-manipulation"
              >
                Thank You! 💖
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
