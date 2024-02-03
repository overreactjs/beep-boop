import { BitmapFontFace, BitmapText, Position, Prop } from "@overreact/engine";
import { ARCADE_FONT, ARCADE_FONT_BLUE, ARCADE_FONT_GREEN, ARCADE_FONT_RED } from "./assets";

type ArcadeTextColor = 'white' | 'green' | 'blue' | 'red';

type ArcadeTextProps = {
  color?: ArcadeTextColor;
  pos: Prop<Position>;
  text: Prop<string>;
}

const FONTS: Record<ArcadeTextColor, BitmapFontFace> = {
  'white': ARCADE_FONT,
  'green': ARCADE_FONT_GREEN,
  'blue': ARCADE_FONT_BLUE,
  'red': ARCADE_FONT_RED,
};

export const ArcadeText: React.FC<ArcadeTextProps> = ({ color = 'white', pos, text }) => {
  return <BitmapText pos={pos} font={FONTS[color]} text={text} />;
};
  