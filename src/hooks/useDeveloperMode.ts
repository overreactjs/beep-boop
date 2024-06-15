import { Position, Property, useKeyPressed, VariableProperty } from "@overreact/engine";
import { ItemState } from "../state";
import { useGame } from "./useGame";

export const useDeveloperMode = (camera: Property<Position>) => {
  const game = useGame();

  useKeyPressed('KeyO', () => {
    game.prevLevel();
    camera.current[1] -= 200;
  });

  useKeyPressed('KeyK', () => {
    game.nextLevel();
    camera.current[1] += 200;
  });

  useKeyPressed('KeyM', () => {
    game.collectItem({
      type: 'dynamite',
      pos: new VariableProperty([...game.players[0].pos.current]),
    } as unknown as ItemState);
  });
};
