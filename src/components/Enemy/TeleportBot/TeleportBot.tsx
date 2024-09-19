import { BitmapSprite, CollisionBox, Node, Size, SpriteSet, useDynamicProperty, useProperty } from "@overreact/engine";
import { usePlatformMovement, useWrapAround, useEnemyStateMachine, useEnemyAnimation, useTeleportBotCollisions, useBitmapPreload } from "../../../hooks";
import { TeleportBotState } from "../../../state";
import { IDLE, IDLE_ANGRY, RUN, RUN_ANGRY, STUNNED, STUNNED_ANGRY, TELEPORT_IN, TELEPORT_IN_ANGRY, TELEPORT_OUT, TELEPORT_OUT_ANGRY } from "./assets";
import { useDeadState, useFallingState, useIdleState, useJumpingState, usePatrolState, useStunnedState, useTeleportState, useThinkingState } from "./states";
import { EnemyProps } from "../types";
import { Dizzy } from "../../Dizzy";

export const TeleportBot: React.FC<EnemyProps<TeleportBotState>> = ({ enemy, collider }) => {
  const { angle, flip, pos, scale, velocity, angry } = enemy;
  const maxFallSpeed = useProperty(0.08);
  const speed = useDynamicProperty(angry, (angry) => angry ? 0.040 : 0.025);
  const animation = useEnemyAnimation(enemy);

  // Preload all images.
  useBitmapPreload([IDLE, IDLE_ANGRY, RUN, RUN_ANGRY, STUNNED, STUNNED_ANGRY, TELEPORT_IN, TELEPORT_IN_ANGRY, TELEPORT_OUT, TELEPORT_OUT_ANGRY]);

  // When the bot leaves the screen, wrap to the other side.
  useWrapAround(enemy, { direction: 'downwards' });

  // Standard platformer physics, attached to the enemy state object.
  const movement = usePlatformMovement(collider, pos, velocity, {
    gravity: [0, 0.0006],
    speed,
    jumpStrength: 0.21,
    maxFallSpeed,
  });

  // Setup the finite state machine, to handle the behaviour of each state.
  const fsm = useEnemyStateMachine(enemy, {
    idle: useIdleState(),
    falling: useFallingState(movement),
    jumping: useJumpingState(movement),
    patrol: usePatrolState(movement),
    stunned: useStunnedState(),
    thinking: useThinkingState(),
    teleport: useTeleportState(),
    dead: useDeadState(maxFallSpeed),
  });

  // Derive the collision tags from the state machine, and respond to zap collisions.
  const [tags, active] = useTeleportBotCollisions(collider, fsm);

  // Common props for all sprites in the sprite set.
  const spriteProps = { size: [16, 16] as Size, flip, angle, scale };

  return (
    <Node pos={pos}>
      <Node offset={[-8, -16]} rounded>
        <SpriteSet animation={animation}>
          <BitmapSprite {...spriteProps} name="idle" sprite={IDLE} />
          <BitmapSprite {...spriteProps} name="run" sprite={RUN} />
          <BitmapSprite {...spriteProps} name="stunned" sprite={STUNNED} repeat={false} />
          <BitmapSprite {...spriteProps} name="teleport-out" sprite={TELEPORT_OUT} repeat={false} />
          <BitmapSprite {...spriteProps} name="teleport-in" sprite={TELEPORT_IN} repeat={false} />
          <BitmapSprite {...spriteProps} name="idle-angry" sprite={IDLE_ANGRY} />
          <BitmapSprite {...spriteProps} name="run-angry" sprite={RUN_ANGRY} />
          <BitmapSprite {...spriteProps} name="stunned-angry" sprite={STUNNED_ANGRY} repeat={false} />
          <BitmapSprite {...spriteProps} name="teleport-out-angry" sprite={TELEPORT_OUT_ANGRY} repeat={false} />
          <BitmapSprite {...spriteProps} name="teleport-in-angry" sprite={TELEPORT_IN_ANGRY} repeat={false} />
        </SpriteSet>
      </Node>
      <Node offset={[-5, -12]}>
        <CollisionBox size={[10, 12]} id={collider} tags={tags} active={active} />
      </Node>
      <Node pos={enemy.pos} offset={[-8, -22]} rounded>
        <Dizzy fsm={fsm} />
      </Node>
    </Node>
  );
};
