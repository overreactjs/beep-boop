import { useContext } from "react";
import { Box, Node, Position, useCachedDynamicProperty, useMergeProperty, useProperty } from "@overreact/engine";
import { ArcadeText } from "../ArcadeText";
import { MenuContext } from "./MenuContext";
import { useMenuItemFlash } from "./useMenuItemFlash";

type MenuItemProps = {
  index: number;
  pos: Position;
  text: string;
};

export const MenuItem: React.FC<MenuItemProps> = ({ index, pos, ...props }) => {
  const menu = useContext(MenuContext);
  const width = props.text.length * 8 + 32;

  const isSelected = useCachedDynamicProperty(menu.selected, (selected) => selected === index);
  const flash = useMenuItemFlash(isSelected);

  const text = useMergeProperty(menu.index, useProperty(props.text), (active, text) => {
    return active === index ? `→ ${text} ←` : `  ${text}  `;
  });

  const color = useMergeProperty(menu.index, flash, (active, flash) => {
    return flash || (active === index ? '#ff0' : '#777');
  });

  return (
    <Node pos={pos} offset={[-16, 0]}>
      <ArcadeText color="white" text={text} />
      <Box size={[width, 8]} color={color} className="mix-blend-multiply" />
    </Node>
  );
};
