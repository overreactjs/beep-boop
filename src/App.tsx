import { Device } from "@overreact/engine";
import { Game, OptionsScreen, TitleScreen } from "./components";
import { useAppState, useHideStatusBar, useSoundEffectsPreload } from "./hooks";

type GameState = 'titleScreen' | 'playing' | 'options' | 'credits';

export const App = () => {
  useHideStatusBar();
  useSoundEffectsPreload();

  const { state, go } = useAppState<GameState>('titleScreen');

  return (
    <Device mode="desktop" bg="black" showFPS hideClose>
      {state === 'playing' && (
        <Game onQuit={go('titleScreen')} />
      )}
      {state === 'titleScreen' && (
        <TitleScreen onStart={go('playing')} onOptions={go('options')} onCredits={go('credits')} />
      )}
      {state === 'options' && (
        <OptionsScreen onBack={go('titleScreen')} />
      )}
    </Device>
  );
};
