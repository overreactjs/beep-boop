import { useUpdate } from "@overreact/engine";
import { PositionedObjectState } from "../state/PositionedObjectState";

export const useWrapAround = (entity: PositionedObjectState) => {
  useUpdate(() => {
    if (entity.pos.current[1] >= 216) {
      entity.pos.current[1] -= 224;
    }
  });
};
