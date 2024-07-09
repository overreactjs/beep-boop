import { useRef, useCallback, useMemo } from "react";
import { useAudioEngine } from "./useAudioEngine";

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
  stop: (key?: string) => void;
  getAudioTrack: (key?: string) => AudioTrackRef | null;
};

type AudioTrackRef = {
  source: AudioBufferSourceNode;
  url: string;
};

/**
 * useAudio
 * --------
 * 
 * 
 */
export const useAudio = (rootOptions?: UseAudioOptions): UseAudioResult => {
  const { context, destination, getBuffer } = useAudioEngine();
  const tracks = useRef<Map<string, AudioTrackRef>>(new Map());

  /**
   * Play an audio track, and return a promise that resolves when the track completes.
   */
  const play = useCallback(async (url: string, options?: PlayAudioOptions): Promise<void> => {
    const { key, volume, loop } = { ...DEFAULT_PLAY_OPTIONS, ...rootOptions, ...options };

    // Get an audio buffer for the given url.
    const buffer = await getBuffer(url);

    // Connect the gain node to the destination.
    const gain = new GainNode(context);
    gain.gain.value = volume;
    gain.connect(destination);

    // Connect the source node to the gain node.
    const source = new AudioBufferSourceNode(context);
    source.buffer = buffer;
    source.loop = loop;
    source.connect(gain);
    source.start(0);

    // Keep track of keyed tracks.
    if (key) {
      tracks.current.set(key, { source, url });
    }
    
    // Return a promise which resolves when the track has ended.
    return new Promise((resolve): void => {
      source.addEventListener('ended', () => {
        if (key) {
          tracks.current.delete(key);
        }

        resolve();
      });
    });
  }, [context, destination, getBuffer, rootOptions]);

  /**
   * Stop the track with the given key, if it is playing.
   */
  const stop = useCallback((key?: string) => {
    const k = key || rootOptions?.key;

    if (k) {
      const track = tracks.current.get(k);

      if (track) {
        track.source.stop();
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

  return useMemo(() => ({ context, play, stop, getAudioTrack }), [context, play, stop, getAudioTrack]);
};