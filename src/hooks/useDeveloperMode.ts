import { Position, Property, useKeyPressed, VariableProperty } from "@overreact/engine";
import { ItemState } from "../state";
import { useGame } from "./useGame";
import { snapshotGame } from "../services/snapshot";
import { useCallback } from "react";
import { ItemType } from "../types";

export const useDeveloperMode = (camera: Property<Position>) => {
  const game = useGame();

  const collectItem = useCallback((type: ItemType) => {
    game.collectItem({
      type,
      pos: new VariableProperty([...game.players[0].pos.current]),
    } as unknown as ItemState);
  }, [game])

  useKeyPressed('KeyO', () => {
    game.prevLevel();
    camera.current[1] -= 200;
  });

  useKeyPressed('KeyK', () => {
    game.nextLevel();
    camera.current[1] += 200;
  });

  useKeyPressed('KeyM', () => {
    collectItem('potion_blue');
    collectItem('potion_magenta');
  });

  useKeyPressed('KeyH', () => {
    game.hurry();
  });

  useKeyPressed('KeyP', async () => {
    snapshotGame(game);
  });
};
