import { BitmapSprite, CollisionBox, Node, Size, SpriteSet, useIntegerPosition, useOffsetPosition, useStateMachine } from "@overreact/engine";
import { usePlatformMovement, useEnemyCollisions, useWrapAround } from "../../hooks";
import { GuardBotState } from "../../state";
import { IDLE, ROLLING, JUMPING } from "./assets";
import { EnemyProps } from "../Enemy";
import { useChargeState, useDeadState, useIdleState, usePatrolState, useStunnedState, useSurveyState } from "./state";

export const GuardBot: React.FC<EnemyProps<GuardBotState>> = ({ enemy, collider }) => {
  const { angle, animation, flip, pos, scale, velocity } = enemy;

  const collisionPos = useOffsetPosition(pos, [-6, -12]);
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
    patrol: usePatrolState(movement),
    survey: useSurveyState(),
    charge: useChargeState(),
    stunned: useStunnedState(),
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
        <BitmapSprite {...spriteProps} name="rolling" pos={spritePos} sprite={ROLLING} />
        <BitmapSprite {...spriteProps} name="jumping" pos={spritePos} sprite={JUMPING} repeat={false} />
      </SpriteSet>
      <CollisionBox pos={collisionPos} size={[12, 12]} id={collider} tags={tags} active={active} />
    </Node>
  );
};
