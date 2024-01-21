import { Prop, Position, useProperty, usePosition, useDynamicProperty, Size, useSync, Box, BitmapImage } from "@overreact/engine";
import { BitmapFontFace } from "../assets";

export type BitmapTextProps = {
  font: BitmapFontFace;
  pos: Prop<Position>;
  color?: Prop<string>;
  text: Prop<string>;
}

export const BitmapText: React.FC<BitmapTextProps> = ({ font, ...props }) => {
  const text = useProperty(props.text);
  const pos = usePosition(props.pos);
  const size = useDynamicProperty(text, (text): Size => [text.length * font.characterSize[0], font.characterSize[1]]);
  const color = useProperty(props.color || 'white');

  const characters = useSync((): string => text.current);

  return (
    <Box pos={pos} size={size} color={color}>
      {[...characters].map((char, index) => {
        const key = `${index}_${char}`;
        const size = font.characterSize;
        const pos: Position = [index * size[0], 0];
        const charOffset = font.characters.indexOf(char) * size[0];
        const offset: Position = [
          charOffset % font.image.size[0],
          Math.floor(charOffset / font.image.size[0]) * size[1],
        ];

        return <BitmapImage key={key} pos={pos} size={size} offset={offset} image={font.image} />;
      })}
    </Box>
  );
};
