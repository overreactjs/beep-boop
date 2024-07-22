import { useRef, useState, useEffect, useMemo } from "react";
import { buildLevels } from "../data/levels";
import { SettingsState, GameState } from "../state";

export const useInitGameState = (settings: SettingsState) => {
  const loading = useRef(false);
  const [game, setGame] = useState<GameState>();

  useEffect(() => {
    if (!loading.current) {
      loading.current = true;
      buildLevels().then((levels) => {
        setGame(new GameState(levels, settings));
      });
    }
  }, [settings]);

  return useMemo(() => game, [game]);
};
