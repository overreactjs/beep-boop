import { useUpdate } from "@overreact/engine";
import { PositionedObjectState } from "../state/PositionedObjectState";
import { useGame } from ".";

export const useWrapAround = (entity: PositionedObjectState) => {
  const game = useGame();

  useUpdate(() => {
    const threshold = game.current.level.current * 200 + 16;

    if (entity.pos.current[1] >= threshold) {
      entity.pos.current[1] -= 224;
    }
  });
};
