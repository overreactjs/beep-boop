import { useId } from "react";
import { BitmapSprite, CollisionBox, Node, SpriteSet, useIntegerPosition, useOffsetPosition, useStateMachine } from "@overreact/engine";
import { useWrapAround, useEnemyCollisions, useBubbleBobbleMovement } from "../../hooks";
import { EnemyState } from "../../state";
import { IDLE, JUMPING } from "./assets";
import { useIdleState, useJumpingState } from "./states";
import { States } from "./types";

type BounceBotProps = {
  enemy: EnemyState;
}

export const BounceBot: React.FC<BounceBotProps> = ({ enemy }) => {
  const { angle, animation, flip, pos, scale, velocity } = enemy;

  const collisionPos = useOffsetPosition(pos, [-5, -16]);
  const spritePos = useIntegerPosition(useOffsetPosition(pos, [-8, -16]));
  const collider = useId();

  // When the bot leaves the screen, wrap to the other side.
  useWrapAround(enemy);

  // Standard platformer physics, attached to the enemy state object.
  enemy.movement = useBubbleBobbleMovement(collider, pos, velocity, {
    gravity: [0, 0.0004],
    acceleration: 0.00,
    jumpStrength: 0.14,
  });

  // Setup the finite state machine, to handle the behaviour of each state.
  const fsm = useStateMachine<States, EnemyState>(enemy, 'idle', {
    idle: useIdleState(),
    jumping: useJumpingState(),
  });

  // Derive the collision tags from the state machine, and respond to zap collisions.
  const [tags, active] = useEnemyCollisions(collider, fsm);

  return (
    <Node>
      <SpriteSet animation={animation}>
        <BitmapSprite name="idle" pos={spritePos} size={[16, 16]} sprite={IDLE} flip={flip} angle={angle} scale={scale} />
        <BitmapSprite name="jumping" pos={spritePos} size={[16, 16]} sprite={JUMPING} flip={flip} angle={angle} scale={scale} repeat={false} />
      </SpriteSet>
      <CollisionBox pos={collisionPos} size={[10, 16]} id={collider} tags={tags} active={active} />
    </Node>
  );
};