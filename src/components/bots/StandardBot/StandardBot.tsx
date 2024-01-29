import { useId } from "react";
import { BitmapSprite, CollisionBox, Node, SpriteSet, useDynamicProperty, useOffsetPosition, usePlatformMovement } from "@overreact/engine";
import { ENEMY_1_IDLE, ENEMY_1_RUN } from "../../../assets";
import { useEnemyCollisions, useIntegerPosition, useStateMachine } from "../../../hooks";
import { EnemyState } from "../../../state";
import { useFallingState, useIdleState, useJumpingState, usePatrolState, useThinkingState } from "./state";
import { States } from "./types";


type StandardBotProps = {
  enemy: EnemyState;
}

export const StandardBot: React.FC<StandardBotProps> = ({ enemy }) => {
  const pos = useOffsetPosition(enemy.pos, [-8, -16]);
  const collisionPos = useOffsetPosition(enemy.pos, [-6, -16]);
  const spritePos = useIntegerPosition(pos);

  const flip = useDynamicProperty(enemy.direction, (direction) => direction === 'left');
  const collider = useId();

  // Standard platformer physics, attached to the enemy state object.
  enemy.movement = usePlatformMovement(collider, enemy.pos, enemy.velocity, {
    gravity: [0, 0.0004],
    speed: 0.03,
    jumpStrength: 0.165,
  });

  // Setup the finite state machine, to handle the behaviour of each state.
  const fsm = useStateMachine<States, EnemyState>(enemy, 'idle', {
    idle: useIdleState(),
    falling: useFallingState(),
    jumping: useJumpingState(),
    patrol: usePatrolState(),
    thinking: useThinkingState(),
  });

  // Derive the collision tags from the state machine, and respond to zap collisions.
  const tags = useEnemyCollisions(collider, fsm);

  return (
    <Node>
      <SpriteSet animation={enemy.animation}>
        <BitmapSprite name="idle" pos={spritePos} size={[16, 16]} sprite={ENEMY_1_IDLE} flip={flip} />
        <BitmapSprite name="run" pos={spritePos} size={[16, 16]} sprite={ENEMY_1_RUN} flip={flip} />
      </SpriteSet>
      <CollisionBox pos={collisionPos} size={[12, 16]} id={collider} tags={tags} />
    </Node>
  )
};
