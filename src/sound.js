// Web Audio synthesizer for playful child-friendly game sounds & Ambient Background Accompaniment
class SoundEffects {
  constructor() {
    this.ctx = null;
    this.muted = false;
    this.bgmPlaying = false;
    this.bgmTimer = null;
    this.bgmVolume = 0.045; // Gentle pleasant background volume
    this.currentPatternIndex = 0;
  }

  init() {
    try {
      if (!this.ctx && typeof window !== 'undefined') {
        const AudioCtx = window.AudioContext || window.webkitAudioContext;
        if (AudioCtx) {
          this.ctx = new AudioCtx();
        }
      }
      if (this.ctx && this.ctx.state === 'suspended') {
        this.ctx.resume().catch(() => {});
      }
    } catch {
      // AudioContext blocked or not supported
    }
  }

  toggleMute() {
    this.muted = !this.muted;
    if (this.muted && this.bgmPlaying) {
      this.pauseBGM();
    } else if (!this.muted && this.bgmPlaying) {
      this.resumeBGM();
    }
    return this.muted;
  }

  toggleBGM() {
    if (this.bgmPlaying) {
      this.stopBGM();
    } else {
      this.startBGM();
    }
    return this.bgmPlaying;
  }

  startBGM() {
    this.init();
    if (!this.ctx || this.muted) return;
    if (this.bgmPlaying) return;
    this.bgmPlaying = true;
    this.playNextBGMSection();
  }

  stopBGM() {
    this.bgmPlaying = false;
    if (this.bgmTimer) {
      clearTimeout(this.bgmTimer);
      this.bgmTimer = null;
    }
  }

  pauseBGM() {
    if (this.bgmTimer) {
      clearTimeout(this.bgmTimer);
      this.bgmTimer = null;
    }
  }

  resumeBGM() {
    if (this.bgmPlaying && !this.muted) {
      this.playNextBGMSection();
    }
  }

  setBgmVolume(val) {
    this.bgmVolume = Math.max(0.01, Math.min(0.1, val));
  }

  playNextBGMSection() {
    if (!this.bgmPlaying || this.muted) return;
    this.init();
    if (!this.ctx) return;

    try {
      // Warm, joyful, uplifting chord sequences with gentle pentatonic melody notes
      // Key of C / F Major - gentle lofi acoustic vibe
      const patterns = [
        {
          bass: 174.61, // F3
          chord: [349.23, 440.0, 523.25, 659.25], // Fmaj7
          melody: [523.25, 659.25, 783.99, 659.25],
        },
        {
          bass: 130.81, // C3
          chord: [261.63, 329.63, 392.0, 493.88], // Cmaj7
          melody: [392.0, 523.25, 587.33, 493.88],
        },
        {
          bass: 146.83, // D3
          chord: [293.66, 349.23, 440.0, 523.25], // Dm7
          melody: [440.0, 523.25, 587.33, 659.25],
        },
        {
          bass: 110.0,  // A2
          chord: [220.0, 261.63, 329.63, 392.0],  // Am7
          melody: [392.0, 329.63, 293.66, 261.63],
        },
        {
          bass: 174.61, // F3
          chord: [349.23, 440.0, 523.25, 698.46], // Fadd9
          melody: [698.46, 659.25, 523.25, 440.0],
        },
        {
          bass: 196.0,  // G3
          chord: [293.66, 392.0, 493.88, 587.33], // G7sus4
          melody: [587.33, 659.25, 523.25, 392.0],
        },
      ];

      const current = patterns[this.currentPatternIndex];
      this.currentPatternIndex = (this.currentPatternIndex + 1) % patterns.length;
      const now = this.ctx.currentTime;

      // 1. Warm bass pulse
      const bassOsc = this.ctx.createOscillator();
      const bassGain = this.ctx.createGain();
      const bassFilter = this.ctx.createBiquadFilter();
      bassOsc.type = 'triangle';
      bassOsc.frequency.setValueAtTime(current.bass, now);
      bassFilter.type = 'lowpass';
      bassFilter.frequency.setValueAtTime(260, now);
      bassGain.gain.setValueAtTime(0.0001, now);
      bassGain.gain.linearRampToValueAtTime(this.bgmVolume * 0.9, now + 0.1);
      bassGain.gain.exponentialRampToValueAtTime(0.0001, now + 2.0);
      bassOsc.connect(bassFilter);
      bassFilter.connect(bassGain);
      bassGain.connect(this.ctx.destination);
      bassOsc.start(now);
      bassOsc.stop(now + 2.2);

      // 2. Soft acoustic chord swell
      current.chord.forEach((freq, idx) => {
        const noteTime = now + idx * 0.12;
        const osc = this.ctx.createOscillator();
        const filter = this.ctx.createBiquadFilter();
        const gain = this.ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, noteTime);

        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(750, noteTime);

        gain.gain.setValueAtTime(0.0001, noteTime);
        gain.gain.linearRampToValueAtTime(this.bgmVolume * 0.65, noteTime + 0.2);
        gain.gain.exponentialRampToValueAtTime(0.0001, noteTime + 2.4);

        osc.connect(filter);
        filter.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(noteTime);
        osc.stop(noteTime + 2.5);
      });

      // 3. Playful music box / kalimba melody sparkles
      current.melody.forEach((freq, idx) => {
        const noteTime = now + 0.5 + idx * 0.42;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, noteTime);

        gain.gain.setValueAtTime(0.0001, noteTime);
        gain.gain.linearRampToValueAtTime(this.bgmVolume * 0.5, noteTime + 0.04);
        gain.gain.exponentialRampToValueAtTime(0.0001, noteTime + 0.7);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(noteTime);
        osc.stop(noteTime + 0.8);
      });

