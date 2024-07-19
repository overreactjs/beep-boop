import { Device } from "@overreact/engine";
import { Game, OptionsScreen, TitleScreen } from "./components";
import { useAppState, useAudioSettingsStartupSync, useHideStatusBar, useSoundEffectsPreload } from "./hooks";
import React, { useMemo } from "react";
import { SettingsState } from "./state/SettingsState";

export const SettingsContext = React.createContext<SettingsState>(SettingsState.load());

type GameState = 'titleScreen' | 'playing' | 'options' | 'credits';

export const App = () => {
  const settings = useMemo(() => SettingsState.load(), []);

  const { state, go } = useAppState<GameState>('titleScreen');

  useHideStatusBar();
  useSoundEffectsPreload();  
  useAudioSettingsStartupSync(settings);

  return (
    <SettingsContext.Provider value={settings}>
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
    </SettingsContext.Provider>
  );
};
