import { useRef, useCallback, useMemo } from "react";

// CONSTANTS

const DEFAULT_PLAY_OPTIONS: Required<Pick<PlayAudioOptions, 'volume' | 'loop'>> = {
  volume: 1,
  loop: false,
};

// TYPES

type PlayAudioOptions = {
  key?: string;
  volume?: number;
  loop?: boolean;
};

type UseAudioOptions = {
  key?: string;
};

type UseAudioResult = {
  play: (url: string, options?: PlayAudioOptions) => Promise<void>;
  pause: (key?: string) => void;
  getAudioTrack: (key?: string) => AudioTrackRef | null;
};

type AudioTrackRef = {
  audio: HTMLAudioElement;
  url: string;
};

/**
 * useAudio
 * --------
 * 
 * 
 */
export const useAudio = (rootOptions?: UseAudioOptions): UseAudioResult => {
  const context = useRef(new AudioContext());
  const tracks = useRef<Map<string, AudioTrackRef>>(new Map());

  /**
   * Play an audio track, and return a promise that resolves when the track completes.
   */
  const play = useCallback((url: string, options?: PlayAudioOptions): Promise<void> => {
    const { key, volume, loop } = { ...DEFAULT_PLAY_OPTIONS, ...rootOptions, ...options };

    return new Promise((resolve): void => {
      const audio = new Audio(url);
      audio.volume = volume;
      audio.loop = loop;
      audio.play();

      if (key) {
        tracks.current.set(key, { audio, url });
      }

      audio.addEventListener('ended', () => {
        if (key) {
          tracks.current.delete(key);
        }

        resolve();
      });
    });
  }, [rootOptions]);

  /**
   * Pause the track with the given key, if it is playing.
   */
  const pause = useCallback((key?: string) => {
    const k = key || rootOptions?.key;

    if (k) {
      const track = tracks.current.get(k);

      if (track) {
        track.audio.pause();
        tracks.current.delete(k);
      }
    }
  }, [rootOptions?.key]);

  /**
   * Lookup an audio track by its unique key. If an audio track wasn't assigned a key, it cannot
   * be looked up.
   */
  const getAudioTrack = useCallback((key?: string): AudioTrackRef | null => {
    const k = key || rootOptions?.key;
    
    if (k) {
      return tracks.current.get(k) || null;
    } else {
      return null;
    }
  }, [rootOptions?.key]);

  return useMemo(() => ({ context, play, pause, getAudioTrack }), [play, pause, getAudioTrack]);
};