      // Schedule next section in 2.3 seconds
      this.bgmTimer = setTimeout(() => {
        this.playNextBGMSection();
      }, 2300);
    } catch {
      // ignore audio errors
    }
  }

  playCard() {
    if (this.muted) return;
    this.init();
    if (!this.ctx) return;
    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(320, now);
      osc.frequency.exponentialRampToValueAtTime(560, now + 0.12);
      gain.gain.setValueAtTime(0.25, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.14);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + 0.15);
    } catch {
      // Audio fallback
    }
  }

  playDraw() {
    if (this.muted) return;
    this.init();
    if (!this.ctx) return;
    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(420, now);
      osc.frequency.linearRampToValueAtTime(260, now + 0.15);
      gain.gain.setValueAtTime(0.2, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.16);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + 0.17);
    } catch {
      // ignore
    }
  }

  playReverse() {
    if (this.muted) return;
    this.init();
    if (!this.ctx) return;
    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(280, now);
      osc.frequency.exponentialRampToValueAtTime(680, now + 0.16);
      osc.frequency.exponentialRampToValueAtTime(420, now + 0.3);
      gain.gain.setValueAtTime(0.24, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.32);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + 0.33);
    } catch {
      // ignore
    }
  }

  playPlusTwo() {
    if (this.muted) return;
    this.init();
    if (!this.ctx) return;
    try {
      const notes = [440, 587, 740];
      notes.forEach((freq, idx) => {
        const now = this.ctx.currentTime + idx * 0.09;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, now);
        gain.gain.setValueAtTime(0.22, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.18);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(now);
        osc.stop(now + 0.2);
      });
    } catch {
      // ignore
    }
  }

  playChime() {
    if (this.muted) return;
    this.init();
    if (!this.ctx) return;
    try {
      const notes = [523.25, 659.25, 783.99, 1046.5]; // C E G C
      notes.forEach((freq, idx) => {
        const now = this.ctx.currentTime + idx * 0.08;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now);
        gain.gain.setValueAtTime(0.2, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.28);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(now);
        osc.stop(now + 0.3);
      });
    } catch {
      // ignore
    }
  }

  playComfort() {
    if (this.muted) return;
    this.init();
    if (!this.ctx) return;
    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(349.23, now); // F
      osc.frequency.linearRampToValueAtTime(392.0, now + 0.2); // G
      gain.gain.setValueAtTime(0.18, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.4);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + 0.42);
    } catch {
      // ignore
    }
  }

  playVictory() {
    if (this.muted) return;
    this.init();
    if (!this.ctx) return;
    try {
      const notes = [523.25, 659.25, 783.99, 1046.5, 880, 1046.5, 1318.5];
      notes.forEach((freq, idx) => {
        const now = this.ctx.currentTime + idx * 0.12;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, now);
        gain.gain.setValueAtTime(0.28, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(now);
        osc.stop(now + 0.38);
      });
    } catch {
      // ignore
    }
  }
}

export const sounds = new SoundEffects();
