import { StateFunction } from "@overreact/engine";
import { useCallback } from "react";
import { EnemyState } from "../state";

export function useBaseStunnedState<T extends EnemyState>(): StateFunction<T> {
  return useCallback((fsm) => {
    if (fsm.age.current > 10000) {
      fsm.replace('idle');
    }
  }, []);
}
