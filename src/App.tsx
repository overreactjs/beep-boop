import React, { useMemo } from "react";
import { Device, useSync } from "@overreact/engine";
import { Game, SettingsScreen, TitleScreen } from "./components";
import { useAppState, useAudioSettingsStartupSync, useHideStatusBar, useInitGameState, useSoundEffectsPreload, useVideoSettingsStartupSync } from "./hooks";
import { SettingsState } from "./state";
import { GameContext } from "./components/Game/Game";

export const SettingsContext = React.createContext<SettingsState>(SettingsState.load());

type AppState = 'titleScreen' | 'playing' | 'settings' | 'credits';

export const App = () => {
  const settings = useMemo(() => SettingsState.load(), []);
  const showFrameRate = useSync(() => settings.showFrameRate.current);
  
  const { game, reset } = useInitGameState(settings);
  const { state, go } = useAppState<AppState>('titleScreen');

  useHideStatusBar();
  useSoundEffectsPreload();
  useAudioSettingsStartupSync(settings);
  useVideoSettingsStartupSync(settings);

  const onEndGame = () => {
    go('titleScreen')();
    reset();
  };

  const onQuit = () => window.engine?.quit();

  return (
    <SettingsContext.Provider value={settings}>
      <GameContext.Provider value={game!}>
        <Device mode="desktop" bg="black" showFPS={showFrameRate} hideClose>
          {state === 'playing' && (
            <Game onQuit={onEndGame} />
          )}
          {state === 'titleScreen' && (
            <TitleScreen onStart={go('playing')} onSettings={go('settings')} onCredits={go('credits')} onQuit={onQuit} />
          )}
          {state === 'settings' && (
            <SettingsScreen onBack={go('titleScreen')} />
          )}
        </Device>
      </GameContext.Provider>
    </SettingsContext.Provider>
  );
};
