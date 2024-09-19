import { BitmapSprite, CollisionBox, Node, Size, SpriteSet, useFlash, useMergeProperty, useProperty, useUpdate } from "@overreact/engine";
import { useBitmapPreload, useBossCollisions, useEnemyStateMachine, usePlatformMovement, useWrapAround } from "../../../hooks";
import { RedOgreState } from "../../../state";
import { useAppearState, useDeadState, useDisappearState, useFireState, useIdleState } from "./states";
import { EnemyProps } from "../types";
import { IDLE, TELEPORT } from "./assets";

export const RedOgre: React.FC<EnemyProps<RedOgreState>> = ({ enemy, collider }) => {
  const { angle, flip, pos, scale, velocity, animation } = enemy;
  const maxFallSpeed = useProperty(0.12);

  // Preload all images.
  useBitmapPreload([IDLE, TELEPORT]);

  // Flash the boss's visibility when they are invulnerable.
  const visible = useMergeProperty(enemy.invulnerable, useFlash(100), (invulnerable, flash) => invulnerable <= 0 || flash);

  // When the bot leaves the screen, wrap to the other side.
  useWrapAround(enemy);

  // Standard platformer physics, attached to the enemy state object.
  usePlatformMovement(collider, pos, velocity, {
    gravity: [0, 0.0006],
    maxFallSpeed,
  });

  // Setup the finite state machine, to handle the behaviour of each state.
  const fsm = useEnemyStateMachine(enemy, {
    idle: useIdleState(),
    fire: useFireState(),
    disappear: useDisappearState(),
    appear: useAppearState(),
    dead: useDeadState(maxFallSpeed),
  });

  // Derive the collision tags from the state machine, and respond to zap collisions.
  const [tags, active] = useBossCollisions(collider, fsm);

  // Update the boss state.
  useUpdate((delta) => {
    enemy.update(delta);
  });

  // Common props for all sprites in the sprite set.
  const spriteProps = { size: [32, 32] as Size, flip, angle, scale, visible };

  return (
    <Node pos={pos}>
      <Node offset={[-16, -32]} rounded>
        <SpriteSet animation={animation}>
          <BitmapSprite {...spriteProps} name="idle" sprite={IDLE} />
          <BitmapSprite {...spriteProps} name="teleport" sprite={TELEPORT} />
        </SpriteSet>
      </Node>
      <Node offset={[-12, -24]}>
        <CollisionBox size={[24, 24]} id={collider} tags={tags} active={active} />
      </Node>
    </Node>
  );
};
