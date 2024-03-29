import { useId } from "react";
import { BitmapImage, BitmapSprite, Box, CollisionBox, Node, Size, useCachedDynamicProperty, useElement, useRender, useUpdate } from "@overreact/engine";
import { ITEMS } from "../../data";
import { ItemState } from "../../state";
import { ITEM_IMAGE, MYSTERY_SPRITE } from "./assets";

const SIZE: Size = [16, 16];

export type ItemProps = {
  item: ItemState;
};

export const Item: React.FC<ItemProps> = ({ item }) => {
  const active = useCachedDynamicProperty(item.state, (state) => state === 'landed');
  const collider = useId();

  const fallingElement = useElement();
  const landedElement = useElement();

  useUpdate((delta) => {
    if (item.state.current === 'falling') {
      item.pos.current[1] += delta / 16;
    }

    if (item.pos.current[1] >= item.target.current[1]) {
      item.pos.current[1] = item.target.current[1];
      item.state.current = 'landed';
    }
  });

  useRender(() => {
    if (item.state.invalidated) {
      fallingElement.setStyle('display', item.state.current === 'falling' ? 'block' : 'none');
      landedElement.setStyle('display', item.state.current === 'landed' ? 'block' : 'none');
      item.state.invalidated = false;
    }
  });
  
  return (
    <Node pos={item.pos} offset={[-8, -16]} rounded>
      <Box element={fallingElement} size={SIZE}>
        <BitmapSprite pos={[0, 0]} size={SIZE} sprite={MYSTERY_SPRITE} />  
      </Box>
      <Box element={landedElement} size={SIZE}>
        <BitmapImage pos={[0, 0]} size={SIZE} offset={ITEMS[item.type].offset} image={ITEM_IMAGE} />
      </Box>
      <CollisionBox size={SIZE} id={collider} active={active} tags={['item']} entity={item} />
    </Node>
  );
};
