import { useCallback } from "react";
import { StateFunction } from "@overreact/engine";
import { RedOgreState } from "../../../../state";
import { useGame } from "../../../../hooks";

const POSITIONS = [
  [176, 64],
  [176, 128],
  [80, 128],
  [80, 64],
];

export const useAppearState = (): StateFunction<RedOgreState> => {
  const game = useGame();

  return useCallback((fsm) => {
    if (fsm.age.current === 0) {
      // teleport to another platform.
      fsm.entity.platform = (fsm.entity.platform + Math.floor(Math.random() * 3) + 1) % 4;

      const pos = POSITIONS[fsm.entity.platform];
      const offset = (game.level.current - 1) * 200;
      fsm.entity.pos.current = [pos[0], offset + pos[1]];
      fsm.entity.direction.current = fsm.entity.platform <= 1 ? 'left' : 'right';

      fsm.entity.animation.current = 'teleport';
      fsm.entity.invulnerable.current = 2000;
    }

    if (fsm.age.current >= 2000) {
      fsm.replace('idle');
    }
  }, [game]);
};
