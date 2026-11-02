// Web Audio API Synthesizer & Sound Effects Engine
// 100% offline-ready, zero external audio dependency, romantic ambient music box

let audioCtx = null;

function getAudioContext() {
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

// 1. Play Fairy Sparkle Chime (Used for Envelope Open, Star Clicks)
export function playSparkleChime() {
  const ctx = getAudioContext();
  if (!ctx) return;

  const notes = [523.25, 659.25, 783.99, 1046.50, 1318.51, 1567.98]; // C5, E5, G5, C6, E6, G6
  const now = ctx.currentTime;

  notes.forEach((freq, idx) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, now + idx * 0.08);

    gain.gain.setValueAtTime(0, now + idx * 0.08);
    gain.gain.linearRampToValueAtTime(0.18, now + idx * 0.08 + 0.03);
    gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.08 + 0.8);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now + idx * 0.08);
    osc.stop(now + idx * 0.08 + 0.9);
  });
}

// 2. Play Candle Blow & Sparkle Effect
export function playCandleBlowSound() {
  const ctx = getAudioContext();
  if (!ctx) return;

  const now = ctx.currentTime;

  // Gentle breath whoosh (white noise buffer)
  try {
    const bufferSize = ctx.sampleRate * 0.6;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }

    const noise = ctx.createBufferSource();
    noise.buffer = buffer;

    const filter = ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(800, now);
    filter.frequency.exponentialRampToValueAtTime(200, now + 0.6);

    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.15, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.6);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);

    noise.start(now);
    noise.stop(now + 0.6);
  } catch (e) {
    console.warn('Noise buffer error', e);
  }

  // Celebratory harp glissando
  const arpeggio = [440, 554.37, 659.25, 880, 1108.73, 1318.51, 1760];
  arpeggio.forEach((f, i) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(f, now + 0.3 + i * 0.06);

    gain.gain.setValueAtTime(0, now + 0.3 + i * 0.06);
    gain.gain.linearRampToValueAtTime(0.2, now + 0.3 + i * 0.06 + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.3 + i * 0.06 + 0.9);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now + 0.3 + i * 0.06);
    osc.stop(now + 0.3 + i * 0.06 + 1.0);
  });
}

// 3. Play Confetti Pop
export function playPopSound() {
  const ctx = getAudioContext();
  if (!ctx) return;

  const now = ctx.currentTime;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.type = 'sine';
  osc.frequency.setValueAtTime(400, now);
  osc.frequency.exponentialRampToValueAtTime(120, now + 0.15);

  gain.gain.setValueAtTime(0.3, now);
  gain.gain.exponentialRampToValueAtTime(0.01, now + 0.2);

  osc.connect(gain);
  gain.connect(ctx.destination);

  osc.start(now);
  osc.stop(now + 0.25);
}

// 4. Play Card Flip Tap
export function playCardFlipSound() {
  const ctx = getAudioContext();
  if (!ctx) return;

  const now = ctx.currentTime;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.type = 'triangle';
  osc.frequency.setValueAtTime(800, now);
  osc.frequency.exponentialRampToValueAtTime(500, now + 0.08);

  gain.gain.setValueAtTime(0.12, now);
  gain.gain.exponentialRampToValueAtTime(0.001, now + 0.09);

  osc.connect(gain);
  gain.connect(ctx.destination);

  osc.start(now);
  osc.stop(now + 0.1);
}

// 5. Ambient Romantic Music Box Synthesizer (Loops a sweet, magical lullaby birthday melody)
class MusicBoxEngine {
  constructor() {
    this.isPlaying = false;
    this.timerId = null;
    this.step = 0;
    this.volume = 0.28;
    this.masterGain = null;
  }

