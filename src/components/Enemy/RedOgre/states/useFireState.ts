import { useCallback } from "react";
import { StateFunction, useProperty } from "@overreact/engine";
import { EnemyFireballState, RedOgreState } from "../../../../state";
import { useGame, useSoundEffects } from "../../../../hooks";

const PERIOD = 90;
const COUNT = 16;
const SPREAD = Math.PI * 2;
const GAP = SPREAD / (COUNT + 0.5);
const OFFSET = Math.PI / 2 - 0.1;
const REGULAR_SPEED = 0.85;
const ANGRY_SPEED = 1.00;

export const useFireState = (): StateFunction<RedOgreState> => {
  const game = useGame();
  const sfx = useSoundEffects();

  const fired = useProperty(0);

  return useCallback((fsm) => {
    if (fsm.age.current === 0) {
      fired.current = 0;
    }

    const count = Math.floor(fsm.age.current / PERIOD);

    if (count > fired.current) {
      const { pos, direction } = fsm.entity;
      const isLeft = direction.current === 'left';
      
      // Nudge the position forwards a bit, so it looks like the fireballs are
      // coming out of the ogre's mouth.
      const x = pos.current[0] + (isLeft ? -4 : 4);
      const y = pos.current[1] - 16;

      // Clockwise if facing right, anti-clockwise if facing left.
      const angle = (fired.current * GAP * (isLeft ? 1 : -1)) + (isLeft ? -OFFSET : OFFSET);
      const speed = fsm.entity.health.current > 5 ? REGULAR_SPEED : ANGRY_SPEED;
      const dx = Math.sin(angle) * speed;
      const dy = Math.cos(angle) * speed;
      
      game.fireProjectile(new EnemyFireballState(game, [x, y], [dx, dy]));
      sfx.play('Fireball');

      fired.current = count;
    }

    if (fsm.age.current >= COUNT * PERIOD * 2) {
      fsm.replace('disappear');
    }
  }, [fired, game, sfx]);
};
