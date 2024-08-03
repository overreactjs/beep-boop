import { KeyboardKeyName, Position, Property, useKeyPressed, VariableProperty } from "@overreact/engine";
import { ItemState, PlayerState } from "../state";
import { useGame } from "./useGame";
import { snapshotGame } from "../services/snapshot";
import { useCallback } from "react";
import { ItemType } from "../types";

export const useDeveloperMode = (camera: Property<Position>) => {
  const game = useGame();

  const collectItem = useCallback((player: PlayerState, type: ItemType) => {
    game.collectItem(player, {
      type,
      pos: new VariableProperty([...player.pos.current]),
    } as unknown as ItemState);
  }, [game]);

  useKeyPressedInDevMode('KeyZ', () => {
    game.nextLevel();
    camera.current[1] = (game.level.current - 1) * 200 + 100;
  });

  useKeyPressedInDevMode('KeyX', () => {
    for (let i = 0; i < 10; i++) {
      game.nextLevel();
    }
    camera.current[1] = (game.level.current - 1) * 200 + 100;
  });

  useKeyPressedInDevMode('KeyC', () => {
    const items: ItemType[] = ['rainbow', 'potion_magenta'];
    items.forEach((item) => {
      collectItem(game.players[0], item as ItemType);
      // collectItem(game.players[1], item as ItemType);
    });
  });

  useKeyPressedInDevMode('KeyB', async () => {
    snapshotGame(game);
  });
};

const useKeyPressedInDevMode = (key: KeyboardKeyName, fn: () => void) => {
  useKeyPressed(key, () => {
    if (import.meta.env.DEV) {
      fn();
    }
  });
};