  start() {
    if (this.isPlaying) return;
    const ctx = getAudioContext();
    if (!ctx) return;

    this.isPlaying = true;

    if (!this.masterGain) {
      this.masterGain = ctx.createGain();
      this.masterGain.gain.setValueAtTime(this.volume, ctx.currentTime);
      this.masterGain.connect(ctx.destination);
    } else {
      this.masterGain.gain.setValueAtTime(this.volume, ctx.currentTime);
    }

    // Romantic music box melody based on sweet chord arpeggios & delicate birthday motives:
    // Eb Major / Ab / Bb / Cm sweet romantic sequence
    const melodyNotes = [
      // Phrase 1: Sweet gentle birthday arrival
      { freq: 392.00, dur: 0.5 }, // G4
      { freq: 392.00, dur: 0.5 }, // G4
      { freq: 440.00, dur: 1.0 }, // A4
      { freq: 392.00, dur: 1.0 }, // G4
      { freq: 523.25, dur: 1.0 }, // C5
      { freq: 493.88, dur: 2.0 }, // B4
      
      // Phrase 2: Sparkle continuation
      { freq: 392.00, dur: 0.5 }, // G4
      { freq: 392.00, dur: 0.5 }, // G4
      { freq: 440.00, dur: 1.0 }, // A4
      { freq: 392.00, dur: 1.0 }, // G4
      { freq: 587.33, dur: 1.0 }, // D5
      { freq: 523.25, dur: 2.0 }, // C5

      // Phrase 3: Climax for 18
      { freq: 392.00, dur: 0.5 }, // G4
      { freq: 392.00, dur: 0.5 }, // G4
      { freq: 783.99, dur: 1.0 }, // G5 (octave leap)
      { freq: 659.25, dur: 1.0 }, // E5
      { freq: 523.25, dur: 1.0 }, // C5
      { freq: 493.88, dur: 1.0 }, // B4
      { freq: 440.00, dur: 2.0 }, // A4

      // Phrase 4: Warm resolution
      { freq: 698.46, dur: 0.5 }, // F5
      { freq: 698.46, dur: 0.5 }, // F5
      { freq: 659.25, dur: 1.0 }, // E5
      { freq: 523.25, dur: 1.0 }, // C5
      { freq: 587.33, dur: 1.0 }, // D5
      { freq: 523.25, dur: 3.0 }, // C5

      // Bridge: Romantic dream chords
      { freq: 329.63, dur: 1.0 }, // E4
      { freq: 392.00, dur: 1.0 }, // G4
      { freq: 523.25, dur: 1.5 }, // C5
      { freq: 659.25, dur: 1.5 }, // E5
      { freq: 587.33, dur: 1.0 }, // D5
      { freq: 440.00, dur: 1.0 }, // A4
      { freq: 493.88, dur: 2.0 }, // B4
    ];

    const playNextNote = () => {
      if (!this.isPlaying) return;
      const ctx = getAudioContext();
      if (!ctx) return;

      const note = melodyNotes[this.step % melodyNotes.length];
      const now = ctx.currentTime;

      // Primary Music Box Chime (layered sine + subtle bell overtone)
      const osc1 = ctx.createOscillator();
      const osc2 = ctx.createOscillator();
      const noteGain = ctx.createGain();

      osc1.type = 'sine';
      osc1.frequency.setValueAtTime(note.freq, now);

      // Bell overtone (2.76x frequency for music box tine resonance)
      osc2.type = 'sine';
      osc2.frequency.setValueAtTime(note.freq * 2.76, now);

      noteGain.gain.setValueAtTime(0, now);
      noteGain.gain.linearRampToValueAtTime(0.24, now + 0.02);
      noteGain.gain.exponentialRampToValueAtTime(0.001, now + (note.dur * 0.95));

      osc1.connect(noteGain);
      osc2.connect(noteGain);
      noteGain.connect(this.masterGain);

      osc1.start(now);
      osc2.start(now);
      osc1.stop(now + note.dur + 0.5);
      osc2.stop(now + note.dur + 0.5);

      // Occasional soft bass chord pad
      if (this.step % 4 === 0) {
        const bassOsc = ctx.createOscillator();
        const bassGain = ctx.createGain();
        bassOsc.type = 'triangle';
        bassOsc.frequency.setValueAtTime(note.freq / 2, now);
        bassGain.gain.setValueAtTime(0.08, now);
        bassGain.gain.exponentialRampToValueAtTime(0.001, now + note.dur * 1.8);
        bassOsc.connect(bassGain);
        bassGain.connect(this.masterGain);
        bassOsc.start(now);
        bassOsc.stop(now + note.dur * 1.8 + 0.2);
      }

      this.step++;
      const nextDelay = note.dur * 650; // gentle tempo
      this.timerId = setTimeout(playNextNote, nextDelay);
    };

    playNextNote();
  }

  stop() {
    this.isPlaying = false;
    if (this.timerId) {
      clearTimeout(this.timerId);
      this.timerId = null;
    }
  }

  setVolume(val) {
    this.volume = val;
    if (this.masterGain && audioCtx) {
      this.masterGain.gain.setValueAtTime(val, audioCtx.currentTime);
    }
  }
}

export const musicBox = new MusicBoxEngine();
