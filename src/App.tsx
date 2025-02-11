import React, { useMemo } from "react";
import { Device, useSync } from "@overreact/engine";
import { CreditsScreen, Game, GameContext, GameOver, HighscoreInput, SettingsScreen, TitleScreen } from "./components";
import { useAppState, useAudioSettingsStartupSync, useHideStatusBar, useInitGameState, useSoundEffectsPreload, useSoundtrack, useVideoSettingsStartupSync } from "./hooks";
import { isLeaderboardScore } from "./services";
import { SettingsState } from "./state";
import { HighscoreTable } from "./components/HighscoreTable";

export const SettingsContext = React.createContext<SettingsState>(SettingsState.load());

type AppState = 'titleScreen' | 'playing' | 'settings' | 'credits' | 'gameOver' | 'highscoreTable' | 'highscoreInput';

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
    if (game && isLeaderboardScore(game.players[0].score.current, game.level.current)) {
      game.pause();
      go('highscoreInput')();
    } else {
      go('gameOver')();
      reset();
    }
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
            <TitleScreen onStart={onStartGame} onHighscoreTable={go('highscoreTable')} onSettings={go('settings')} onCredits={go('credits')} onQuit={onQuit} />
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
          {state === 'highscoreTable' && (
            <HighscoreTable onBack={go('titleScreen')} />
          )}
          {state === 'highscoreInput' && (
            <HighscoreInput onBack={go('titleScreen')} />
          )}
        </Device>
      </GameContext.Provider>
    </SettingsContext.Provider>
  );
};
