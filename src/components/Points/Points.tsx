import { useProperty, Position, useDynamicProperty, useUpdate, BitmapImage } from "@overreact/engine";
import { useGame } from "../../hooks";
import { PointsState } from "../../state";
import { POINTS_IMAGE } from "./assets";
import { OFFSETS } from "./constants";

type PointsProps = {
  points: PointsState;
}

export const Points: React.FC<PointsProps> = ({ points }) => {
  const { pos, value } = points;
  const game = useGame();
  const age = useProperty(0);

  const imagePos = useDynamicProperty(age, (age: number): Position => {
    return [pos.current[0] - 12, Math.round(pos.current[1] - 14 - Math.min(20, age))];
  });

  useUpdate((delta) => {
    age.current += delta / 40;

    if (age.current >= 40) {
      game.current.hidePoints(points.id);
    }
  });
  
  return <BitmapImage pos={imagePos} image={POINTS_IMAGE} size={[24, 12]} offset={[0, OFFSETS[value]]} />;
};
