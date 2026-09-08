import { RANDOM_TRACKS, BIOME_AUDIO_DIR, RANDOM_AUDIO_DIR } from './tracks';

export interface AudioState {
  trackLabel: string | null;
  isPlaying: boolean;
  isMuted: boolean;
  volume: number; // 0..1
  shuffle: boolean;
  unlocked: boolean; // se o usuário já autorizou áudio (política de autoplay)
  trackMissing: boolean; // arquivo atual não pôde ser carregado
  mode: 'biome' | 'random' | 'idle';
}

const STORAGE_KEY = 'tba-audio-settings-v1';

interface StoredSettings {
  volume: number;
  isMuted: boolean;
  shuffle: boolean;
}

function loadSettings(): StoredSettings {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch {
    /* ignora localStorage indisponível */
  }
  return { volume: 0.35, isMuted: false, shuffle: true };
}

function saveSettings(s: StoredSettings) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(s));
  } catch {
    /* ignora */
  }
}

class AudioManagerImpl {
  private audioEl: HTMLAudioElement;
  private fadeTimer: number | null = null;
  private listeners = new Set<(s: AudioState) => void>();
  private lastRandomTrack: string | null = null;
  private currentBiome: string | null = null;
  private state: AudioState;

  constructor() {
    const settings = loadSettings();
    this.audioEl = new Audio();
    this.audioEl.loop = true;
    this.audioEl.volume = settings.isMuted ? 0 : settings.volume;
    this.state = {
      trackLabel: null,
      isPlaying: false,
      isMuted: settings.isMuted,
      volume: settings.volume,
      shuffle: settings.shuffle,
      unlocked: false,
      trackMissing: false,
      mode: 'idle',
    };

    this.audioEl.addEventListener('error', () => {
      this.patch({ trackMissing: true, isPlaying: false });
    });
  }

  subscribe(fn: (s: AudioState) => void) {
    this.listeners.add(fn);
    fn(this.state);
    return () => this.listeners.delete(fn);
  }

  private patch(partial: Partial<AudioState>) {
    this.state = { ...this.state, ...partial };
    this.listeners.forEach((l) => l(this.state));
  }

  private persist() {
    saveSettings({ volume: this.state.volume, isMuted: this.state.isMuted, shuffle: this.state.shuffle });
  }

  /** Deve ser chamado a partir de um gesto do usuário (clique em "Ativar música"). */
  unlock() {
    this.patch({ unlocked: true });
  }

  setVolume(v: number) {
    const clamped = Math.max(0, Math.min(1, v));
    this.audioEl.volume = this.state.isMuted ? 0 : clamped;
    this.patch({ volume: clamped });
    this.persist();
  }

  toggleMute() {
    const next = !this.state.isMuted;
    this.audioEl.volume = next ? 0 : this.state.volume;
    this.patch({ isMuted: next });
    this.persist();
  }

  toggleShuffle() {
    this.patch({ shuffle: !this.state.shuffle });
    this.persist();
  }

  togglePlayPause() {
    if (!this.state.unlocked) return;
    if (this.audioEl.paused) {
      this.audioEl.play().catch(() => this.patch({ trackMissing: true }));
      this.patch({ isPlaying: true });
    } else {
      this.audioEl.pause();
      this.patch({ isPlaying: false });
    }
  }

  private fadeOut(durationMs: number): Promise<void> {
    return new Promise((resolve) => {
      if (this.fadeTimer) window.clearInterval(this.fadeTimer);
      const startVolume = this.audioEl.volume;
      if (startVolume <= 0.001) return resolve();
      const steps = 12;
      const stepTime = durationMs / steps;
      let i = 0;
      this.fadeTimer = window.setInterval(() => {
        i++;
        this.audioEl.volume = Math.max(0, startVolume * (1 - i / steps));
        if (i >= steps) {
          if (this.fadeTimer) window.clearInterval(this.fadeTimer);
          resolve();
        }
      }, stepTime);
    });
  }

  private fadeIn(target: number, durationMs: number) {
    if (this.fadeTimer) window.clearInterval(this.fadeTimer);
    const steps = 12;
    const stepTime = durationMs / steps;
    let i = 0;
    this.audioEl.volume = 0;
    this.fadeTimer = window.setInterval(() => {
      i++;
      this.audioEl.volume = this.state.isMuted ? 0 : Math.min(target, target * (i / steps));
      if (i >= steps && this.fadeTimer) window.clearInterval(this.fadeTimer);
    }, stepTime);
  }

  private async crossfadeTo(src: string, label: string, mode: 'biome' | 'random') {
    if (!this.state.unlocked) {
      // Ainda não autorizado: apenas memoriza a intenção para quando o usuário liberar o áudio.
      this.patch({ trackLabel: label, mode, trackMissing: false, isPlaying: false });
      this.audioEl.src = src;
      return;
    }
    await this.fadeOut(400);
    this.audioEl.src = src;
    this.patch({ trackLabel: label, mode, trackMissing: false });
    try {
      await this.audioEl.play();
      this.patch({ isPlaying: true });
      this.fadeIn(this.state.volume, 500);
    } catch {
      this.patch({ trackMissing: true, isPlaying: false });
    }
  }

  playBiomeMusic(biomeKey: string, fileName: string, label: string) {
    this.currentBiome = biomeKey;
    this.crossfadeTo(`${BIOME_AUDIO_DIR}${fileName}`, label, 'biome');
  }

  playRandomMusic() {
    this.currentBiome = null;
    const pool = RANDOM_TRACKS.length > 1 ? RANDOM_TRACKS.filter((t) => t !== this.lastRandomTrack) : RANDOM_TRACKS;
    const pick = pool[Math.floor(Math.random() * pool.length)];
    this.lastRandomTrack = pick;
    this.crossfadeTo(`${RANDOM_AUDIO_DIR}${pick}`, `Aleatório — ${pick.replace('.mp3', '')}`, 'random');
  }

  nextTrack() {
    if (this.state.mode === 'biome') {
      // Repete a mesma faixa do bioma atual (não há alternativa dentro do bioma).
      if (this.currentBiome) this.audioEl.currentTime = 0;
      return;
    }
    this.playRandomMusic();
  }

  getState() {
    return this.state;
  }
}

export const AudioManager = new AudioManagerImpl();
