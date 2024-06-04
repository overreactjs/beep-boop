import { BitmapImage, Node, Position, Prop, Size, useDynamicProperty, usePosition, useProperty } from "@overreact/engine"
import { BACKGROUND_IMAGE, LIGHTS_IMAGE } from "./assets";

type HealthBarProps = {
  pos?: Prop<Position>;
  health?: Prop<number>;
};

export const HealthBar: React.FC<HealthBarProps> = (props) => {
  const pos = usePosition(props.pos);
  const health = useProperty(props.health || 15);

  const size = useDynamicProperty(health, (health): Size => {
    return [health * 5, 12];
  });

  return (
    <Node pos={pos} offset={[-48, 0]}>
      <BitmapImage size={[96, 16]} offset={[0, 0]} image={BACKGROUND_IMAGE} />
      <Node offset={[11, 2]}>
        <BitmapImage size={size} offset={[0, 0]} image={LIGHTS_IMAGE} />
      </Node>
    </Node>
  );
};
