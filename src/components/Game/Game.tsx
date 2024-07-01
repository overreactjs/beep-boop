import React, { useEffect, useRef, useState } from "react";
import { GameState } from "../../state";
import { buildLevels } from "../../data/levels";
import { useUpdate } from "@overreact/engine";
import { TopBar } from "../TopBar";
import { Arena } from "../Arena";
import { LevelOverlay } from "../LevelOverlay";
import { BottomBar } from "../BottomBar";

export const GameContext = React.createContext<GameState>(new GameState([]));

type GameInnerProps = {
  game: GameState;
  children: React.ReactNode;
}

const GameInner: React.FC<GameInnerProps> = ({ game, children }) => (
  <GameContext.Provider value={game}>
    {children}
  </GameContext.Provider>
);

type GameProps = {
  onGameOver: () => void;
}

export const Game: React.FC<GameProps> = ({ onGameOver }) => {
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
    game?.update(delta, onGameOver);
  });

  return game && (
    <GameInner game={game}>
      <TopBar />
      <Arena />
      <LevelOverlay />
      <BottomBar />
    </GameInner>
  );
};

