import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Volume2, VolumeX, Music, Settings } from 'lucide-react';
import { musicBox } from '../utils/audioSynthesizer';

export default function AudioPlayer({ isPlaying, onTogglePlay }) {
  const [volume, setVolume] = useState(0.3);
  const [isMuted, setIsMuted] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [customAudioUrl, setCustomAudioUrl] = useState('');
  const [audioMode, setAudioMode] = useState('synthesizer'); // 'synthesizer' or 'custom'
  const [customAudioEl, setCustomAudioEl] = useState(null);

  useEffect(() => {
    if (audioMode === 'synthesizer') {
      if (isPlaying && !isMuted) {
        musicBox.setVolume(volume);
        musicBox.start();
      } else {
        musicBox.stop();
      }
    } else if (audioMode === 'custom' && customAudioEl) {
      if (isPlaying && !isMuted) {
        customAudioEl.volume = volume;
        customAudioEl.play().catch(() => {});
      } else {
        customAudioEl.pause();
      }
    }
  }, [isPlaying, isMuted, volume, audioMode, customAudioEl]);

  const handleMuteToggle = (e) => {
    e.stopPropagation();
    setIsMuted(!isMuted);
    if (!isMuted) {
      musicBox.setVolume(0);
      if (customAudioEl) customAudioEl.volume = 0;
    } else {
      musicBox.setVolume(volume);
      if (customAudioEl) customAudioEl.volume = volume;
    }
  };

  const handleCustomAudioSubmit = (e) => {
    e.preventDefault();
    if (!customAudioUrl) {
      setAudioMode('synthesizer');
      return;
    }
    musicBox.stop();
    const audio = new Audio(customAudioUrl);
    audio.loop = true;
    audio.volume = isMuted ? 0 : volume;
    setCustomAudioEl(audio);
    setAudioMode('custom');
    if (isPlaying && !isMuted) {
      audio.play().catch((err) => console.log('Audio autoplay blocked', err));
    }
    setShowSettings(false);
  };

  return (
    <>
      {/* Floating Glassmorphic Audio Controller */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.8 }}
        className="fixed top-3 right-3 sm:top-4 sm:right-4 z-40 flex items-center gap-1.5"
      >
        <div
          onClick={onTogglePlay}
          className="group flex items-center gap-2 p-1.5 sm:px-3 sm:py-2 rounded-full glass-panel cursor-pointer shadow-lg hover:shadow-pink-200/80 transition-all border border-pink-200/80 active:scale-95 touch-manipulation"
          title={isPlaying ? 'Pause Music' : 'Play Music'}
        >
          {/* Spinning Vinyl Record */}
          <div className="relative w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center">
            <motion.div
              animate={{ rotate: isPlaying ? 360 : 0 }}
              transition={{ duration: 3.5, repeat: Infinity, ease: 'linear' }}
              className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-gradient-to-tr from-pink-500 via-rose-400 to-amber-200 flex items-center justify-center shadow-inner"
            >
              <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-white flex items-center justify-center">
                <div className="w-1 h-1 rounded-full bg-pink-500" />
              </div>
            </motion.div>

            {/* Floating Music Notes when playing */}
            {isPlaying && (
              <motion.span
                initial={{ opacity: 0, y: 0, scale: 0.8 }}
                animate={{ opacity: [0, 1, 0], y: -16, x: [0, 5, -3] }}
                transition={{ duration: 1.8, repeat: Infinity, ease: 'easeOut' }}
                className="absolute text-[10px] text-pink-500 font-bold pointer-events-none"
              >
                ♪
              </motion.span>
            )}
          </div>

          {/* Track Info (hidden on tiny screens, visible on tablets/desktops) */}
          <div className="hidden md:flex flex-col text-left pr-1">
            <span className="text-[11px] font-semibold text-rose-800 tracking-wide flex items-center gap-1">
              <span>Avu's Serenade</span>
              <span className="text-[10px] text-pink-500">✨</span>
            </span>
            <div className="flex items-center gap-0.5 h-2 mt-0.5">
              {[1, 2, 3, 4, 5].map((bar) => (
                <motion.span
                  key={bar}
                  className="w-0.5 bg-pink-400 rounded-full"
                  animate={{
                    height: isPlaying ? [3, 9, 4, 11, 3][bar - 1] : 3,
                  }}
                  transition={{
                    duration: 0.6,
                    repeat: Infinity,
                    repeatType: 'reverse',
                    delay: bar * 0.1,
                  }}
                />
              ))}
            </div>
          </div>

          {/* Mute / Unmute Button */}
          <button
            type="button"
            onClick={handleMuteToggle}
            className="p-1 rounded-full hover:bg-pink-100/60 text-rose-600 transition-colors"
            aria-label="Toggle mute"
          >
            {isMuted ? <VolumeX className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-gray-400" /> : <Volume2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />}
          </button>
        </div>

        {/* Quick Settings Icon */}
        <button
          type="button"
          onClick={() => setShowSettings(!showSettings)}
          className="p-2 rounded-full glass-panel hover:bg-pink-50 border border-pink-200/60 text-rose-500 transition-all shadow-xs active:scale-95 touch-manipulation"
          title="Audio Settings"
          aria-label="Audio settings"
        >
          <Settings className="w-3.5 h-3.5" />
        </button>
      </motion.div>

      {/* Audio Settings Modal */}
      <AnimatePresence>
        {showSettings && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: -10 }}
            className="fixed top-14 right-3 sm:top-16 sm:right-4 z-50 w-72 max-w-[calc(100vw-24px)] p-4 rounded-2xl glass-panel-deep shadow-2xl border border-pink-200 text-sm"
          >
            <div className="flex justify-between items-center mb-3">
              <h4 className="font-serif font-bold text-rose-950 flex items-center gap-1.5 text-xs sm:text-sm">
                <Music className="w-4 h-4 text-pink-500" /> Music Settings
              </h4>
              <button
                type="button"
                onClick={() => setShowSettings(false)}
                className="text-xs text-rose-400 hover:text-rose-700 font-semibold p-1"
              >
                ✕
              </button>
            </div>

            <div className="mb-3">
              <label className="text-xs text-rose-800 block mb-1 font-medium">Volume Control</label>
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={isMuted ? 0 : volume}
                onChange={(e) => {
                  const val = parseFloat(e.target.value);
                  setVolume(val);
                  setIsMuted(false);
                }}
                className="w-full accent-pink-500 cursor-pointer"
              />
            </div>

            <form onSubmit={handleCustomAudioSubmit} className="space-y-2">
              <label className="text-xs text-rose-800 block font-medium">
                Custom Song URL <span className="text-[10px] text-gray-400">(Optional MP3)</span>
              </label>
              <input
                type="url"
                placeholder="https://.../her-favorite-song.mp3"
                value={customAudioUrl}
                onChange={(e) => setCustomAudioUrl(e.target.value)}
                className="w-full text-xs px-2.5 py-1.5 rounded-lg border border-pink-200 bg-white/90 focus:outline-none focus:ring-1 focus:ring-pink-400"
              />
              <div className="flex justify-between items-center pt-1">
                {audioMode === 'custom' && (
                  <button
                    type="button"
                    onClick={() => {
                      if (customAudioEl) customAudioEl.pause();
                      setAudioMode('synthesizer');
                      setCustomAudioUrl('');
                    }}
                    className="text-[11px] text-pink-600 underline"
                  >
                    Reset to Music Box
                  </button>
                )}
                <button
                  type="submit"
                  className="ml-auto text-xs px-3 py-1.5 rounded-full bg-pink-500 hover:bg-pink-600 text-white font-medium shadow-xs transition-all active:scale-95"
                >
                  Apply
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
