import { useProperty, Position, useDynamicProperty, useUpdate, BitmapImage } from "@overreact/engine";
import { useGame } from "../../hooks";
import { PointsState } from "../../state";
import { POINTS_IMAGE } from "./assets";
import { OFFSETS } from "./constants";

type PointsProps = {
  points: PointsState;
}

export const Points: React.FC<PointsProps> = ({ points }) => {
  const { pos, label } = points;
  const game = useGame();
  const age = useProperty(0);

  const imagePos = useDynamicProperty(age, (age: number): Position => {
    return [
      Math.round(pos.current[0] - 24),
      Math.round(pos.current[1] - 14 - Math.min(16, age)),
    ];
  });

  useUpdate((delta) => {
    age.current += delta / 40;

    if (age.current >= 32) {
      game.hidePoints(points.id);
    }
  });
  
  return <BitmapImage pos={imagePos} image={POINTS_IMAGE} size={[48, 12]} offset={[0, OFFSETS[label]]} />;
};
