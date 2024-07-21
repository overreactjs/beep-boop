import React, { useMemo } from "react";
import { Device, useSync } from "@overreact/engine";
import { Game, SettingsScreen, TitleScreen } from "./components";
import { useAppState, useAudioSettingsStartupSync, useHideStatusBar, useSoundEffectsPreload, useVideoSettingsStartupSync } from "./hooks";
import { SettingsState } from "./state";

export const SettingsContext = React.createContext<SettingsState>(SettingsState.load());

type GameState = 'titleScreen' | 'playing' | 'settings' | 'credits';

export const App = () => {
  const settings = useMemo(() => SettingsState.load(), []);
  const showFrameRate = useSync(() => settings.showFrameRate.current);

  const { state, go } = useAppState<GameState>('titleScreen');

  useHideStatusBar();
  useSoundEffectsPreload();
  useAudioSettingsStartupSync(settings);
  useVideoSettingsStartupSync(settings);

  const onQuit = () => window.engine?.quit();

  return (
    <SettingsContext.Provider value={settings}>
      <Device mode="desktop" bg="black" showFPS={showFrameRate} hideClose>
        {state === 'playing' && (
          <Game onQuit={go('titleScreen')} />
        )}
        {state === 'titleScreen' && (
          <TitleScreen onStart={go('playing')} onSettings={go('settings')} onCredits={go('credits')} onQuit={onQuit} />
        )}
        {state === 'settings' && (
          <SettingsScreen onBack={go('titleScreen')} />
        )}
      </Device>
    </SettingsContext.Provider>
  );
};
