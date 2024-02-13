import { BitmapSprite, CollisionBox, Node, Size, SpriteSet, useIntegerPosition, useOffsetPosition, useStateMachine } from "@overreact/engine";
import { useEnemyCollisions, useFlyingMovement, useWrapAround } from "../../hooks";
import { EnemyState, FlyingBotState } from "../../state";
import { useDeadState, useIdleState, usePatrolState, useStunnedState } from "./states";
import { States } from "./types";
import { EnemyProps } from "../Enemy";
import { IDLE, STUNNED } from "./assets";

export const FlyingBot: React.FC<EnemyProps<FlyingBotState>> = ({ enemy, collider }) => {
  const { angle, animation, flip, pos, scale, velocity } = enemy;

  const collisionPos = useOffsetPosition(pos, [-6, -14]);
  const spritePos = useIntegerPosition(useOffsetPosition(pos, [-8, -16]));

  // When the bot leaves the screen, wrap to the other side.
  useWrapAround(enemy);

  // Standard platformer physics, attached to the enemy state object.
  enemy.movement = useFlyingMovement(collider, pos, velocity);

  // Setup the finite state machine, to handle the behaviour of each state.
  const fsm = useStateMachine<States, EnemyState>(enemy, 'idle', {
    idle: useIdleState(),
    patrol: usePatrolState(),
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
        <BitmapSprite {...spriteProps} name="stunned" pos={spritePos} sprite={STUNNED} repeat={false} />
      </SpriteSet>
      <CollisionBox pos={collisionPos} size={[12, 12]} id={collider} tags={tags} active={active} />
    </Node>
  );
};
