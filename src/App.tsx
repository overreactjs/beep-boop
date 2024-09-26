import React, { useMemo } from "react";
import { Device, useSync } from "@overreact/engine";
import { Game, SettingsScreen, TitleScreen } from "./components";
import { useAppState, useAudioSettingsStartupSync, useHideStatusBar, useInitGameState, useSoundEffectsPreload, useSoundtrack, useVideoSettingsStartupSync } from "./hooks";
import { SettingsState } from "./state";
import { GameContext } from "./components/Game/Game";
import { CreditsScreen } from "./components/CreditsScreen";
import { GameOver } from "./components/GameOver";

export const SettingsContext = React.createContext<SettingsState>(SettingsState.load());

type AppState = 'titleScreen' | 'playing' | 'settings' | 'credits' | 'gameOver';

export const App = () => {
  const settings = useMemo(() => SettingsState.load(), []);
  const showFrameRate = useSync(() => settings.showFrameRate.current);
  
  const { game, reset } = useInitGameState(settings);
  const { state, go } = useAppState<AppState>('titleScreen');

  useHideStatusBar();
  useSoundEffectsPreload();
  useAudioSettingsStartupSync(settings);
  useVideoSettingsStartupSync(settings);
  useSoundtrack(game);

  const onEndGame = () => {
    go('titleScreen')();
    reset();
  };

  const onGameOver = () => {
    go('gameOver')();
    reset();
  };

  const onStartGame = () => {
    go('playing')();
    game?.start();
  };

  const onQuit = () => {
    window.engine?.quit();
  };

  return (
    <SettingsContext.Provider value={settings}>
      <GameContext.Provider value={game!}>
        <Device mode="desktop" bg="black" showFPS={showFrameRate} hideClose>
          {state === 'playing' && (
            <Game onEndGame={onEndGame} onGameOver={onGameOver} />
          )}
          {state === 'titleScreen' && (
            <TitleScreen onStart={onStartGame} onSettings={go('settings')} onCredits={go('credits')} onQuit={onQuit} />
          )}
          {state === 'settings' && (
            <SettingsScreen onBack={go('titleScreen')} />
          )}
          {state === 'credits' && (
            <CreditsScreen onBack={go('titleScreen')} />
          )}
          {state === 'gameOver' && (
            <GameOver onBack={go('titleScreen')} />
          )}
        </Device>
      </GameContext.Provider>
    </SettingsContext.Provider>
  );
};
