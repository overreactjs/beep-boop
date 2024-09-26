import React, { useContext, useEffect } from "react";
import { Box, clamp, Node, Prop, Size, useDynamicProperty, useProperty } from "@overreact/engine";
import { TintedArcadeText } from "../ArcadeText";
import { MenuContext } from "./MenuContext";
import { MenuItemProps } from "./MenuItem";

type MenuItemBarProps = Pick<MenuItemProps, 'index' | 'pos'> & {
  value: Prop<number>;
};

export const MenuItemBar: React.FC<MenuItemBarProps> = ({ index, pos, ...props }) => {
  const menu = useContext(MenuContext);
  useEffect(() => menu.register(index, { hasOptions: true }), [index, menu]);

  const label = useDynamicProperty(menu.index, (active) => {
    return active === index ? `<          >` : `            `;
  });

  const color = useDynamicProperty(menu.index, (active) => {
    return active === index ? '#ff0' : '#888';
  });

  const value = useProperty(props.value);
  const size = useDynamicProperty(value, (value): Size => {
    return [clamp(value, 0, 1) * 60, 4];
  })

  return (
    <Node pos={pos}>
      <TintedArcadeText text={label} color={color} />
      <Node offset={[16, 0]}>
        <Box size={[64, 8]} color={color} />
        <Node offset={[1, 1]}>
          <Box size={[62, 6]} color="#000" />
        </Node>
        <Node offset={[2, 2]}>
          <Box size={size} color={color} />
        </Node>
      </Node>
    </Node>
  );
};
