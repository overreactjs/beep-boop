import React from "react";

type AudioEngineContextProps = {
  context: AudioContext,
  mute: (channel?: string) => void;
  unmute: (channel?: string) => void;
  toggle: (channel?: string) => void;
  getChannel: (channel?: string) => AudioNode,
  getBuffer: (url: string) => Promise<AudioBuffer | null>,
}

export const AudioEngineContext = React.createContext<AudioEngineContextProps>({
  context: new AudioContext(),
  mute: () => {},
  unmute: () => {},
  toggle: () => {},
  getChannel: () => null as unknown as AudioNode,
  getBuffer: async () => null as unknown as AudioBuffer,
});
