import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Upload, RotateCcw, Check, Image as ImageIcon } from 'lucide-react';
import { DEFAULT_PHOTOS } from '../data/birthdayData';

export default function PhotoCustomizerModal({
  isOpen,
  onClose,
  photos,
  onSavePhotos,
}) {
  const [editingPhotos, setEditingPhotos] = useState([...photos]);
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState(0);
  const [savedAlert, setSavedAlert] = useState(false);

  if (!isOpen) return null;

  const current = editingPhotos[selectedPhotoIndex];

  const handleUpdateCurrent = (field, value) => {
    const updated = [...editingPhotos];
    updated[selectedPhotoIndex] = {
      ...updated[selectedPhotoIndex],
      [field]: value,
    };
    setEditingPhotos(updated);
  };

  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (uploadEvent) => {
      const dataUrl = uploadEvent.target?.result;
      if (typeof dataUrl === 'string') {
        handleUpdateCurrent('imageUrl', dataUrl);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleSave = () => {
    onSavePhotos(editingPhotos);
    setSavedAlert(true);
    setTimeout(() => {
      setSavedAlert(false);
      onClose();
    }, 900);
  };

  const handleReset = () => {
    if (window.confirm('Reset all 10 photos to the default aesthetic gallery?')) {
      setEditingPhotos([...DEFAULT_PHOTOS]);
      onSavePhotos([...DEFAULT_PHOTOS]);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 select-none">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-rose-950/70 backdrop-blur-sm"
      />

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="relative z-10 max-w-2xl w-full bg-white rounded-3xl shadow-2xl border border-pink-200 overflow-hidden max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="p-4 sm:p-5 border-b border-pink-100 flex items-center justify-between bg-gradient-to-r from-pink-50 to-rose-50">
          <div className="flex items-center gap-2">
            <ImageIcon className="w-5 h-5 text-pink-500" />
            <div>
              <h3 className="font-serif font-bold text-lg text-rose-950">
                Personalize Avu's Photo Scrapbook
              </h3>
              <p className="text-xs text-rose-600 font-sans">
                Replace photos with real memories or paste custom image links
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-white text-rose-600 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-5">
          {/* Photo Selector Pills (1 to 10) */}
          <div>
            <label className="text-xs font-semibold text-rose-800 uppercase tracking-wider block mb-2">
              Select Slot To Edit (10 Available):
            </label>
            <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-thin">
              {editingPhotos.map((p, idx) => (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => setSelectedPhotoIndex(idx)}
                  className={`flex-shrink-0 w-12 h-14 rounded-xl border-2 overflow-hidden relative cursor-pointer transition-all ${
                    selectedPhotoIndex === idx
                      ? 'border-pink-500 scale-105 shadow-md ring-2 ring-pink-300'
                      : 'border-pink-200 opacity-70 hover:opacity-100'
                  }`}
                >
                  <img
                    src={p.imageUrl}
                    alt=""
                    className="w-full h-full object-cover"
                  />
                  <span className="absolute bottom-0 inset-x-0 bg-black/60 text-white text-[9px] font-bold text-center">
                    #{idx + 1}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Current Photo Edit Form */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-pink-50/50 p-4 rounded-2xl border border-pink-100">
            {/* Preview */}
            <div className="flex flex-col items-center justify-center">
              <div className="w-40 h-48 rounded-xl overflow-hidden shadow-md border-2 border-white bg-white">
                <img
                  src={current.imageUrl}
                  alt={current.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <label className="mt-3 cursor-pointer inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-pink-500 hover:bg-pink-600 text-white text-xs font-medium shadow-sm transition-all">
                <Upload className="w-3.5 h-3.5" />
                <span>Upload From Device</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </label>
            </div>

            {/* Inputs */}
            <div className="space-y-3">
              <div>
                <label className="text-xs font-medium text-rose-800 block mb-1">
                  Image Web URL
                </label>
                <input
                  type="url"
                  placeholder="https://images.unsplash.com/..."
                  value={current.imageUrl}
                  onChange={(e) => handleUpdateCurrent('imageUrl', e.target.value)}
                  className="w-full text-xs px-3 py-2 rounded-lg border border-pink-200 bg-white focus:outline-none focus:ring-1 focus:ring-pink-400"
                />
              </div>

              <div>
                <label className="text-xs font-medium text-rose-800 block mb-1">
                  Title
                </label>
                <input
                  type="text"
                  value={current.title}
                  onChange={(e) => handleUpdateCurrent('title', e.target.value)}
                  className="w-full text-xs px-3 py-2 rounded-lg border border-pink-200 bg-white focus:outline-none focus:ring-1 focus:ring-pink-400 font-serif"
                />
              </div>

              <div>
                <label className="text-xs font-medium text-rose-800 block mb-1">
                  Cute Caption / Memory Note
                </label>
                <textarea
                  rows={2}
                  value={current.caption}
                  onChange={(e) => handleUpdateCurrent('caption', e.target.value)}
                  className="w-full text-xs px-3 py-2 rounded-lg border border-pink-200 bg-white focus:outline-none focus:ring-1 focus:ring-pink-400"
                />
              </div>

              <div>
                <label className="text-xs font-medium text-rose-800 block mb-1">
                  Tag / Sticker
                </label>
                <input
                  type="text"
                  value={current.tag}
                  onChange={(e) => handleUpdateCurrent('tag', e.target.value)}
                  className="w-full text-xs px-3 py-2 rounded-lg border border-pink-200 bg-white focus:outline-none focus:ring-1 focus:ring-pink-400"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 sm:p-5 border-t border-pink-100 flex items-center justify-between bg-white">
          <button
            type="button"
            onClick={handleReset}
            className="flex items-center gap-1.5 text-xs text-rose-600 hover:text-rose-800 font-medium cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Defaults</span>
          </button>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-medium text-rose-700 hover:bg-pink-50 rounded-full transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSave}
              className="flex items-center gap-1.5 px-5 py-2 text-xs sm:text-sm font-semibold text-white bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 rounded-full shadow-md shadow-pink-200 cursor-pointer"
            >
              {savedAlert ? (
                <>
                  <Check className="w-4 h-4" />
                  <span>Saved!</span>
                </>
              ) : (
                <span>Save Photos</span>
              )}
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
