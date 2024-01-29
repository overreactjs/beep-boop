import { useId } from "react";
import { BitmapSprite, CollisionBox, Node, Velocity, useOffsetPosition, usePlatformMovement, usePostCollisions, useProperty } from "@overreact/engine";
import { ENEMY_1_RUN } from "../../../assets";
import { useIntegerPosition, useStateMachine } from "../../../hooks";
import { EnemyState } from "../../../state";
import { BlockIndicator } from "../../BlockIndicator";
import { useIdleBehaviour } from "./useIdleBehaviour";
import { usePatrolBehaviour } from "./usePatrolBehaviour";

type StandardBotProps = {
  enemy: EnemyState;
}

export const StandardBot: React.FC<StandardBotProps> = ({ enemy }) => {
  const pos = useOffsetPosition(enemy.pos, [-8, -16]);
  const collisionPos = useOffsetPosition(enemy.pos, [-6, -16]);
  const spritePos = useIntegerPosition(pos);

  const velocity = useProperty<Velocity>([0, 0]);
  const flip = useProperty(false);
  const collider = useId();

  useStateMachine(enemy, {
    idle: useIdleBehaviour(),
    patrol: usePatrolBehaviour(),
  });

  usePlatformMovement(collider, enemy.pos, velocity, {
    gravity: [0, 0.0004],
    speed: 0.03,
    jumpStrength: 0.165,
  });

  usePostCollisions(() => {
    flip.current = enemy.direction.current === 'left';
  });

  return (
    <Node>
      <BitmapSprite pos={spritePos} size={[16, 16]} sprite={ENEMY_1_RUN} flip={flip} />
      <CollisionBox pos={collisionPos} size={[12, 16]} id={collider} tags={['enemy']} />
      <BlockIndicator pos={enemy.block} />
    </Node>
  )
};
