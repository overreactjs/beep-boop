import { useEffect } from "react";
import { useSync } from "@overreact/engine";
import { useGame } from "./useGame";
import { useMusic } from "./useMusic";

import MainTheme from "../assets/music/MainTheme.webm";
import BossFight from "../assets/music/BossFight.webm";

export const useSoundtrack = () => {
  const game = useGame();
  const music = useMusic();

  const currentLevel = useSync(() => game.level.current);

  // Play either the main theme, or the boss fight music.
  useEffect(() => {
    music.play(currentLevel % 20 === 0 ? BossFight : MainTheme);
  }, [currentLevel, music]);

  // Stop the music when the game isn't playing.
  useEffect(() => () => {
    music.stop();
  }, [music]);
};
