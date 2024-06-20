import { useCallback, useEffect, useRef } from "react";
import { useParticles } from "./useParticles";
import { BaseParticle } from "./BaseParticle";

export const Particles: React.FC = () => {
  const particles = useParticles();
  const ref = useRef<HTMLDivElement>(null);

  const attach = useCallback((particle: BaseParticle) => {
    if (ref.current && particle.node) {
      ref.current.insertBefore(particle.node, ref.current.firstChild);
    }
  }, []);

  useEffect(() => {
    particles.addEventListener('create', attach);
    return () => particles.removeEventListener('create', attach);
  }, [attach, particles]);

  return <div ref={ref} />;
};
