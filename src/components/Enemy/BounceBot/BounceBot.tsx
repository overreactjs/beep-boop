import { useId } from "react";
import { BitmapSprite, CollisionBox, Node, Size, SpriteSet, useProperty } from "@overreact/engine";
import { useWrapAround, useEnemyCollisions, usePlatformMovement, useEnemyStateMachine, useEnemyAnimation, useBitmapPreload } from "../../../hooks";
import { BounceBotState } from "../../../state";
import { IDLE, IDLE_ANGRY, JUMPING, JUMPING_ANGRY, STUNNED, STUNNED_ANGRY } from "./assets";
import { useDeadState, useIdleState, useJumpingState, useStunnedState } from "./states";
import { EnemyProps } from "../types";
import { Dizzy } from "../../Dizzy";

export const BounceBot: React.FC<EnemyProps<BounceBotState>> = ({ enemy, collider }) => {
  const { angle, flip, pos, scale, velocity } = enemy;
  const maxFallSpeed = useProperty(0.2);
  const animation = useEnemyAnimation(enemy);

  // Preload all images.
  useBitmapPreload([IDLE, IDLE_ANGRY, JUMPING, JUMPING_ANGRY, STUNNED, STUNNED_ANGRY]);

  // When the bot leaves the screen, wrap to the other side.
  useWrapAround(enemy, { direction: 'downwards' });

  // Standard platformer physics, attached to the enemy state object.
  const movement = usePlatformMovement(collider, pos, velocity, {
    gravity: [0, 0.0004],
    acceleration: 0.00,
    jumpStrength: 0.145,
    maxFallSpeed,
  });

  // Setup the finite state machine, to handle the behaviour of each state.
  const fsm = useEnemyStateMachine(enemy, {
    idle: useIdleState(),
    jumping: useJumpingState(movement),
    stunned: useStunnedState(movement),
    dead: useDeadState(maxFallSpeed),
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
          <BitmapSprite {...spriteProps} name="idle-angry" sprite={IDLE_ANGRY} />
          <BitmapSprite {...spriteProps} name="jumping-angry" sprite={JUMPING_ANGRY} repeat={false} />
          <BitmapSprite {...spriteProps} name="stunned-angry" sprite={STUNNED_ANGRY} repeat={false} />
        </SpriteSet>
      </Node>
      <Node offset={[-5, -4]}>
        <CollisionBox size={[10, 4]} id={collider} active={active} />
      </Node>
      <Node offset={[-5, -12]}>
        <CollisionBox size={[10, 12]} id={deathCollider} tags={tags} active={active} />
      </Node>
      <Node pos={enemy.pos} offset={[-8, -22]} rounded>
        <Dizzy fsm={fsm} />
      </Node>
    </Node>
  );
};
