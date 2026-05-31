// Modular Web Audio API Cyber Sound Synthesizer
// Provides interactive system feedback without downloading large mp3 assets.

let audioCtx: AudioContext | null = null;
let masterVolume: GainNode | null = null;
let isSoundEnabled = false;

// Initialize sound engine on user interaction
export function initSoundEngine(): boolean {
  if (typeof window === "undefined") return false;
  try {
    if (!audioCtx) {
      // Create audio context
      const AudioCtxClass = window.AudioContext || (window as any).webkitAudioContext;
      audioCtx = new AudioCtxClass();
      
      masterVolume = audioCtx.createGain();
      masterVolume.gain.setValueAtTime(0.08, audioCtx.currentTime); // keep audio subtle
      masterVolume.connect(audioCtx.destination);
    }
    
    // Resume context if suspended
    if (audioCtx.state === "suspended") {
      audioCtx.resume();
    }
    
    isSoundEnabled = true;
    return true;
  } catch (err) {
    console.error("Web Audio API not supported", err);
    return false;
  }
}

export function toggleSoundEnabled(): boolean {
  isSoundEnabled = !isSoundEnabled;
  if (isSoundEnabled) {
    initSoundEngine();
    playChirp(880, 0.08, "sine");
  }
  return isSoundEnabled;
}

export function getSoundStatus(): boolean {
  return isSoundEnabled;
}

// Low-level helper: Play generic synth chime
function playChirp(freq: number, duration: number, type: OscillatorType = "sine", gainVal: number = 0.5) {
  if (!isSoundEnabled || !audioCtx || !masterVolume) return;
  try {
    const osc = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();
    
    osc.type = type;
    osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
    
    gainNode.gain.setValueAtTime(gainVal, audioCtx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + duration);
    
    osc.connect(gainNode);
    gainNode.connect(masterVolume);
    
    osc.start();
    osc.stop(audioCtx.currentTime + duration);
  } catch (err) {
    // suppress log noise
  }
}

// 1. Play High-tech Alert Alarm
export function playAlertAlarm() {
  if (!isSoundEnabled || !audioCtx || !masterVolume) return;
  try {
    const now = audioCtx.currentTime;
    const osc1 = audioCtx.createOscillator();
    const osc2 = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();
    
    osc1.frequency.setValueAtTime(220, now);
    osc1.frequency.linearRampToValueAtTime(440, now + 0.15);
    osc1.frequency.linearRampToValueAtTime(220, now + 0.3);
    osc1.type = "triangle";
    
    osc2.frequency.setValueAtTime(222, now);
    osc2.frequency.linearRampToValueAtTime(442, now + 0.15);
    osc2.frequency.linearRampToValueAtTime(222, now + 0.3);
    osc2.type = "sawtooth"; // futuristic bite
    
    gainNode.gain.setValueAtTime(0.1, now);
    gainNode.gain.exponentialRampToValueAtTime(0.0001, now + 0.3);
    
    osc1.connect(gainNode);
    osc2.connect(gainNode);
    gainNode.connect(masterVolume);
    
    osc1.start();
    osc2.start();
    osc1.stop(now + 0.35);
    osc2.stop(now + 0.35);
  } catch (err) {}
}

// 2. Click or Hover Feedback (subtle click)
export function playUiFeedback(type: "click" | "hover" | "beep" | "critical") {
  if (!isSoundEnabled) return;
  if (type === "click") {
    playChirp(600, 0.05, "sine", 0.3);
  } else if (type === "hover") {
    playChirp(1200, 0.02, "sine", 0.05);
  } else if (type === "beep") {
    playChirp(900, 0.1, "sine", 0.15);
  } else if (type === "critical") {
    playChirp(150, 0.4, "triangle", 0.8);
    setTimeout(() => playChirp(180, 0.2, "sawtooth", 0.4), 100);
  }
}

// 3. Cyber OS Boot Sequence sound
export function playBootSequence() {
  if (!isSoundEnabled || !audioCtx || !masterVolume) return;
  try {
    const now = audioCtx.currentTime;
    const pitches = [261.63, 329.63, 392.00, 523.25, 659.25, 783.99, 1046.50];
    pitches.forEach((pitch, index) => {
      setTimeout(() => {
        playChirp(pitch * 1.5, 0.2, "sine", 0.15);
      }, index * 80);
    });
  } catch (err) {}
}

// 4. Matrix Code Stream / AI voice transmission hum
let voiceInterval: any = null;
export function startAIVoicePulseHum() {
  if (!isSoundEnabled) return;
  if (voiceInterval) return;
  voiceInterval = setInterval(() => {
    // Generate low robot synthetic pulse
    playChirp(80 + Math.random() * 40, 0.15, "triangle", 0.05);
  }, 180);
}

export function stopAIVoicePulseHum() {
  if (voiceInterval) {
    clearInterval(voiceInterval);
    voiceInterval = null;
  }
}
