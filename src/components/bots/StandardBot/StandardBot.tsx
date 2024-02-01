import { useId } from "react";
import { BitmapSprite, CollisionBox, Node, SpriteSet, useDynamicProperty, useIntegerPosition, useOffsetPosition, usePlatformMovement, useStateMachine } from "@overreact/engine";
import { useEnemyCollisions } from "../../../hooks";
import { EnemyState } from "../../../state";
import { IDLE, RUN, STUNNED } from "./assets";
import { useDeadState, useFallingState, useIdleState, useJumpingState, usePatrolState, useStunnedState, useThinkingState } from "./states";
import { States } from "./types";

type StandardBotProps = {
  enemy: EnemyState;
}

export const StandardBot: React.FC<StandardBotProps> = ({ enemy }) => {
  const { angle, animation, flip, pos, scale, velocity } = enemy;

  const collisionPos = useOffsetPosition(pos, [-6, -16]);
  const spritePos = useIntegerPosition(useOffsetPosition(pos, [-8, -16]));
  const collider = useId();

  // Standard platformer physics, attached to the enemy state object.
  enemy.movement = usePlatformMovement(collider, pos, velocity, {
    gravity: [0, 0.0006],
    speed: 0.03,
    jumpStrength: 0.21,
  });

  // Setup the finite state machine, to handle the behaviour of each state.
  const fsm = useStateMachine<States, EnemyState>(enemy, 'idle', {
    idle: useIdleState(),
    falling: useFallingState(),
    jumping: useJumpingState(),
    patrol: usePatrolState(),
    stunned: useStunnedState(),
    thinking: useThinkingState(),
    dead: useDeadState(),
  });

  // Derive the collision tags from the state machine, and respond to zap collisions.
  const tags = useEnemyCollisions(collider, fsm);
  const active = useDynamicProperty(fsm.current.state, (state) => state !== 'dead');

  return (
    <Node>
      <SpriteSet animation={animation}>
        <BitmapSprite name="idle" pos={spritePos} size={[16, 16]} sprite={IDLE} flip={flip} angle={angle} scale={scale} />
        <BitmapSprite name="run" pos={spritePos} size={[16, 16]} sprite={RUN} flip={flip} angle={angle} scale={scale} />
        <BitmapSprite name="stunned" pos={spritePos} size={[16, 16]} sprite={STUNNED} flip={flip} repeat={false} angle={angle} scale={scale} />
      </SpriteSet>
      <CollisionBox pos={collisionPos} size={[12, 16]} id={collider} tags={tags} active={active} />
    </Node>
  )
};
