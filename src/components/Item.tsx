import { BitmapImage, CollisionBox, Node, useOffsetPosition, usePosition, useTaggedCollision } from "@overreact/engine";
import { ITEM_IMAGE } from "../assets";
import { useId } from "react";
import { ITEMS } from "../data/items";
import { ItemState } from "../state";
import { useGame } from "../hooks";

export type ItemProps = {
  item: ItemState;
};

export const Item: React.FC<ItemProps> = ({ item }) => {
  const game = useGame();
  const pos = usePosition(item.pos);
  const spritePos = useOffsetPosition(pos, [-8, -16]);
  const collider = useId();

  useTaggedCollision(collider, 'player', () => {
    game.current.collectItem(item);
  });
  
  return (
    <Node pos={pos}>
      <BitmapImage pos={spritePos} size={[16, 16]} offset={ITEMS[item.type].offset} image={ITEM_IMAGE} />
      <CollisionBox pos={spritePos} size={[16, 16]} id={collider} />
    </Node>
  );
};
