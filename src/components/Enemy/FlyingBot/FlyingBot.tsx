import { BitmapSprite, CollisionBox, Node, Size, SpriteSet, useProperty } from "@overreact/engine";
import { usePlatformMovement, useEnemyCollisions, useFlyingMovement, useWrapAround, useEnemyStateMachine, useEnemyAnimation, useBitmapPreload } from "../../../hooks";
import { FlyingBotState } from "../../../state";
import { useDeadState, useIdleState, usePatrolState, useStunnedState } from "./states";
import { IDLE, IDLE_ANGRY, STUNNED, STUNNED_ANGRY } from "./assets";
import { EnemyProps } from "../types";
import { Dizzy } from "../../Dizzy";

export const FlyingBot: React.FC<EnemyProps<FlyingBotState>> = ({ enemy, collider }) => {
  const { angle, flip, pos, scale, velocity } = enemy;
  const maxFallSpeed = useProperty(0.2);
  const animation = useEnemyAnimation(enemy);

  // Preload all images.
  useBitmapPreload([IDLE, IDLE_ANGRY, STUNNED, STUNNED_ANGRY]);

  // When the bot leaves the screen, wrap to the other side.
  useWrapAround(enemy);

  // Standard platformer physics, attached to the enemy state object.
  const flying = useFlyingMovement(collider, pos, velocity, { enabled: true });
  const platform = usePlatformMovement(collider, pos, velocity, { enabled: false, maxFallSpeed });

  // Setup the finite state machine, to handle the behaviour of each state.
  const fsm = useEnemyStateMachine(enemy, {
    idle: useIdleState(),
    patrol: usePatrolState(flying),
    stunned: useStunnedState(),
    dead: useDeadState(maxFallSpeed, flying, platform),
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
          <BitmapSprite {...spriteProps} name="idle-angry" sprite={IDLE_ANGRY} />
          <BitmapSprite {...spriteProps} name="stunned-angry" sprite={STUNNED_ANGRY} repeat={false} />
        </SpriteSet>
      </Node>
      <Node offset={[-5, -13]}>
        <CollisionBox size={[10, 10]} id={collider} tags={tags} active={active} />
      </Node>
      <Node pos={enemy.pos} offset={[-8, -22]} rounded>
        <Dizzy fsm={fsm} />
      </Node>
    </Node>
  );
};
