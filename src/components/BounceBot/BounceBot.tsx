import { useId } from "react";
import { BitmapSprite, CollisionBox, Node, Size, SpriteSet, useIntegerPosition, useOffsetPosition, useStateMachine } from "@overreact/engine";
import { useWrapAround, useEnemyCollisions, useBubbleBobbleMovement } from "../../hooks";
import { EnemyState } from "../../state";
import { IDLE, JUMPING, STUNNED } from "./assets";
import { useDeadState, useIdleState, useJumpingState, useStunnedState } from "./states";
import { States } from "./types";
import { EnemyProps } from "../Enemy";
import { BounceBotState } from "../../state/EnemyState";

export const BounceBot: React.FC<EnemyProps<BounceBotState>> = ({ enemy, collider }) => {
  const { angle, animation, flip, pos, scale, velocity } = enemy;

  const deathCollider = useId();
  const deathCollisionPos = useOffsetPosition(pos, [-5, -12]);
  const collisionPos = useOffsetPosition(pos, [-5, -4]);
  const spritePos = useIntegerPosition(useOffsetPosition(pos, [-8, -16]));

  // When the bot leaves the screen, wrap to the other side.
  useWrapAround(enemy);

  // Standard platformer physics, attached to the enemy state object.
  enemy.movement = useBubbleBobbleMovement(collider, pos, velocity, {
    gravity: [0, 0.0004],
    acceleration: 0.00,
    jumpStrength: 0.145,
  });

  // Setup the finite state machine, to handle the behaviour of each state.
  const fsm = useStateMachine<States, EnemyState>(enemy, 'idle', {
    idle: useIdleState(),
    jumping: useJumpingState(),
    stunned: useStunnedState(),
    dead: useDeadState(),
  });

  // Derive the collision tags from the state machine, and respond to zap collisions.
  const [tags, active] = useEnemyCollisions(deathCollider, fsm);

  // Common props for all sprites in the sprite set.
  const spriteProps = { size: [16, 16] as Size, flip, angle, scale };

  return (
    <Node pos={spritePos}>
      <SpriteSet animation={animation}>
        <BitmapSprite {...spriteProps} name="idle" sprite={IDLE} />
        <BitmapSprite {...spriteProps} name="jumping" sprite={JUMPING} repeat={false} />
        <BitmapSprite {...spriteProps} name="stunned" sprite={STUNNED} repeat={false} />
      </SpriteSet>
      <CollisionBox pos={collisionPos} size={[10, 4]} id={collider} active={active} />
      <CollisionBox pos={deathCollisionPos} size={[10, 12]} id={deathCollider} tags={tags} active={active} />
    </Node>
  );
};