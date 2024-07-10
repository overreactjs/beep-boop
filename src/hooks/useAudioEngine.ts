import { useContext } from "react"
import { AudioEngineContext } from "../components/AudioEngine/AudioEngineContext";

export const useAudioEngine = () => {
  return useContext(AudioEngineContext);
};
