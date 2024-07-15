import React from "react";

type AudioEngineContextProps = {
  context: AudioContext,
  mute: (channel?: string) => void;
  unmute: (channel?: string) => void;
  toggle: (channel?: string) => void;
  getChannel: (channel?: string) => GainNode,
  getBuffer: (url: string) => Promise<AudioBuffer | null>,
}

export const AudioEngineContext = React.createContext<AudioEngineContextProps>({
  context: new AudioContext(),
  mute: () => {},
  unmute: () => {},
  toggle: () => {},
  getChannel: () => null as unknown as GainNode,
  getBuffer: async () => null as unknown as AudioBuffer,
});
