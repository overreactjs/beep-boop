import { useCallback } from "react";
import { chance, useProperty, useVirtualInput } from "@overreact/engine";
import { useGame } from "../../../hooks";
import { StateFunction } from "../types";

const JUMP_CHANCE = 3.0;
const FIRE_CHANCE = 5.0;
const TURN_CHANCE = 3.0;
const COOLDOWN_DURATION = 2000;

export const usePatrolState = (): StateFunction => {
  const game = useGame();
  const input = useVirtualInput();

  const cooldown = useProperty(0);
  
  return useCallback((fsm, delta) => {
    const { direction, movement } = fsm.entity;
    const [bx, by] = fsm.entity.block.current;
    const [px, py] = game.current.players[0].block.current;

    const isLevelWithPlayer = py === by;
    const isBelowPlayer = py <= by;
    const isBelowPlatform = game.current.isSolid(bx, by - 4);
    const isFacingLeft = direction.current === 'left';
    const canSeePlayer = (px < bx && isFacingLeft) || (px > py && !isFacingLeft);
    const canFire = cooldown.current === 0;

    // Change direction if the enemy reached the end of a platform or a wall.
    const offset = !isFacingLeft ? 1 : -1;
    if (movement?.isOnFloor.current && game.current.isSolid(bx + offset, by - 1)) {
      fsm.entity.reverse();
    }

    // When the enemy walks off the edge of a platform.
    if (movement?.isFalling.current) {
      return fsm.replace('falling');
    }

    // Fire if the player is in front of the enemy.
    if (isLevelWithPlayer && canSeePlayer && canFire && chance(FIRE_CHANCE * delta)) {
      game.current.fireEnemyZap(fsm.entity);
      cooldown.current = COOLDOWN_DURATION;
    }
    
    // Turn around, if the player is level with, but behind the enemy.
    if (isLevelWithPlayer && !canSeePlayer && chance(TURN_CHANCE * delta)) {
      fsm.entity.reverse();
    }

    // Jump if the player is above the enemy, and there's a platform to jump on to.
    if (isBelowPlayer && isBelowPlatform && chance(JUMP_CHANCE * delta)) {
      return fsm.replace('thinking');
    }

    // Simulate the left or right movements.
    input.simulate(direction.current);
    fsm.entity.animation.current = 'run';

    // Reduce the cooldown, ready to fire again.
    cooldown.current = Math.max(0, cooldown.current - delta);

  }, [cooldown, game, input]);
};
