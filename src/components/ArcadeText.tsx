import { BitmapText, Position, Prop } from "@overreact/engine";
import { ARCADE_FONT } from "../assets";

type ArcadeTextProps = {
  pos: Prop<Position>;
  color?: Prop<string>;
  text: Prop<string>;
}

export const ArcadeText: React.FC<ArcadeTextProps> = ({ pos, color, text }) => {
  return <BitmapText pos={pos} font={ARCADE_FONT} color={color} text={text} />;
};
  