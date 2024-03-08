import { useUpdate } from "@overreact/engine";
import { EntityObjectState } from "../state/EntityObjectState";
import { useGame } from "./useGame";

export const useWrapAround = (entity: EntityObjectState) => {
  const level = useGame().level;

  useUpdate(() => {
    const threshold = level.current * 200 + 16;

    if (entity.pos.current[1] >= threshold) {
      entity.pos.current[1] -= 216;
    } else if (entity.pos.current[1] <= threshold - 200) {
      entity.pos.current[1] += 216;
    }
  });
};
