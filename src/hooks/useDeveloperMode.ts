import { useCallback } from "react";
import { Position, Property, useKeySequence, VariableProperty } from "@overreact/engine";
import { ItemState, PlayerState } from "../state";
import { useGame } from "./useGame";
import { snapshotGame } from "../services/snapshot";
import { ItemType } from "../types";

export const useDeveloperMode = (camera: Property<Position>) => {
  const game = useGame();

  const collectItem = useCallback((player: PlayerState, type: ItemType) => {
    game.collectItem(player, {
      type,
      pos: new VariableProperty([...player.pos.current]),
    } as unknown as ItemState);
  }, [game]);

  useKeySequenceInDevMode('ZZ', () => {
    game.nextLevel();
    camera.current[1] = (game.level.current - 1) * 200 + 100;
  });

  useKeySequenceInDevMode('ZX', () => {
    for (let i = 0; i < 10; i++) {
      game.nextLevel();
    }
    camera.current[1] = (game.level.current - 1) * 200 + 100;
  });

  useKeySequenceInDevMode('ZC', () => {
    ['rainbow', 'potion_magenta'].forEach((item) => {
      game.players.forEach((player) => {
        collectItem(player, item as ItemType);
      });
    });
  });

  useKeySequenceInDevMode('ZB', async () => {
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
