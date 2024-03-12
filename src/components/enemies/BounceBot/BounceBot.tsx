import { useId } from "react";
import { BitmapSprite, CollisionBox, Node, Size, SpriteSet, useStateMachine } from "@overreact/engine";
import { useWrapAround, useEnemyCollisions, usePlatformMovement } from "../../../hooks";
import { BounceBotState } from "../../../state";
import { IDLE, JUMPING, STUNNED } from "./assets";
import { useDeadState, useIdleState, useJumpingState, useStunnedState } from "./states";
import { EnemyProps } from "../Enemy";

export const BounceBot: React.FC<EnemyProps<BounceBotState>> = ({ enemy, collider }) => {
  const { angle, animation, flip, pos, scale, velocity } = enemy;

  // When the bot leaves the screen, wrap to the other side.
  useWrapAround(enemy);

  // Standard platformer physics, attached to the enemy state object.
  const movement = usePlatformMovement(collider, pos, velocity, {
    gravity: [0, 0.0004],
    acceleration: 0.00,
    jumpStrength: 0.145,
  });

  // Setup the finite state machine, to handle the behaviour of each state.
  const fsm = useStateMachine(enemy, 'idle', {
    idle: useIdleState(),
    jumping: useJumpingState(movement),
    stunned: useStunnedState(movement),
    dead: useDeadState(),
  });

  // Derive the collision tags from the state machine, and respond to zap collisions.
  const deathCollider = useId();
  const [tags, active] = useEnemyCollisions(deathCollider, fsm);

  // Common props for all sprites in the sprite set.
  const spriteProps = { size: [16, 16] as Size, flip, angle, scale };

  return (
    <Node pos={pos}>
      <Node offset={[-8, -16]} rounded>
        <SpriteSet animation={animation}>
          <BitmapSprite {...spriteProps} name="idle" sprite={IDLE} />
          <BitmapSprite {...spriteProps} name="jumping" sprite={JUMPING} repeat={false} />
          <BitmapSprite {...spriteProps} name="stunned" sprite={STUNNED} repeat={false} />
        </SpriteSet>
      </Node>
      <Node offset={[-5, -4]}>
        <CollisionBox size={[10, 4]} id={collider} active={active} />
      </Node>
      <Node offset={[-5, -12]}>
        <CollisionBox size={[10, 12]} id={deathCollider} tags={tags} active={active} />
      </Node>
    </Node>
  );
};
