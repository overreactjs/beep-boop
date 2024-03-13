import { BitmapImage, Node, Position, Prop, Size, useDynamicProperty, usePosition, useProperty } from "@overreact/engine";
import { LIVES_IMAGE } from "./assets";

type LivesProp = {
  pos: Prop<Position>;
  lives: Prop<number>;
};

export const Lives: React.FC<LivesProp> = (props) => {
  const pos = usePosition(props.pos);
  const lives = useProperty(props.lives);

  const size = useDynamicProperty(lives, (lives): Size => [lives * 8, 8]);

  return (
    <Node pos={pos}>
      <BitmapImage image={LIVES_IMAGE} size={[40, 8]} offset={[0, 16]} />
      <BitmapImage image={LIVES_IMAGE} size={size} offset={[0, 0]} />
    </Node>
  );
};
