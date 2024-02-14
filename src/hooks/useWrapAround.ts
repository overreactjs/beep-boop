import { useUpdate } from "@overreact/engine";
import { PositionedObjectState } from "../state/PositionedObjectState";
import { useLevel } from "./useGame";

export const useWrapAround = (entity: PositionedObjectState) => {
  const level = useLevel();

  useUpdate(() => {
    const threshold = level.current * 200 + 16;

    if (entity.pos.current[1] >= threshold) {
      entity.pos.current[1] -= 216;
    } else if (entity.pos.current[1] <= threshold - 200) {
      entity.pos.current[1] += 216;
    }
  });
};
