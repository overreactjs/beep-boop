import { useContext } from "react";
import { Position, useCachedDynamicProperty } from "@overreact/engine";
import { MenuContext } from "./MenuContext";
import { TintedArcadeText } from "../ArcadeText";

type MenuLabelProps = {
  index: number;
  pos: Position;
  text: string;
}

export const MenuLabel: React.FC<MenuLabelProps> = ({ index, pos, text }) => {
  const menu = useContext(MenuContext);
  const color = useCachedDynamicProperty(menu.index, (active) => active === index ? '#fff' : '#888');
  return <TintedArcadeText text={text} pos={pos} color={color} />;
};

type MenuStaticProps = {
  pos: Position;
  text: string;
  color: string;
}

export const MenuStatic: React.FC<MenuStaticProps> = ({ pos, text, color }) => {
  return <TintedArcadeText text={text} pos={pos} color={color} />;
}