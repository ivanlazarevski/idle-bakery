import { Injectable, signal } from '@angular/core';
import { TRACKS } from './music.tracks';

@Injectable({
  providedIn: 'root',
})
export class MusicService {
  private tracks = TRACKS;
  private audio: HTMLAudioElement | null = null;
  private lastTrackIndex: number | null = null;

  musicEnabled = signal(false);

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
