import { Node, useSync } from "@overreact/engine";
import { useGame } from "../hooks";
import { Item } from "./Item";

export const Items = () => {
  const game = useGame();
  const items = useSync(() => game.current.items);

  return (
    <Node>
      {items.map((item) => (
        <Item key={item.id} item={item} />
      ))}
    </Node>
  );
};
