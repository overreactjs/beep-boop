import { StateFunction } from "@overreact/engine";
import { useCallback } from "react";
import { BaseEnemyState } from "../state";

export function useBaseStunnedState<T extends BaseEnemyState>(): StateFunction<T> {
  return useCallback((fsm) => {
    if (fsm.age.current > 10000) {
      fsm.replace('idle');
    }
  }, []);
}
