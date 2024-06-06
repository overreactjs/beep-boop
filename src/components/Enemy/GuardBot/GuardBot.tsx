import { BitmapSprite, CollisionBox, Node, Size, SpriteSet, useDynamicProperty, useProperty } from "@overreact/engine";
import { usePlatformMovement, useEnemyCollisions, useWrapAround, useEnemyStateMachine, useEnemyAnimation } from "../../../hooks";
import { GuardBotState } from "../../../state";
import { IDLE, IDLE_ANGRY, RUN, RUN_ANGRY, STUNNED, STUNNED_ANGRY } from "./assets";
import { useDeadState, useFallingState, useIdleState, useJumpingState, usePatrolState, useStunnedState, useThinkingState } from "./states";
import { EnemyProps } from "../types";
import { Dizzy } from "../../Dizzy";

export const GuardBot: React.FC<EnemyProps<GuardBotState>> = ({ enemy, collider }) => {
  const { angle, flip, pos, scale, velocity, angry } = enemy;
  const maxFallSpeed = useProperty(0.08);
  const speed = useDynamicProperty(angry, (angry) => angry ? 0.05 : 0.03);
  const animation = useEnemyAnimation(enemy);

  // When the bot leaves the screen, wrap to the other side.
  useWrapAround(enemy);

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
    dead: useDeadState(maxFallSpeed),
  });

  // Derive the collision tags from the state machine, and respond to zap collisions.
  const [tags, active] = useEnemyCollisions(collider, fsm);

  // Common props for all sprites in the sprite set.
  const spriteProps = { size: [16, 16] as Size, flip, angle, scale };

  return (
    <Node pos={pos}>
      <Node offset={[-8, -16]} rounded>
        <SpriteSet animation={animation}>
          <BitmapSprite {...spriteProps} name="idle" sprite={IDLE} />
          <BitmapSprite {...spriteProps} name="run" sprite={RUN} />
          <BitmapSprite {...spriteProps} name="stunned" sprite={STUNNED} repeat={false} />
          <BitmapSprite {...spriteProps} name="idle-angry" sprite={IDLE_ANGRY} />
          <BitmapSprite {...spriteProps} name="run-angry" sprite={RUN_ANGRY} />
          <BitmapSprite {...spriteProps} name="stunned-angry" sprite={STUNNED_ANGRY} repeat={false} />
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
