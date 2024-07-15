import { useContext } from "react";
import { Box, Node, Position, useCachedDynamicProperty } from "@overreact/engine";
import { MenuContext } from "./MenuContext";
import { ArcadeText } from "../ArcadeText";

type MenuLabelProps = {
  index: number;
  pos: Position;
  text: string;
}

export const MenuLabel: React.FC<MenuLabelProps> = ({ index, pos, text }) => {
  const menu = useContext(MenuContext);
  
  const color = useCachedDynamicProperty(menu.index, (active) => {
    return active === index ? '#fff' : '#777';
  });

  return (
    <Node pos={pos}>
      <ArcadeText color="white" text={text} />
      <Box size={[text.length * 8, 8]} color={color} className="mix-blend-multiply" />
    </Node>
  );
};

type MenuStaticProps = {
  pos: Position;
  text: string;
  color: string;
}

export const MenuStatic: React.FC<MenuStaticProps> = ({ pos, text, color }) => {
  return (
    <Node pos={pos}>
      <ArcadeText color="white" text={text} />
      <Box size={[text.length * 8, 8]} color={color} className="mix-blend-multiply" />
    </Node>
  );
}