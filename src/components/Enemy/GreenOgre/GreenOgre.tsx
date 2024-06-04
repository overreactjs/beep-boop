import { BitmapSprite, CollisionBox, Node, Size, useFlash, useMergeProperty, useProperty, useStateMachine, useUpdate } from "@overreact/engine";
import { useBossCollisions, usePlatformMovement, useWrapAround } from "../../../hooks";
import { GreenOgreState } from "../../../state";
import { useDeadState, useFireState, useIdleState, useMoveState } from "./states";
import { EnemyProps } from "../types";
import { IDLE } from "./assets";
// import { Dizzy } from "../../Dizzy";

export const GreenOgre: React.FC<EnemyProps<GreenOgreState>> = ({ enemy, collider }) => {
  const { angle, flip, pos, scale, velocity } = enemy;
  const maxFallSpeed = useProperty(0.12);

  // Flash the boss's visibility when they are invulnerable.
  const visible = useMergeProperty(enemy.invulnerable, useFlash(100), (invulnerable, flash) => invulnerable <= 0 || flash);

  // When the bot leaves the screen, wrap to the other side.
  useWrapAround(enemy);

  // Standard platformer physics, attached to the enemy state object.
  usePlatformMovement(collider, pos, velocity, {
    gravity: [0, 0.0006],
    speed: 0.03,
    jumpStrength: 0.25,
    maxFallSpeed,
  });

  // Setup the finite state machine, to handle the behaviour of each state.
  const fsm = useStateMachine(enemy, 'idle', {
    idle: useIdleState(),
    fire: useFireState(),
    move: useMoveState(),
    dead: useDeadState(maxFallSpeed),
  });

  // Derive the collision tags from the state machine, and respond to zap collisions.
  const [active] = useBossCollisions(collider, fsm);

  // Update the boss state.
  useUpdate((delta) => {
    enemy.update(delta);
  });

  // Common props for all sprites in the sprite set.
  const spriteProps = { size: [32, 32] as Size, flip, angle, scale, visible };

  return (
    <Node pos={pos}>
      <Node offset={[-16, -32]} rounded>
        <BitmapSprite {...spriteProps} sprite={IDLE} />
      </Node>
      <Node offset={[-12, -24]}>
        <CollisionBox size={[24, 24]} id={collider} tags={['enemy']} active={active} />
      </Node>
    </Node>
  );
};


/*
<SpriteSet animation={animation}>
  <BitmapSprite {...spriteProps} name="idle" sprite={IDLE} />
  <BitmapSprite {...spriteProps} name="run" sprite={RUN} />
  <BitmapSprite {...spriteProps} name="stunned" sprite={STUNNED} repeat={false} />
</SpriteSet>
<Node pos={enemy.pos} offset={[-8, -22]} rounded>
  <Dizzy fsm={fsm} />
</Node>
*/