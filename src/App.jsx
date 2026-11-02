import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Heart, Sparkles, Cake, Mail, Camera, BookHeart } from 'lucide-react';
import FloatingDecorations from './components/FloatingDecorations';
import AudioPlayer from './components/AudioPlayer';
import OpeningSurprise from './components/OpeningSurprise';
import DirectLoveModal from './components/DirectLoveModal';
import HeroSection from './components/HeroSection';
import ScrapbookGallery from './components/ScrapbookGallery';
import ReasonsSection from './components/ReasonsSection';
import LetterSection from './components/LetterSection';
import InteractiveLoveButton from './components/InteractiveLoveButton';
import CakeSection from './components/CakeSection';
import FinalSurprise from './components/FinalSurprise';
import { DEFAULT_PHOTOS } from './data/birthdayData';

export default function App() {
  const [hasOpenedSurprise, setHasOpenedSurprise] = useState(false);
  const [showLoveModal, setShowLoveModal] = useState(false);
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);

  // Personalized sender name (defaults to 'Karan')
  const [senderName, setSenderName] = useState(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      const urlFrom = params.get('from');
      if (urlFrom) return urlFrom;
      const saved = localStorage.getItem('avu_sender_name');
      if (saved && saved !== '[YOUR NAME]') return saved;
    } catch (e) {
      console.warn('Could not read sender name', e);
    }
    return 'Karan';
  });

  const handleUpdateSenderName = (newName) => {
    setSenderName(newName);
    try {
      localStorage.setItem('avu_sender_name', newName);
    } catch (e) {
      console.warn('Could not save sender name', e);
    }
  };

  // Photos loaded from localStorage or default (version 4 with Karan & Avu photo)
  const [photos, setPhotos] = useState(() => {
    try {
      const saved = localStorage.getItem('avu_birthday_photos_v4');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.warn('Could not read saved photos', e);
    }
    return DEFAULT_PHOTOS;
  });

  const handleUpdatePhotos = (newPhotos) => {
    setPhotos(newPhotos);
    try {
      localStorage.setItem('avu_birthday_photos_v4', JSON.stringify(newPhotos));
    } catch (e) {
      console.warn('Could not save photos', e);
    }
  };

  // Step 1: When user taps "Open Your Birthday Surprise"
  const handleOpenSurprise = () => {
    setHasOpenedSurprise(true);
    setShowLoveModal(true);
    setIsMusicPlaying(true);
  };

  // Step 2: When user continues from Direct Love Message
  const handleContinueFromLoveModal = () => {
    setShowLoveModal(false);
  };

  const handleTogglePlayMusic = () => {
    setIsMusicPlaying(!isMusicPlaying);
  };

  const handleScrollToSection = (sectionId) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleReplay = () => {
    setHasOpenedSurprise(false);
    setShowLoveModal(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="relative min-h-[100dvh] w-full bg-[#FFF8F8] text-[#4A3E3D] selection:bg-pink-200 selection:text-pink-900 overflow-x-hidden font-sans">
      {/* Ambient Floating Butterflies, Petals, Hearts, and Stars */}
      <FloatingDecorations />

      {/* Floating Audio Controller */}
      <AudioPlayer
        isPlaying={isMusicPlaying}
        onTogglePlay={handleTogglePlayMusic}
      />

      {/* 1. Opening Screen: The Secret Surprise Envelope */}
      <AnimatePresence>
        {!hasOpenedSurprise && (
          <OpeningSurprise onOpenSurprise={handleOpenSurprise} />
        )}
      </AnimatePresence>

      {/* 2. Direct Love Message Modal (Appears upon opening surprise or when requested) */}
      <DirectLoveModal
        isOpen={showLoveModal}
        onContinue={handleContinueFromLoveModal}
        senderName={senderName === '[YOUR NAME]' ? '' : senderName}
      />

      {/* Main Birthday Content World */}
      {hasOpenedSurprise && (
        <motion.main
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 flex flex-col w-full overflow-x-hidden"
        >
          {/* Top Quick Navigation Pills (Mobile sticky top bar) */}
          <header className="sticky top-3 sm:top-4 z-30 flex justify-center px-3 sm:px-4 pointer-events-none">
            <nav className="pointer-events-auto flex items-center gap-1 sm:gap-2 px-2.5 sm:px-3.5 py-1.5 rounded-full glass-panel shadow-md border border-pink-200/80 text-[11px] sm:text-xs text-rose-800">
              <button
                type="button"
                onClick={() => handleScrollToSection('scrapbook')}
                className="flex items-center gap-1 px-2 py-1 rounded-full hover:bg-pink-100/70 active:scale-95 transition-all cursor-pointer touch-manipulation"
              >
                <Camera className="w-3.5 h-3.5 text-pink-500" />
                <span className="hidden xs:inline">Scrapbook</span>
              </button>

              <button
                type="button"
                onClick={() => handleScrollToSection('reasons')}
                className="flex items-center gap-1 px-2 py-1 rounded-full hover:bg-pink-100/70 active:scale-95 transition-all cursor-pointer touch-manipulation"
              >
                <BookHeart className="w-3.5 h-3.5 text-pink-500" />
                <span className="hidden xs:inline">18 Reasons</span>
              </button>

              <button
                type="button"
                onClick={() => handleScrollToSection('letter')}
                className="flex items-center gap-1 px-2 py-1 rounded-full hover:bg-pink-100/70 active:scale-95 transition-all cursor-pointer touch-manipulation"
              >
                <Mail className="w-3.5 h-3.5 text-pink-500" />
                <span className="hidden xs:inline">Letter</span>
              </button>

              <button
                type="button"
                onClick={() => handleScrollToSection('cake')}
                className="flex items-center gap-1 px-2 py-1 rounded-full hover:bg-pink-100/70 active:scale-95 transition-all cursor-pointer touch-manipulation"
              >
                <Cake className="w-3.5 h-3.5 text-pink-500" />
                <span className="hidden xs:inline">Cake</span>
              </button>
            </nav>
          </header>

          {/* Welcome to 18 (Giant Animated 18, Confetti, Floating Balloons) */}
          <HeroSection
            onScrollToSection={handleScrollToSection}
            onOpenLoveModal={() => setShowLoveModal(true)}
          />

          {/* Photo Memories (Aesthetic Scrapbook Gallery with Avu's real photos) */}
          <ScrapbookGallery
            photos={photos}
            onUpdatePhotos={handleUpdatePhotos}
          />

          {/* 18 Little Reasons (18 interactive cards with sweet compliments) */}
          <ReasonsSection />

          {/* A Letter for AVU (Animated pink envelope & emotional typewriter letter) */}
          <LetterSection senderName={senderName === '[YOUR NAME]' ? '' : senderName} />

          {/* Interactive Love Button & Personalized Sender Section */}
          <InteractiveLoveButton
            senderName={senderName}
            onUpdateSenderName={handleUpdateSenderName}
          />

          {/* Birthday Cake (3D-style cake with 18 candles & Make a Wish button) */}
          <CakeSection />

          {/* Final Surprise (Cinematic ending, WhatsApp hug, and replay) */}
          <FinalSurprise
            onReplay={handleReplay}
            senderName={senderName}
            onOpenLoveModal={() => setShowLoveModal(true)}
          />
        </motion.main>
      )}
    </div>
  );
}
