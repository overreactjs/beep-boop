import { Position, Property, useKeyPressed, VariableProperty } from "@overreact/engine";
import { ItemState } from "../state";
import { useGame } from "./useGame";
import { snapshotGame } from "../services/snapshot";
import { useCallback } from "react";
import { ItemType, PlayerIndex } from "../types";

export const useDeveloperMode = (camera: Property<Position>) => {
  const game = useGame();

  const collectItem = useCallback((index: PlayerIndex, type: ItemType) => {
    game.collectItem({
      type,
      pos: new VariableProperty([...game.players[index].pos.current]),
    } as unknown as ItemState);
  }, [game])

  useKeyPressed('Digit1', () => {
    game.prevLevel();
    camera.current[1] -= 200;
  });

  useKeyPressed('Digit2', () => {
    game.nextLevel();
    camera.current[1] += 200;
  });

  useKeyPressed('Digit3', () => {
    collectItem(0, 'potion_blue');
    collectItem(0, 'potion_magenta');
    collectItem(1, 'potion_blue');
    collectItem(1, 'potion_magenta');
  });

  useKeyPressed('Digit4', () => {
    game.hurry();
  });

  useKeyPressed('Digit5', async () => {
    snapshotGame(game);
  });
};
