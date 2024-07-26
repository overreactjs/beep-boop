import { useEffect } from "react";
import { useSync } from "@overreact/engine";
import { GameState } from "../state";
import { useMusic } from "./useMusic";

import MainTheme from "../assets/music/MainTheme.webm";
import HappyLevel from "../assets/music/HappyLevel.webm";
import BossFight from "../assets/music/BossFight.webm";
import SwingingLevel from "../assets/music/SwingingLevel.webm";

export const useSoundtrack = (game?: GameState) => {
  const music = useMusic();

  const track = useSync(() => {
    return !game?.started.current
      ? HappyLevel
      : (game?.level.current || 0) > game.levels.length
      ? SwingingLevel
      : (game?.level.current || 0) % 20 === 0
      ? BossFight
      : MainTheme;
  });

  // Play either the main theme, or the boss fight music.
  useEffect(() => music.play(track), [track, music]);

  // Stop the music when the game isn't playing.
  useEffect(() => () => music.stop(), [music]);
};
