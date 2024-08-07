import { Position, Property, useKeySequence } from "@overreact/engine";
import { useGame } from "./useGame";

export const useCheatCodes = (camera: Property<Position>) => {
  const game = useGame();

  useKeySequence('LMWARP', () => {
    game.nextLevel();
    camera.current[1] = (game.level.current - 1) * 200 + 100;
  });
};
