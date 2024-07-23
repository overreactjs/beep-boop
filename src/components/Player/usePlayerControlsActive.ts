import { Property, useMergeProperty } from "@overreact/engine";
import { useGame } from "../../hooks";
import { PlayerState } from "../../state";

export const usePlayerControlsActive = (player: PlayerState): Property<boolean> => {
  const game = useGame();
  const gameActive = useMergeProperty(game.initialized, game.paused, (a, b) => a && !b);
  const controlsActive = useMergeProperty(player.alive, gameActive, (a, b) => a && b);

  return controlsActive;
};
