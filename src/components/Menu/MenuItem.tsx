import { useContext, useEffect } from "react";
import { Position, Prop, useCachedDynamicProperty, useMergeProperty, useProperty } from "@overreact/engine";
import { TintedArcadeText } from "../ArcadeText";
import { MenuContext } from "./MenuContext";
import { useMenuItemFlash } from "./useMenuItemFlash";

export type MenuItemProps = {
  index: number;
  pos: Position;
  text: Prop<string>;
  hasOptions?: boolean;
  arrows?: [string, string];
  align?: 'left' | 'right';
};

export const MenuItem: React.FC<MenuItemProps> = ({ index, pos, arrows, hasOptions = false, ...props }) => {
  const menu = useContext(MenuContext);
  useEffect(() => menu.register(index, { hasOptions }), [hasOptions, index, menu]);

  const text = useProperty(props.text);
  const align = useProperty(props.align || 'left');
  
  const selected = useCachedDynamicProperty(menu.selected, (selected) => selected === index);
  const flash = useMenuItemFlash(selected);

  const label = useMergeProperty(menu.index, text, (active, text) => {
    const [left, right] = arrows ?? (hasOptions ? ['<', '>'] : ['>', '<']);
    return active === index ? `${left} ${text} ${right}` : `  ${text}  `;
  });

  const color = useMergeProperty(menu.index, flash, (active, flash) => {
    return flash || (active === index ? '#ff0' : '#888');
  });

  const offset = useMergeProperty(text, align, (text, align): Position => {
    return [-16 - (align === 'left' ? 0 : text.length * 8), 0];
  });

  return <TintedArcadeText text={label} pos={pos} offset={offset} color={color} />;
};
