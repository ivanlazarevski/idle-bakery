import { Injectable, signal } from '@angular/core';
import { TRACKS } from './music.tracks';
import { Sfx } from './sfx.enum';

@Injectable({
  providedIn: 'root',
})
export class MusicService {
  private tracks = TRACKS;
  private audio: HTMLAudioElement | null = null;
  private lastTrackIndex: number | null = null;
  public buildAudio = '/Audio/Build.wav';
  public upgradeAudio = '/Audio/Upgrade.wav';
  public unlockAudio = '/Audio/Unlock.wav';
  private sfxAudio: HTMLAudioElement | null = null;

  musicEnabled = signal(false);
  sfxEnabled = signal(false);

  public toggleSfx(state: boolean): void {
    if (state) {
      this.sfxAudio = new Audio();
      this.sfxAudio.volume = 0.5;
    } else {
      this.sfxAudio = null;
    }

    this.sfxEnabled.set(state);
  }

  public playSfxSound(type: Sfx): void {
    if (!this.sfxEnabled()) {
      return;
    }

    if (this.sfxAudio) {
      switch (type) {
        case Sfx.BUILD:
          this.sfxAudio.src = this.buildAudio;
          this.sfxAudio.play();
          break;
        case Sfx.UPGRADE:
          this.sfxAudio.src = this.upgradeAudio;
          this.sfxAudio.play();
          break;
        case Sfx.UNLOCK:
          this.sfxAudio.src = this.unlockAudio;
          this.sfxAudio.play();
          break;
      }
    }
  }

  private getRandomTrack(): string {
    if (this.tracks.length <= 1) return this.tracks[0];

    let index: number;
    do {
      index = Math.floor(Math.random() * this.tracks.length);
    } while (index === this.lastTrackIndex);

    this.lastTrackIndex = index;
    return this.tracks[index];
  }

  private playNextTrack(): void {
    const track = this.getRandomTrack();
    this.audio = new Audio(track);
    this.audio.volume = 0.1;
    this.audio.play().then((r) => console.log('track playing...'));

    this.audio.onended = () => {
      if (this.musicEnabled()) {
        this.playNextTrack();
      }
    };
  }

  toggleMusic(): void {
    if (this.musicEnabled()) {
      this.stop();
    } else {
      this.start();
    }
  }

  start(): void {
    if (!this.musicEnabled()) {
      this.musicEnabled.set(true);
      this.playNextTrack();
    }
  }

  stop() {
    if (this.audio) {
      this.audio.pause();
      this.audio.currentTime = 0;
      this.audio = null;
    }
    this.musicEnabled.set(false);
  }
}
