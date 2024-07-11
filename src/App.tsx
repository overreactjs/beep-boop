import { useCallback, useState } from "react";
import { Device } from "@overreact/engine";
import { Game, TitleScreen } from "./components";
import { useHideStatusBar, useSoundEffectsPreload } from "./hooks";
import { Options } from "./components/TitleScreen/Options";

type GameState = 'titleScreen' | 'playing' | 'options' | 'credits';

export const App = () => {
  useHideStatusBar();
  useSoundEffectsPreload();

  const [state, setState] = useState<GameState>('titleScreen');

  const go = useCallback((state: GameState) => {
    return () => setState(state);
  }, []);

  return (
    <Device mode="desktop" bg="black" showFPS hideClose>
      {state === 'titleScreen' && (
        <TitleScreen onStart={go('playing')} onOptions={go('options')} onCredits={go('credits')} />
      )}
      {state === 'playing' && (
        <Game onGameOver={go('titleScreen')} />
      )}
      {state === 'options' && (
        <Options onBack={go('titleScreen')} />
      )}
      {state === 'credits' && (
        <div>Coming soon!</div>
      )}
    </Device>
  );
};
