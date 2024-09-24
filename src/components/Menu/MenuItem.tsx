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
  arrows?: [string, string];
  align?: 'left' | 'right';
};

export const MenuItem: React.FC<MenuItemProps> = ({ index, pos, arrows, hasOptions = false, ...props }) => {
  const menu = useContext(MenuContext);

  const text = useProperty(props.text);
  const size = useCachedDynamicProperty(text, (text): Size => [text.length * 8 + 32, 12]);
  const align = useProperty(props.align || 'left');
  
  const selected = useCachedDynamicProperty(menu.selected, (selected) => selected === index);
  const flash = useMenuItemFlash(selected);

  const label = useMergeProperty(menu.index, text, (active, text) => {
    const [left, right] = arrows ?? (hasOptions ? ['<', '>'] : ['>', '<']);
    return active === index ? `${left} ${text} ${right}` : `  ${text}  `;
  });

  const color = useMergeProperty(menu.index, flash, (active, flash) => {
    return flash || (active === index ? '#ff0' : '#777');
  });

  const offset = useMergeProperty(text, align, (text, align): Position => [-16 - (align === 'left' ? 0 : text.length * 8), 0]);

  useEffect(() => menu.register(index, { hasOptions }), [hasOptions, index, menu]);

  return (
    <Node pos={pos} offset={offset}>
      <ArcadeText color="white" text={label} />
      <Node offset={[0, -2]}>
        <Box size={size} color={color} className="mix-blend-multiply" />
      </Node>
    </Node>
  );
};
