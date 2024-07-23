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

export const GameContext = React.createContext<GameState>(new GameState([], new SettingsState()));

type GameProps = {
  onQuit: () => void;
}

export const Game: React.FC<GameProps> = ({ onQuit }) => {
  const game = useGame();

  // Update the game state.
  useUpdate((delta) => {
    game?.update(delta, onQuit);
  });

  return game && (
    <>
      <Screen size={[256, 240]} scale="auto">
        <TopBar />
        <Arena />
        <LevelOverlay />
        <BottomBar />
        <PauseMenu onQuit={onQuit} />
      </Screen>
      {/* <VirtualController /> */}
    </>
  );
};
