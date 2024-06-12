import React, { useEffect, useRef, useState } from "react";
import { GameState } from "../../state";
import { buildLevels } from "../../data/levels";
import { VariableProperty, useKeyPressed, useUpdate } from "@overreact/engine";

export const GameContext = React.createContext<GameState>(new GameState([]));

type GameInnerProps = {
  game: GameState;
  children: React.ReactNode;
}

const GameInner: React.FC<GameInnerProps> = ({ game, children }) => {

  return (
    <GameContext.Provider value={game}>
      {children}
    </GameContext.Provider>
  )
};

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

  useKeyPressed('KeyM', () => {
    game?.collectItem({
      type: "dynamite",
      target: new VariableProperty([...game.players[0].pos.current]),
      state: new VariableProperty('landed'),
      pos: new VariableProperty([...game.players[0].pos.current]),
      block: new VariableProperty([16, 16]),
      offset: 0,
      id: 0
    });
  });

  return game && (
    <GameInner game={game}>
      {children}
    </GameInner>
  );
};

