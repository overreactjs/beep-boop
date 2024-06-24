import { BitmapSprite, Position, Prop, usePosition } from "@overreact/engine"
import { SPINNER } from "./assets";

type SpinnerProps = {
  pos?: Prop<Position>;
}

export const Spinner: React.FC<SpinnerProps> = (props) => {
  const pos = usePosition(props.pos);

  return (
    <BitmapSprite sprite={SPINNER} size={[16, 16]} pos={pos} />
  );
};
