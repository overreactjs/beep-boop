import { useId } from "react";
import { useOffsetPosition, CollisionBox, Node, VirtualInput, useUpdate, usePlatformMovement, Velocity, useProperty, useVirtualInput, BitmapSprite, usePostCollisions } from "@overreact/engine";
import { ENEMY_1_RUN } from "../assets";
import { useGame, useIntegerPosition } from "../hooks";
import { EnemyState } from "../state";
import { BlockIndicator } from "./BlockIndicator";

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
  const game = useGame();
  const { simulate } = useVirtualInput();

  const pos = useOffsetPosition(enemy.pos, [-8, -16]);
  const collisionPos = useOffsetPosition(enemy.pos, [-6, -16]);
  const spritePos = useIntegerPosition(pos);

  const velocity = useProperty<Velocity>([0, 0]);
  const flip = useProperty(false);
  const collider = useId();

  useUpdate(() => {
    enemy.update(game.current, simulate);
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