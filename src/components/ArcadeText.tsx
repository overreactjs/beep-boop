import { ARCADE_FONT } from "../assets";
import { BitmapTextProps, BitmapText } from "./BitmapText";

export type ArcadeTextProps = Omit<BitmapTextProps, 'font'>;

export const ArcadeText: React.FC<ArcadeTextProps> = ({ pos, color, text }) => {
  return <BitmapText pos={pos} font={ARCADE_FONT} color={color} text={text} />;
};
  