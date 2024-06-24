import { useCallback } from "react";
import { StateFunction, useProperty } from "@overreact/engine";
import { TeleportBotState } from "../../../../state";
import { useGame } from "../../../../hooks";

export const useTeleportState = (): StateFunction<TeleportBotState> => {
  const game = useGame();
  const teleported = useProperty(false);

  return useCallback((fsm) => {
    if (fsm.age.current === 0) {
      fsm.entity.animation.current = 'teleport-out';
      teleported.current = false;
    }

    if (fsm.age.current >= 700 && !teleported.current) {
      const targets = game.levelData.targets
      const [tx, ty] = targets[Math.floor(Math.random() * targets.length)];
      const offset = (game.level.current - 1) * 200;

      fsm.entity.pos.current = [tx, offset + ty];
      fsm.entity.animation.current = 'teleport-in';
      teleported.current = true;
    }

    if (fsm.age.current >= 2100) {
      fsm.replace('idle');
    }
  }, [game, teleported]);
};
