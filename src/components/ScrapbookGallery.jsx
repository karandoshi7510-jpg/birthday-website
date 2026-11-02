import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, Sparkles, Camera, SlidersHorizontal, Maximize2 } from 'lucide-react';
import LightboxModal from './LightboxModal';
import PhotoCustomizerModal from './PhotoCustomizerModal';

export default function ScrapbookGallery({ photos, onUpdatePhotos }) {
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState(null);
  const [isCustomizerOpen, setIsCustomizerOpen] = useState(false);

  const handleOpenPhoto = (index) => {
    setSelectedPhotoIndex(index);
  };

  const handleCloseLightbox = () => {
    setSelectedPhotoIndex(null);
  };

  const handlePrevPhoto = () => {
    setSelectedPhotoIndex((prev) =>
      prev === 0 ? photos.length - 1 : prev - 1
    );
  };

  const handleNextPhoto = () => {
    setSelectedPhotoIndex((prev) =>
      prev === photos.length - 1 ? 0 : prev + 1
    );
  };

  const handleLikePhoto = (photoId) => {
    const updated = photos.map((p) =>
      p.id === photoId ? { ...p, likes: (p.likes || 18) + 1 } : p
    );
    onUpdatePhotos(updated);
  };

  return (
    <section id="scrapbook" className="py-20 px-4 sm:px-6 max-w-7xl mx-auto relative z-10">
      {/* Scrapbook Section Header */}
      <div className="text-center max-w-2xl mx-auto mb-14">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-pink-100/70 text-rose-700 text-xs font-semibold mb-3 tracking-wider uppercase border border-pink-200"
        >
          <Camera className="w-3.5 h-3.5" />
          <span>Chapter 18 Scrapbook</span>
          <Sparkles className="w-3.5 h-3.5" />
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="font-serif text-3xl sm:text-5xl font-bold text-rose-950 mb-4"
        >
          Photo Memories & Aesthetic Moments
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="font-sans text-sm sm:text-base text-rose-700/80 mb-6"
        >
          Ten frozen snapshots capturing your infectious smile, golden adventures, and the radiance you bring into the world.
        </motion.p>

        {/* Customize Photos button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsCustomizerOpen(true)}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-panel hover:bg-white text-rose-800 text-xs sm:text-sm font-medium shadow-sm border border-pink-200 cursor-pointer"
        >
          <SlidersHorizontal className="w-4 h-4 text-pink-500" />
          <span>Personalize / Swap Photos (10 Slots)</span>
        </motion.button>
      </div>

      {/* 10 Polaroid Photo Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-8 justify-items-center">
        {photos.map((photo, idx) => (
          <motion.div
            key={photo.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6, delay: (idx % 4) * 0.1 }}
            style={{
              transform: `rotate(${photo.rotation || 0}deg)`,
            }}
            className="relative group w-full max-w-[280px]"
          >
            {/* Washi Tape Accent */}
            <div
              className="washi-tape"
              style={{
                background:
                  idx % 3 === 0
                    ? 'rgba(252, 231, 243, 0.9)'
                    : idx % 3 === 1
                    ? 'rgba(254, 243, 199, 0.9)'
                    : 'rgba(255, 228, 230, 0.9)',
              }}
            />

            {/* Polaroid Container */}
            <div
              onClick={() => handleOpenPhoto(idx)}
              className="polaroid-frame cursor-pointer relative bg-white border border-pink-100 flex flex-col justify-between"
            >
              {/* Photo Image */}
              <div className="relative aspect-[4/5] w-full overflow-hidden rounded bg-rose-50 mb-3">
                <img
                  src={photo.imageUrl}
                  alt={photo.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />

                {/* Subtle Hover Overlay with Expand Icon */}
                <div className="absolute inset-0 bg-rose-900/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <div className="p-2 rounded-full bg-white/90 text-rose-800 shadow-md transform scale-90 group-hover:scale-100 transition-transform">
                    <Maximize2 className="w-5 h-5" />
                  </div>
                </div>

                {/* Tag pill */}
                <div className="absolute bottom-2 left-2 px-2.5 py-0.5 rounded-full bg-white/80 backdrop-blur-xs text-[10px] font-semibold text-rose-800 shadow-xs">
                  {photo.tag}
                </div>
              </div>

              {/* Polaroid Caption Area */}
              <div className="text-left px-1">
                <div className="flex items-center justify-between text-[11px] text-rose-400 font-sans mb-1">
                  <span>{photo.date}</span>
                  <span className="font-semibold text-pink-400">#{photo.id}</span>
                </div>
                <h3 className="font-serif font-bold text-rose-950 text-base leading-tight mb-1 truncate">
                  {photo.title}
                </h3>
                <p className="font-handwriting text-rose-700 text-lg leading-tight line-clamp-2">
                  "{photo.caption}"
                </p>

                {/* Polaroid Bottom Action: Sweet Hugs */}
                <div className="mt-3 pt-2 border-t border-pink-50 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleLikePhoto(photo.id);
                    }}
                    className="flex items-center gap-1.5 text-xs text-pink-600 hover:text-pink-700 font-medium group/like cursor-pointer"
                  >
                    <Heart className="w-3.5 h-3.5 fill-pink-400 text-pink-400 group-hover/like:scale-125 transition-transform" />
                    <span>{photo.likes || 18}</span>
                  </button>

                  <span className="text-[10px] text-rose-400 italic">
                    Tap to expand
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Lightbox Modal */}
      <LightboxModal
        isOpen={selectedPhotoIndex !== null}
        photo={selectedPhotoIndex !== null ? photos[selectedPhotoIndex] : null}
        onClose={handleCloseLightbox}
        onPrev={handlePrevPhoto}
        onNext={handleNextPhoto}
        onLike={handleLikePhoto}
      />

      {/* Photo Customizer Modal */}
      <PhotoCustomizerModal
        isOpen={isCustomizerOpen}
        onClose={() => setIsCustomizerOpen(false)}
        photos={photos}
        onSavePhotos={onUpdatePhotos}
      />
    </section>
  );
}
