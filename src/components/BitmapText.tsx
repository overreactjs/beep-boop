import { Prop, Position, useProperty, usePosition, useDynamicProperty, Size, useSync, Box, BitmapImage } from "@overreact/engine";
import { BitmapFontFace } from "../assets";

export type BitmapTextProps = {
  font: BitmapFontFace;
  pos: Prop<Position>;
  color?: Prop<string>;
  text: Prop<string>;
}

export const BitmapText: React.FC<BitmapTextProps> = ({ font, ...props }) => {
  const { image, glyphSize, glyphs } = font;
  const text = useProperty(props.text);
  const pos = usePosition(props.pos);
  const size = useDynamicProperty(text, (text): Size => [text.length * glyphSize[0], glyphSize[1]]);
  const color = useProperty(props.color || 'white');

  const characters = useSync((): string => text.current);

  return (
    <Box pos={pos} size={size} color={color}>
      {[...characters].map((char, index) => {
        const key = `${index}_${char}`;
        const size = glyphSize;
        const pos: Position = [index * size[0], 0];
        const charOffset = glyphs.indexOf(char) * size[0];
        const offset: Position = [
          charOffset % image.size[0],
          Math.floor(charOffset / image.size[0]) * size[1],
        ];

        return <BitmapImage key={key} pos={pos} size={size} offset={offset} image={image} />;
      })}
    </Box>
  );
};
