import React, { useEffect, useRef, useState } from "react";
import { GameState } from "../../state";
import { buildLevels } from "../../data/levels";
import { useUpdate } from "@overreact/engine";

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
  children: React.ReactNode;
}

export const Game: React.FC<GameProps> = ({ children }) => {
  const loading = useRef(false);
  const [game, setGame] = useState<GameState>();

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
    game?.update(delta);
  });

  return game && (
    <GameInner game={game}>
      {children}
    </GameInner>
  );
};

