import { BitmapSprite, CollisionBox, Node, Size, SpriteSet, useStateMachine } from "@overreact/engine";
import { usePlatformMovement, useEnemyCollisions, useFlyingMovement, useWrapAround } from "../../../hooks";
import { FlyingBotState } from "../../../state";
import { useDeadState, useIdleState, usePatrolState, useStunnedState } from "./states";
import { IDLE, STUNNED } from "./assets";
import { EnemyProps } from "../types";

export const FlyingBot: React.FC<EnemyProps<FlyingBotState>> = ({ enemy, collider }) => {
  const { angle, animation, flip, pos, scale, velocity } = enemy;

  // When the bot leaves the screen, wrap to the other side.
  useWrapAround(enemy);

  // Standard platformer physics, attached to the enemy state object.
  const flying = useFlyingMovement(collider, pos, velocity, { enabled: true });
  const platform = usePlatformMovement(collider, pos, velocity, { enabled: false });

  // Setup the finite state machine, to handle the behaviour of each state.
  const fsm = useStateMachine(enemy, 'idle', {
    idle: useIdleState(),
    patrol: usePatrolState(flying),
    stunned: useStunnedState(),
    dead: useDeadState(flying, platform),
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
          <BitmapSprite {...spriteProps} name="stunned" sprite={STUNNED} repeat={false} />
        </SpriteSet>
      </Node>
      <Node offset={[-6, -14]}>
        <CollisionBox size={[12, 12]} id={collider} tags={tags} active={active} />
      </Node>
    </Node>
  );
};
