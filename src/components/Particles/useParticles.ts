import { useContext } from "react";
import { ParticleContext } from "./ParticleEngine"

export const useParticles = () => {
  return useContext(ParticleContext);
};
