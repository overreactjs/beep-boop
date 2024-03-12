import { BitmapSprite, CollisionBox, Node, Size, SpriteSet, useStateMachine } from "@overreact/engine";
import { usePlatformMovement, useEnemyCollisions, useWrapAround } from "../../../hooks";
import { RollingBotState } from "../../../state";
import { IDLE, ROLLING, JUMPING } from "./assets";
import { EnemyProps } from "../Enemy";
import { useChargeState, useDeadState, useIdleState, useJumpingState, usePatrolState, useStunnedState, useSurveyState } from "./state";

export const RollingBot: React.FC<EnemyProps<RollingBotState>> = ({ enemy, collider }) => {
  const { angle, animation, flip, pos, scale, velocity } = enemy;

  // When the bot leaves the screen, wrap to the other side.
  useWrapAround(enemy);

  // Standard platformer physics, attached to the enemy state object.
  const movement = usePlatformMovement(collider, pos, velocity, {
    gravity: [0, 0.0003],
    speed: enemy.speed,
    jumpStrength: 0.10,
  });

  // Setup the finite state machine, to handle the behaviour of each state.
  const fsm = useStateMachine(enemy, 'idle', {
    idle: useIdleState(),
    patrol: usePatrolState(movement),
    survey: useSurveyState(),
    charge: useChargeState(movement),
    jump: useJumpingState(movement),
    stunned: useStunnedState(movement),
    dead: useDeadState(),
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
          <BitmapSprite {...spriteProps} name="rolling" sprite={ROLLING} />
          <BitmapSprite {...spriteProps} name="jumping" sprite={JUMPING} repeat={false} />
        </SpriteSet>
      </Node>
      <Node offset={[-6, -12]}>
        <CollisionBox size={[12, 12]} id={collider} tags={tags} active={active} />
      </Node>
    </Node>
  );
};
