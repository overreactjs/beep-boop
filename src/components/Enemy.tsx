import { useId } from "react";
import { useOffsetPosition, usePosition, CollisionBox, Node, VirtualInput, useUpdate, usePlatformMovement, Velocity, useProperty, useVirtualInput, useFixedUpdate, BitmapSprite } from "@overreact/engine";
import { EnemyState } from "../state/EnemyState";
import { useIntegerPosition } from "../hooks";
import { ENEMY_1_RUN } from "../assets";

type EnemyProps = {
  enemy: EnemyState;
}

export const Enemy: React.FC<EnemyProps> = ({ enemy }) => {
  return (
    <VirtualInput>
      <EnemyInner enemy={enemy} />
    </VirtualInput>
  );
};

const EnemyInner: React.FC<EnemyProps> = ({ enemy }) => {
  const { simulate } = useVirtualInput();

  const pos = usePosition(enemy.pos);
  const collisionPos = useOffsetPosition(pos, [-8, -16]);
  const spritePos = useIntegerPosition(collisionPos);

  const velocity = useProperty<Velocity>([0, 0]);
  const direction = useProperty<'left' | 'right'>('right');
  const flip = useProperty(false);
  const collider = useId();

  useUpdate(() => {
    if (direction.current === 'left') {
      simulate('left');
    } else {
      simulate('right');
    }
  });

  usePlatformMovement(collider, pos, velocity, {
    gravity: [0, 0.0004],
    speed: 0.04,
    jumpStrength: 0.165,
  });

  useFixedUpdate(0.5, () => {
    direction.current = direction.current === 'left' ? 'right' : 'left';
  });

  useUpdate(() => {
    flip.current = direction.current === 'left';
  })

  return (
    <Node>
      <BitmapSprite pos={spritePos} size={[16, 16]} sprite={ENEMY_1_RUN} flip={flip} />
      <CollisionBox pos={collisionPos} size={[16, 16]} id={collider} tags={['enemy']} />
    </Node>
  )
};