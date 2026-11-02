import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, Heart, Sparkles } from 'lucide-react';

export default function LightboxModal({
  isOpen,
  photo,
  onClose,
  onPrev,
  onNext,
  onLike,
}) {
  // Keyboard navigation & light-dismiss
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') onPrev();
      if (e.key === 'ArrowRight') onNext();
    };

    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose, onPrev, onNext]);

  if (!isOpen || !photo) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-2.5 sm:p-6 select-none">
        {/* Backdrop overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-rose-950/75 backdrop-blur-md"
        />

        {/* Modal Container - Fluid Responsive for Mobile */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 15 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className="relative z-10 max-w-3xl w-full bg-white/95 rounded-3xl overflow-hidden shadow-2xl border border-pink-100 flex flex-col md:flex-row max-h-[92dvh]"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close button */}
          <button
            type="button"
            onClick={onClose}
            className="absolute top-3 right-3 z-20 p-2 rounded-full bg-white/85 hover:bg-white text-rose-800 shadow-md transition-all hover:scale-105 active:scale-95 cursor-pointer touch-manipulation"
            aria-label="Close gallery"
          >
            <X className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>

          {/* Left / Main: Photo Image Container */}
          <div className="relative md:w-3/5 bg-rose-50 flex items-center justify-center min-h-[220px] xs:min-h-[260px] md:min-h-[460px] overflow-hidden group">
            <img
              src={photo.imageUrl}
              alt={photo.title}
              className="w-full h-full object-cover max-h-[40vh] md:max-h-[75vh]"
              loading="lazy"
            />

            {/* Previous button */}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onPrev();
              }}
              className="absolute left-2 sm:left-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/80 hover:bg-white text-rose-800 shadow-lg transition-transform hover:scale-105 active:scale-95 cursor-pointer touch-manipulation"
              aria-label="Previous photo"
            >
              <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>

            {/* Next button */}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onNext();
              }}
              className="absolute right-2 sm:right-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/80 hover:bg-white text-rose-800 shadow-lg transition-transform hover:scale-105 active:scale-95 cursor-pointer touch-manipulation"
              aria-label="Next photo"
            >
              <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>

            {/* Tag badge */}
            <div className="absolute bottom-2 left-2 px-2.5 py-0.5 rounded-full bg-black/40 backdrop-blur-xs text-white text-[11px] font-medium flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-pink-300" />
              <span>{photo.tag}</span>
            </div>
          </div>

          {/* Right: Caption and Details */}
          <div className="md:w-2/5 p-4 sm:p-6 flex flex-col justify-between bg-gradient-to-b from-[#FFFDFD] to-[#FFF5F7] overflow-y-auto">
            <div>
              {/* Scrapbook stamp */}
              <div className="flex items-center justify-between mb-2 text-[10px] sm:text-xs text-rose-500 font-semibold tracking-wider uppercase">
                <span>{photo.date}</span>
                <span className="text-pink-400">Photo {photo.id} of 10</span>
              </div>

              {/* Title */}
              <h3 className="font-serif text-lg sm:text-2xl font-bold text-rose-950 mb-2">
                {photo.title}
              </h3>

              {/* Caption */}
              <p className="font-handwriting text-base sm:text-xl text-rose-800/90 leading-relaxed mb-4 sm:mb-6">
                "{photo.caption}"
              </p>
            </div>

            {/* Interaction Bar */}
            <div className="pt-3 border-t border-pink-100 flex items-center justify-between">
              <button
                type="button"
                onClick={() => onLike(photo.id)}
                className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-pink-50 hover:bg-pink-100 text-pink-600 font-semibold text-xs sm:text-sm transition-all active:scale-95 cursor-pointer border border-pink-200 touch-manipulation"
              >
                <Heart className="w-3.5 h-3.5 fill-pink-500 text-pink-500" />
                <span>{photo.likes || 18} Sweet Hugs</span>
              </button>

              <span className="text-[10px] sm:text-xs text-rose-400 font-sans">
                Avu's Scrapbook ✨
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
