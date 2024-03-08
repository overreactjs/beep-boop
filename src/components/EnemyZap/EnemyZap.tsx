import { useOffsetPosition, useUpdate, useTaggedCollision, CollisionBox, Node, BitmapSprite } from "@overreact/engine";
import { useId } from "react";
import { useGame } from "../../hooks";
import { EnemyZapState } from "../../state";
import { ZAP_SPRITE } from "./assets";

type EnemyZapProps = {
  zap: EnemyZapState;
}

export const EnemyZap: React.FC<EnemyZapProps> = ({ zap }) => {
  const game = useGame();

  const spritePos = useOffsetPosition(zap.pos, [-8, -4]);
  const colliderPos = useOffsetPosition(zap.pos, [-4, -4]);
  const collider = useId();

  useUpdate((delta) => {
    zap.pos.current[0] += delta / 20 * zap.direction;
  });

  useTaggedCollision(collider, 'solid', () => {
    game.destroyZap(zap);
  });

  useTaggedCollision(collider, 'player', () => {
    game.destroyZap(zap);
  });

  return (
    <Node>
      <BitmapSprite pos={spritePos} size={[16, 8]} sprite={ZAP_SPRITE} />
      <CollisionBox pos={colliderPos} size={[8, 8]} id={collider} tags={['enemyZap']} />
    </Node>
  );
};