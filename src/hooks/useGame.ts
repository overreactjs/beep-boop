import { useContext } from "react";
import { GameContext } from "../components/Game/Game";

export const useGame = () => {
  return useContext(GameContext);
}