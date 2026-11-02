import confetti from 'canvas-confetti';

// Aesthetic pastel pink, rose gold, gold and soft cream palette
const LUXURY_PALETTE = ['#f472b6', '#fbcfe8', '#e5989b', '#b76e79', '#fce7f3', '#d4af37', '#ffffff'];

export function triggerBirthdayBlast() {
  // Center festive explosion
  confetti({
    particleCount: 120,
    spread: 100,
    origin: { y: 0.6 },
    colors: LUXURY_PALETTE,
    ticks: 350,
    gravity: 0.8,
    scalar: 1.1,
  });

  // Dual side cannons
  setTimeout(() => {
    confetti({
      particleCount: 60,
      angle: 60,
      spread: 55,
      origin: { x: 0, y: 0.7 },
      colors: LUXURY_PALETTE,
    });
    confetti({
      particleCount: 60,
      angle: 120,
      spread: 55,
      origin: { x: 1, y: 0.7 },
      colors: LUXURY_PALETTE,
    });
  }, 250);
}

export function triggerHeartShower() {
  const heartShape = confetti.shapeFromPath({
    path: 'M167 72c19,-38 37,-56 75,-56 42,0 76,33 76,75 0,76 -76,151 -151,227 -76,-76 -151,-151 -151,-227 0,-42 33,-75 76,-75 38,0 57,18 75,56z',
  });

  confetti({
    shapes: [heartShape],
    scalar: 2,
    particleCount: 40,
    spread: 90,
    origin: { y: 0.4 },
    colors: ['#f43f5e', '#ec4899', '#f472b6', '#fb7185', '#b76e79'],
    ticks: 300,
    gravity: 0.6,
  });
}

export function triggerStarFairyDust() {
  const starShape = confetti.shapeFromPath({
    path: 'M12 .587l3.668 7.431 8.2 1.192-5.934 5.784 1.399 8.164-7.333-3.856-7.333 3.856 1.399-8.164-5.934-5.784 8.2-1.192zm0 5.702l-1.921 3.892-4.296.624 3.108 3.03-.733 4.277 3.842-2.02 3.842 2.02-.733-4.277 3.108-3.03-4.296-.624z',
  });

  confetti({
    shapes: [starShape],
    scalar: 1.5,
    particleCount: 50,
    spread: 120,
    origin: { y: 0.5 },
    colors: ['#fbbf24', '#f59e0b', '#fef08a', '#e5989b', '#ffffff'],
    ticks: 280,
  });
}
