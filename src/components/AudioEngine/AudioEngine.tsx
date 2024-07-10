import React, { useCallback, useMemo, useRef, useState } from "react";
import { AudioEngineContext } from "./AudioEngineContext";

type AudioEngineProps = {
  children: React.ReactNode;
};

export const AudioEngine: React.FC<AudioEngineProps> = ({ children }) => {
  const [context] = useState(new AudioContext({ latencyHint: 'interactive' }));
  
  const channels = useRef<Map<string, GainNode>>(new Map());
  const buffers = useRef<Map<string, AudioBuffer>>(new Map());

  /**
   * Mute the given audio channel. Defaults to primary, muting everything.
   */
  const mute = useCallback((channel: string = 'primary') => {
    const node = channels.current.get(channel);

    if (node) {
      node.gain.value = 0.0;
    }
  }, []);

  /**
   * Unmute the given audio channel. Defaults to primary, unmuting everything.
   */
  const unmute = useCallback((channel: string = 'primary') => {
    const node = channels.current.get(channel);

    if (node) {
      node.gain.value = 1.0;
    }
  }, []);

  /**
   * Toggle the given audio channel. If it was muted, it'll be unmuted, and vice-versa.
   */
  const toggle = useCallback((channel: string = 'primary') => {
    const node = channels.current.get(channel);

    if (node) {
      node.gain.value = 1.0 - node.gain.value;
    }
  }, []);

  /**
   * Get an audio buffer for a given URL, cached locally to avoid repeatedly initialising the same
   * buffers over and buffer, which is costly.
   */
  const getBuffer = useCallback(async (url: string) => {
    if (!buffers.current.has(url)) {
      const response = await fetch(url);
      const data = await response.arrayBuffer();
      const buffer = await context.decodeAudioData(data);
      buffers.current.set(url, buffer);
    }
    
    return buffers.current.get(url) || null;
  }, [context]);

  /**
   * Get the destination node for the given channel, creating one if necessary.
   * The 'primary' channel will be hooked up to the context destination, but all others will be
   * connected to the 'primary' channel. This make it easy to control the primary audio volume,
   * but also control music and sound effects independently.
   */
  const getDestination = useCallback((channel: string = 'primary') => {
    const existing = channels.current.get(channel);

    if (existing) {
      return existing;
    } else {
      const destination = channel === 'primary' ? context.destination : getDestination('primary');
      const node = createDestination(context, destination, 1.0);
      channels.current.set(channel, node);
      return node;
    }
  }, [context]);

  /**
   * Setup the react context.
   */
  const value = useMemo(() => ({
    context,
    mute,
    unmute,
    toggle,
    getDestination,
    getBuffer,
  }), [context, mute, unmute, toggle, getDestination, getBuffer]);

  return (
    <AudioEngineContext.Provider value={value}>
      {children}
    </AudioEngineContext.Provider>
  );
};

/**
 * Create a new destination node, itself connected up to the given destination.
 */
const createDestination = (context: AudioContext, destination: AudioNode, volume: number): GainNode => {
  const result = new GainNode(context);
  result.gain.value = volume;
  result.connect(destination);
  return result;
};