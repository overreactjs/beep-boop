import { BitmapSprite, CollisionBox, Node, Size, SpriteSet, useIntegerPosition, useOffsetPosition, useStateMachine } from "@overreact/engine";
import { usePlatformMovement, useEnemyCollisions, useWrapAround } from "../../hooks";
import { GuardBotState } from "../../state";
import { IDLE, RUN, STUNNED } from "./assets";
import { useDeadState, useFallingState, useIdleState, useJumpingState, usePatrolState, useStunnedState, useThinkingState } from "./states";
import { EnemyProps } from "../Enemy";

export const GuardBot: React.FC<EnemyProps<GuardBotState>> = ({ enemy, collider }) => {
  const { angle, animation, flip, pos, scale, velocity } = enemy;

  const collisionPos = useOffsetPosition(pos, [-5, -12]);
  const spritePos = useIntegerPosition(useOffsetPosition(pos, [-8, -16]));

  // When the bot leaves the screen, wrap to the other side.
  useWrapAround(enemy);

  // Standard platformer physics, attached to the enemy state object.
  const movement = usePlatformMovement(collider, pos, velocity, {
    gravity: [0, 0.0006],
    speed: 0.03,
    jumpStrength: 0.21,
  });

  // Setup the finite state machine, to handle the behaviour of each state.
  const fsm = useStateMachine(enemy, 'idle', {
    idle: useIdleState(),
    falling: useFallingState(movement),
    jumping: useJumpingState(movement),
    patrol: usePatrolState(movement),
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
