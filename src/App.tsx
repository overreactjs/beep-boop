import { useState } from "react";
import { Device } from "@overreact/engine";
import { Game, TitleScreen } from "./components";
import { useHideStatusBar, useSoundEffectsPreload } from "./hooks";

type GameStates = 'titleScreen' | 'playing';

export const App = () => {
  useHideStatusBar();
  useSoundEffectsPreload();

  const [state, setState] = useState<GameStates>('titleScreen');

  const startGame = () => setState('playing');
  const endGame = () => setState('titleScreen');

  return (
    <Device mode="desktop" bg="black" showFPS hideClose>
      {state === 'titleScreen' && <TitleScreen onStart={startGame} />}
      {state === 'playing' && <Game onGameOver={endGame} />}
    </Device>
  );
};
