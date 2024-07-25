import React, {  } from "react";
import { useUpdate } from "@overreact/engine";

import { useGame } from "../../hooks";
import { GameState, SettingsState } from "../../state";

import { Arena } from "../Arena";
import { BottomBar } from "../BottomBar";
import { LevelOverlay } from "../LevelOverlay";
import { PauseMenu } from "../PauseMenu";
import { Screen } from "../Screen";
import { TopBar } from "../TopBar";
import { useGamePause } from "./useGamePause";

export const GameContext = React.createContext<GameState>(new GameState([], new SettingsState()));

type GameProps = {
  onEndGame: () => void;
}

export const Game: React.FC<GameProps> = ({ onEndGame }) => {
  const game = useGame();

  // Pause and unpause.
  useGamePause();

  // Update the game state.
  useUpdate((delta) => {
    game?.update(delta, onEndGame);
  });

  return game && (
    <>
      <Screen size={[256, 240]} scale="auto">
        <TopBar />
        <Arena onEndGame={onEndGame} />
        <LevelOverlay />
        <BottomBar />
        <PauseMenu onEndGame={onEndGame} />
      </Screen>
      {/* <VirtualController /> */}
    </>
  );
};
