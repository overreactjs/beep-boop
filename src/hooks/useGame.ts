import { useContext } from "react";
import { GameContext } from "../components/Game";

export const useGame = () => {
  return useContext(GameContext);
}