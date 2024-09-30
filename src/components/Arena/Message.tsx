import { Box, Node, Position, Property, useDynamicProperty, useFlash, useProperty, useUpdate } from "@overreact/engine";
import { ArcadeText } from "../ArcadeText";
import { useGame } from "../../hooks";

type MessageProps = {
text: string;
  color1: string;
  color2: string;
  condition: Property<boolean>;
};

export const Message: React.FC<MessageProps> = ({ text, color1, color2, condition }) => {
  const width = text.length * 8;
  const x = (256 - Math.ceil(width / 16) * 16) / 2;

  const game = useGame();
  const pos = useProperty<Position>([x, 0]);
  const flash = useFlash(100);
  const color = useDynamicProperty(flash, (flash) => flash ? color1 : color2);

  useUpdate((delta) => {
    if (!condition.current) {
      pos.current = [x, 200];
    } else if (!game.paused.current) {
      pos.current[1] -= delta / 16;
    }
  });

  return (
    <Node pos={pos} rounded>
      <ArcadeText text={text} />
      <Box size={[width, 8]} color={color} className="mix-blend-multiply" />
    </Node>
  );
};
