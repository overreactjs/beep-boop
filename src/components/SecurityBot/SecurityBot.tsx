import { BitmapSprite, CollisionBox, Node, Size, SpriteSet, useIntegerPosition, useOffsetPosition, useStateMachine } from "@overreact/engine";
import { useBubbleBobbleMovement, useEnemyCollisions, useWrapAround } from "../../hooks";
import { EnemyState } from "../../state";
import { IDLE, RUN, STUNNED } from "./assets";
import { useDeadState, useFallingState, useIdleState, useJumpingState, usePatrolState, useStunnedState, useThinkingState } from "./states";
import { States } from "./types";
import { EnemyProps } from "../Enemy";
import { SecurityBotState } from "../../state/EnemyState";

export const SecurityBot: React.FC<EnemyProps<SecurityBotState>> = ({ enemy, collider }) => {
  const { angle, animation, flip, pos, scale, velocity } = enemy;

  const collisionPos = useOffsetPosition(pos, [-5, -12]);
  const spritePos = useIntegerPosition(useOffsetPosition(pos, [-8, -16]));

  // When the bot leaves the screen, wrap to the other side.
  useWrapAround(enemy);

  // Standard platformer physics, attached to the enemy state object.
  enemy.movement = useBubbleBobbleMovement(collider, pos, velocity, {
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
  const [tags, active] = useEnemyCollisions(collider, fsm);

  // Common props for all sprites in the sprite set.
  const spriteProps = { size: [16, 16] as Size, flip, angle, scale };

  return (
    <Node>
      <SpriteSet animation={animation}>
        <BitmapSprite {...spriteProps} name="idle" pos={spritePos} sprite={IDLE} />
        <BitmapSprite {...spriteProps} name="run" pos={spritePos} sprite={RUN} />
        <BitmapSprite {...spriteProps} name="stunned" pos={spritePos} sprite={STUNNED} repeat={false} />
      </SpriteSet>
      <CollisionBox pos={collisionPos} size={[10, 12]} id={collider} tags={tags} active={active} />
    </Node>
  );
};
