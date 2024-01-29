import { useId } from "react";
import { BitmapSprite, CollisionBox, Node, useDynamicProperty, useOffsetPosition, usePlatformMovement } from "@overreact/engine";
import { ENEMY_1_RUN } from "../../../assets";
import { useIntegerPosition, useStateMachine } from "../../../hooks";
import { EnemyState } from "../../../state";
import { BlockIndicator } from "../../BlockIndicator";
import { useIdleBehaviour } from "./useIdleBehaviour";
import { usePatrolBehaviour } from "./usePatrolBehaviour";
import { useFallingBehaviour } from "./useFallingBehaviour";
import { States } from "./types";

type StandardBotProps = {
  enemy: EnemyState;
}

export const StandardBot: React.FC<StandardBotProps> = ({ enemy }) => {
  const pos = useOffsetPosition(enemy.pos, [-8, -16]);
  const collisionPos = useOffsetPosition(enemy.pos, [-6, -16]);
  const spritePos = useIntegerPosition(pos);

  const flip = useDynamicProperty(enemy.direction, (direction) => direction === 'left');
  const collider = useId();

  enemy.movement = usePlatformMovement(collider, enemy.pos, enemy.velocity, {
    gravity: [0, 0.0004],
    speed: 0.03,
    jumpStrength: 0.165,
  });

  useStateMachine<States, EnemyState>(enemy, 'idle', {
    idle: useIdleBehaviour(),
    falling: useFallingBehaviour(),
    patrol: usePatrolBehaviour(),
  });

  return (
    <Node>
      <BitmapSprite pos={spritePos} size={[16, 16]} sprite={ENEMY_1_RUN} flip={flip} />
      <CollisionBox pos={collisionPos} size={[12, 16]} id={collider} tags={['enemy']} />
      <BlockIndicator pos={enemy.block} />
    </Node>
  )
};
