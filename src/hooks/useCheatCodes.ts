import { useKeySequence } from "@overreact/engine";
import { useGame } from "./useGame";

export const useCheatCodes = () => {
  const game = useGame();

  useKeySequence('BEEPZ', () => {
    game.nextLevel();
    game.camera.current[1] = (game.level.current - 1) * 200 + 100;
  });

  useKeySequence('BOOPZ', () => {
    for (let i = 0; i < 10; i++) {
      game.nextLevel();
    }
    game.camera.current[1] = (game.level.current - 1) * 200 + 100;
  });
};
