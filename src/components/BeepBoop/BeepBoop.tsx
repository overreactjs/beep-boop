import { useState } from "react";
import { TitleScreen } from "../TitleScreen";
import { Game } from "../Game";

type GameStates = 'titleScreen' | 'playing';

export const BeepBoop: React.FC = () => {
  const [state, setState] = useState<GameStates>('titleScreen');

  const startGame = () => {
    setState('playing');
  };

  const endGame = () => {
    setState('titleScreen');
  }

  if (state === 'titleScreen') {
    return <TitleScreen onStart={startGame} />
  } else if (state === 'playing') {
    return <Game onGameOver={endGame} />
  }
};
