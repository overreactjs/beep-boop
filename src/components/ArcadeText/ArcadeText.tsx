import { BitmapFontFace, BitmapText, Box, Node, Position, Prop, Size, useCachedDynamicProperty, useDynamicProperty, useElement, usePosition, useProperty, useRender, useSync } from "@overreact/engine";
import { ARCADE_FONT, ARCADE_FONT_BLUE, ARCADE_FONT_GREEN, ARCADE_FONT_RED } from "./assets";
import { useSettings } from "../../hooks";

type ArcadeTextColor = 'white' | 'green' | 'blue' | 'red';

type ArcadeTextProps = {
  color?: ArcadeTextColor;
  pos?: Prop<Position>;
  text: Prop<string>;
}

const FONTS: Record<ArcadeTextColor, BitmapFontFace> = {
  'white': ARCADE_FONT,
  'green': ARCADE_FONT_GREEN,
  'blue': ARCADE_FONT_BLUE,
  'red': ARCADE_FONT_RED,
};

const COLORS: Record<ArcadeTextColor, string> = {
  'white': 'text-[#ffffff]',
  'green': 'text-[#00ff00]',
  'blue': 'text-[#00ffff]',
  'red': 'text-[#ff0000]',
};

export const ArcadeText: React.FC<ArcadeTextProps> = ({ color = 'white', ...props }) => {
  const settings = useSettings();

  const pos = usePosition(props.pos);
  const text = useProperty(props.text);
  const size = useDynamicProperty(text, (text): Size => [text.length * 8, 8]);
  const element = useElement();

  const dyslexiaFont = useSync(() => settings.dyslexiaFont.current);

  useRender(() => {
    element.setText(text.current);
  });

  return (
    <Node pos={pos}>
      {dyslexiaFont ? (
        <Box size={size} color="black" >
          <div ref={element.ref} className={`${COLORS[color]} w-full h-full font-[OpenDyslexicMono] text-[9px] leading-[9px] mt-[-1px] whitespace-pre tracking-[1.4px]`} />
        </Box>
      ) : (
        <BitmapText font={FONTS[color]} text={text} />
      )}
    </Node>
  );
};

type TintedArcadeTextProps = {
  text: Prop<string>;
  pos: Prop<Position>;
  offset?: Prop<Position>;
  color: Prop<string>;
}

export const TintedArcadeText: React.FC<TintedArcadeTextProps> = (props) => {
  const text = useProperty(props.text);
  const pos = useProperty(props.pos);
  const color = useProperty(props.color);
  const offset = useProperty<Position>(props.offset || [0, 0]);
  const size = useCachedDynamicProperty(text, (text): Size => [text.length * 8, 12]);

  return (
    <Node pos={pos} offset={offset}>
      <ArcadeText color="white" text={text} />
      <Node offset={[0, -2]}>
        <Box size={size} color={color} className="mix-blend-multiply" />
      </Node>
    </Node>
  );
};
