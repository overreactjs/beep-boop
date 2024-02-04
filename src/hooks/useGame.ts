import { useContext } from "react";
import { GameContext } from "../components/Game/Game";

export const useGame = () => {
  return useContext(GameContext);
}

export const useLevel = () => {
  const game = useGame();
  return game.current.level;
}