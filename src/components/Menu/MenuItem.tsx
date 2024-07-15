import { useContext, useEffect } from "react";
import { Box, Node, Position, Prop, Size, useCachedDynamicProperty, useMergeProperty, useProperty } from "@overreact/engine";
import { ArcadeText } from "../ArcadeText";
import { MenuContext } from "./MenuContext";
import { useMenuItemFlash } from "./useMenuItemFlash";

type MenuItemProps = {
  index: number;
  pos: Position;
  text: Prop<string>;
  hasOptions?: boolean;
};

export const MenuItem: React.FC<MenuItemProps> = ({ index, pos, hasOptions = false, ...props }) => {
  const menu = useContext(MenuContext);

  const text = useProperty(props.text);
  const size = useCachedDynamicProperty(text, (text): Size => [text.length * 8 + 32, 8]);
  
  const isSelected = useCachedDynamicProperty(menu.selected, (selected) => selected === index);
  const flash = useMenuItemFlash(isSelected);

  const label = useMergeProperty(menu.index, text, (active, text) => {
    return active === index ? `${hasOptions ? '←' : '→'} ${text} ${hasOptions ? '→' : '←'}` : `  ${text}  `;
  });

  const color = useMergeProperty(menu.index, flash, (active, flash) => {
    return flash || (active === index ? '#ff0' : '#777');
  });

  useEffect(() => menu.register(index, { hasOptions }), [hasOptions, index, menu]);

  return (
    <Node pos={pos} offset={[-16, 0]}>
      <ArcadeText color="white" text={label} />
      <Box size={size} color={color} className="mix-blend-multiply" />
    </Node>
  );
};
