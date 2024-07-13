import React, { useEffect, useRef, useState } from "react";
import { useUpdate } from "@overreact/engine";

import { buildLevels } from "../../data/levels";
import { GameState } from "../../state";

import { Arena } from "../Arena";
import { BottomBar } from "../BottomBar";
import { LevelOverlay } from "../LevelOverlay";
import { PauseMenu } from "../PauseMenu";
import { Screen } from "../Screen";
import { TopBar } from "../TopBar";
import { VirtualController } from "../VirtualController";

export const GameContext = React.createContext<GameState>(new GameState([]));

type GameProps = {
  onQuit: () => void;
}

export const Game: React.FC<GameProps> = ({ onQuit }) => {
  const loading = useRef(false);
  const [game, setGame] = useState<GameState>();

  // When the game first renders, load all levels, then start.
  useEffect(() => {
    if (!loading.current) {
      loading.current = true;
      buildLevels().then((levels) => {
        setGame(new GameState(levels));
      });
    }
  }, []);

  // Update the game state.
  useUpdate((delta) => {
    game?.update(delta, onQuit);
  });

  return game && (
    <GameContext.Provider value={game}>
      <Screen size={[256, 240]} scale="auto">
        <TopBar />
        <Arena />
        <LevelOverlay />
        <BottomBar />
        <PauseMenu onQuit={onQuit} />
      </Screen>
      <VirtualController />
    </GameContext.Provider>
  );
};
