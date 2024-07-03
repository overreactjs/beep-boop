import { Position, Property, useKeyPressed, VariableProperty } from "@overreact/engine";
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
  }, [game])

  useKeyPressed('KeyZ', () => {
    game.nextLevel();
    camera.current[1] = (game.level.current - 1) * 200 + 100;
  });

  useKeyPressed('KeyX', () => {
    for (let i = 0; i < 10; i++) {
      game.nextLevel();
    }
    camera.current[1] = (game.level.current - 1) * 200 + 100;
  });

  useKeyPressed('KeyC', () => {
    collectItem(game.players[0], 'potion_blue');
    collectItem(game.players[0], 'potion_magenta');
    collectItem(game.players[1], 'potion_blue');
    collectItem(game.players[1], 'potion_magenta');
  });

  useKeyPressed('KeyV', () => {
    game.hurry();
  });

  useKeyPressed('KeyB', async () => {
    snapshotGame(game);
  });
};
