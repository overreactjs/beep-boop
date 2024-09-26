import { useCallback } from "react";
import { useKeySequence, VariableProperty } from "@overreact/engine";
import { ItemState, PlayerState } from "../state";
import { useGame } from "./useGame";
import { snapshotGame } from "../services/snapshot";
import { ItemType } from "../types";

export const useDeveloperMode = () => {
  const game = useGame();

  const collectItem = useCallback((player: PlayerState, type: ItemType) => {
    game.collectItem(player, {
      type,
      pos: new VariableProperty([...player.pos.current]),
    } as unknown as ItemState);
  }, [game]);

  useKeySequenceInDevMode('DEV1', () => {
    ['rainbow', 'potion_magenta'].forEach((item) => {
      game.players.forEach((player) => {
        collectItem(player, item as ItemType);
      });
    });
  });

  useKeySequenceInDevMode('DEV2', async () => {
    snapshotGame(game);
  });
};

const useKeySequenceInDevMode = (code: string, fn: () => void) => {
  useKeySequence(code, () => {
    if (import.meta.env.DEV) {
      fn();
    }
  });
};
