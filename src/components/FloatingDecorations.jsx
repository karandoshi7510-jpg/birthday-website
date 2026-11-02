import React, { useMemo } from 'react';
import { motion } from 'framer-motion';

export default function FloatingDecorations() {
  // Generate stable floating particles with pastel colors
  const particles = useMemo(() => {
    const types = ['heart', 'star', 'sparkle', 'petal', 'butterfly'];
    const items = [];
    for (let i = 0; i < 24; i++) {
      items.push({
        id: i,
        type: types[i % types.length],
        left: `${(i * 4.3 + Math.random() * 3) % 96}%`,
        top: `${(i * 5.2 + Math.random() * 4) % 94}%`,
        size: Math.floor(Math.random() * 12) + 14,
        duration: Math.random() * 8 + 8,
        delay: Math.random() * 4,
        opacity: Math.random() * 0.45 + 0.25,
      });
    }
    return items;
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none">
      {/* Soft warm ambient radial glows */}
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-pink-200/35 rounded-full blur-3xl" />
      <div className="absolute top-1/3 -right-32 w-[30rem] h-[30rem] bg-rose-200/25 rounded-full blur-3xl" />
      <div className="absolute bottom-10 left-1/4 w-80 h-80 bg-amber-100/30 rounded-full blur-3xl" />

      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute"
          style={{
            left: p.left,
            top: p.top,
            fontSize: `${p.size}px`,
            opacity: p.opacity,
          }}
          animate={{
            y: [-15, 15, -15],
            x: [-8, 8, -8],
            rotate: [-12, 12, -12],
            scale: [0.95, 1.08, 0.95],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          {p.type === 'heart' && <span className="text-pink-300 drop-shadow-sm">💖</span>}
          {p.type === 'star' && <span className="text-amber-200 drop-shadow-sm">✨</span>}
          {p.type === 'sparkle' && <span className="text-rose-300 drop-shadow-sm">⭐</span>}
          {p.type === 'petal' && <span className="text-pink-300/80 drop-shadow-sm">🌸</span>}
          {p.type === 'butterfly' && <span className="text-rose-400/90 drop-shadow-sm">🦋</span>}
        </motion.div>
      ))}
    </div>
  );
}
