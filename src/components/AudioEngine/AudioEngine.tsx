import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";

type AudioEngineContextProps = {
  context: AudioContext,
  destination: AudioNode,
  getBuffer: (url: string) => Promise<AudioBuffer | null>,
}

export const AudioEngineContext = React.createContext<AudioEngineContextProps>({
  context: new AudioContext(),
  destination: null as unknown as AudioNode,
  getBuffer: async () => null as unknown as AudioBuffer,
});

type AudioEngineProps = {
  children: React.ReactNode;
};

export const AudioEngine: React.FC<AudioEngineProps> = ({ children }) => {
  const [context] = useState(new AudioContext({ latencyHint: 'interactive' }));
  const [destination] = useState(new GainNode(context));

  const buffers = useRef<Map<string, AudioBuffer>>(new Map());

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
   * Connect the destination (master gain) node to the audio context destination.
   */
  useEffect(() => {
    destination.gain.value = 0.5;
    destination.connect(context.destination);
  }, [context.destination, destination]);

  const value = useMemo(() => ({ context, destination, getBuffer }), [context, destination, getBuffer]);

  return (
    <AudioEngineContext.Provider value={value}>
      {children}
    </AudioEngineContext.Provider>
  );
};
