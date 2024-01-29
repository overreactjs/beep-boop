import { useOffsetPosition, usePosition, useUpdate, useTaggedCollision, BitmapImage, CollisionBox, Node } from "@overreact/engine";
import { useId } from "react";
import { ZAP_IMAGE } from "../assets";
import { useGame } from "../hooks";
import { ZapState } from "../state";

type ZapProps = {
  zap: ZapState;
}

export const Zap: React.FC<ZapProps> = ({ zap }) => {
  const game = useGame();
  const pos = useOffsetPosition(usePosition(zap.pos), [-4, -4]);
  const collider = useId();

  useUpdate((delta) => {
    zap.pos.current[0] += delta / 8 * zap.direction;
  });

  useTaggedCollision(collider, 'solid', () => {
    game.current.destroyZap(zap);
  });

  useTaggedCollision(collider, 'enemy', () => {
    game.current.destroyZap(zap);
  });

  return (
    <Node pos={pos}>
      <BitmapImage size={[8, 8]} offset={[0, 0]} image={ZAP_IMAGE} />
      <CollisionBox size={[8, 8]} id={collider} tags={['zap']} />
    </Node>
  );
};