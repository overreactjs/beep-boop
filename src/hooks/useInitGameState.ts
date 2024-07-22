import { useRef, useState, useEffect, useMemo, useCallback } from "react";
import { buildLevels } from "../data/levels";
import { SettingsState, GameState } from "../state";

export const useInitGameState = (settings: SettingsState) => {
  const loading = useRef(false);
  const [game, setGame] = useState<GameState>();

  const reset = useCallback(() => {
    buildLevels().then((levels) => {
      setGame(new GameState(levels, settings));
    });
  }, [settings]);

  useEffect(() => {
    if (!loading.current) {
      loading.current = true;
      reset();
    }
  }, [settings, reset]);

  return useMemo(() => ({ game, reset }), [game, reset]);
};
