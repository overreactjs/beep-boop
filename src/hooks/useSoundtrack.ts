import { useEffect } from "react";
import { useSync } from "@overreact/engine";
import { GameState } from "../state";
import { useMusic } from "./useMusic";

import MainTheme from "../assets/music/MainTheme.webm";
import HappyLevel from "../assets/music/HappyLevel.webm";
import BossFight from "../assets/music/BossFight.webm";
import SwingingLevel from "../assets/music/SwingingLevel.webm";

/**
 * Play the right soundtrack, based on the current game state and level. This hook uses `useMusic`
 * in turn tags the audio to the 'music' so that playing a new track will cause the previuos track
 * to stop.
 */
export const useSoundtrack = (game?: GameState) => {
  const music = useMusic();

  const track = useSync(() => {
    // Title screen
    if (!game?.started.current) {
      return HappyLevel;
    }

    // Ending screen
    if ((game?.level.current || 0) > game.levels.length) {
      return SwingingLevel;
    }

    // Boss fights (every 20 levels)
    if ((game?.level.current || 0) % 20 === 0) {
      return BossFight;
    }

    return MainTheme;
  });

  // Play either the main theme, or the boss fight music.
  useEffect(() => music.play(track), [track, music]);

  // Stop the music when the game isn't playing.
  useEffect(() => () => music.stop(), [music]);
};
