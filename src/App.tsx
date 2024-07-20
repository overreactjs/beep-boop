import { Device } from "@overreact/engine";
import { Game, TitleScreen } from "./components";
import { useAppState, useAudioSettingsStartupSync, useHideStatusBar, useSoundEffectsPreload } from "./hooks";
import React, { useMemo } from "react";
import { SettingsState } from "./state/SettingsState";
import { SettingsScreen } from "./components/SettingsScreen/SettingsScreen";

export const SettingsContext = React.createContext<SettingsState>(SettingsState.load());

type GameState = 'titleScreen' | 'playing' | 'settings' | 'credits';

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
          <TitleScreen onStart={go('playing')} onSettings={go('settings')} onCredits={go('credits')} />
        )}
        {state === 'settings' && (
          <SettingsScreen onBack={go('titleScreen')} />
        )}
      </Device>
    </SettingsContext.Provider>
  );
};
