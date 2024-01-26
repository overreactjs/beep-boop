import { useCallback } from "react";
import { useProperty, Position, useDynamicProperty, useUpdate, BitmapImage } from "@overreact/engine";
import { POINTS_IMAGE } from "../assets";
import { useGame } from "../hooks";
import { PointsState } from "../state";
import { PointsValue } from "../types";

const OFFSETS: Record<PointsValue, number> = {
  50: 0,
  100: 16,
  200: 32,
  300: 48,
  400: 64,
  500: 80,
  600: 96,
  700: 112,
  800: 128,
  900: 144,
  1000: 160,
  2000: 176,
  3000: 192,
  4000: 208,
  5000: 224,
  6000: 240,
  7000: 256,
  8000: 272,
  9000: 288,
  10000: 304,
};

type PointsProps = {
  points: PointsState;
}

export const Points: React.FC<PointsProps> = ({ points }) => {
  const { pos, value } = points;
  const game = useGame();
  const age = useProperty(0);

  const fn = useCallback((age: number): Position => {
    return [pos.current[0] - 12, Math.round(pos.current[1] - 12 - Math.min(20, age))];
  }, [pos]);

  const imagePos = useDynamicProperty(age, fn);

  useUpdate((delta) => {
    age.current += delta / 40;

    if (age.current >= 40) {
      game.current.hidePoints(points.id);
    }
  });
  
  return <BitmapImage pos={imagePos} image={POINTS_IMAGE} size={[24, 12]} offset={[0, OFFSETS[value]]} />;
};
