import { useCallback } from "react";
import { StateFunction, useProperty } from "@overreact/engine";
import { EnemyFireballState, RedOgreState } from "../../../../state";
import { useGame } from "../../../../hooks";

const GAP = 90;
const COUNT = 16;
const SPREAD = Math.PI * 2;
const OFFSET = Math.PI / 2;

export const useFireState = (): StateFunction<RedOgreState> => {
  const game = useGame();

  const fired = useProperty(0);

  return useCallback((fsm) => {
    if (fsm.age.current === 0) {
      fired.current = 0;
    }

    const count = Math.floor(fsm.age.current / GAP);

    if (count > fired.current) {
      const { pos, direction } = fsm.entity;
      const isLeft = direction.current === 'left';
      
      // Nudge the position forwards a bit, so it looks like the fireballs are
      // coming out of the ogre's mouth.
      const x = pos.current[0] + (isLeft ? -4 : 4);
      const y = pos.current[1] - 16;

      // Clockwise if facing right, anti-clockwise if facing left.
      const angle = (fired.current * (SPREAD / COUNT) * (isLeft ? 1 : -1)) + (isLeft ? -OFFSET : OFFSET);
      const dx = Math.sin(angle) * 0.85;
      const dy = Math.cos(angle) * 0.85;
      
      game.fireProjectile(new EnemyFireballState(game, [x, y], [dx, dy]));

      fired.current = count;
    }

    if (fsm.age.current >= COUNT * GAP * 2) {
      fsm.replace('disappear');
    }
  }, [fired, game]);
};
