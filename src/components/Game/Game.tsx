import React, { MutableRefObject, useRef } from "react";
import { GameState } from "../../state";

export const GameContext = React.createContext<MutableRefObject<GameState>>({
  current: new GameState(),
});

type GameProps = {
  children: React.ReactNode;
}

export const Game: React.FC<GameProps> = ({ children }) => {
  const state = useRef(new GameState());

  return (
    <GameContext.Provider value={state}>
      {children}
    </GameContext.Provider>
  );
};
