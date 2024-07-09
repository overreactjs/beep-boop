import { useContext } from "react"
import { AudioEngineContext } from "../components/AudioEngine/AudioEngine"

export const useAudioEngine = () => {
  return useContext(AudioEngineContext);
};
