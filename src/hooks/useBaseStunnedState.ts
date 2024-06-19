import { StateFunction } from "@overreact/engine";
import { useCallback } from "react";
import { BaseEnemyState } from "../state";

export function useBaseStunnedState<T extends BaseEnemyState>(): StateFunction<T> {
  return useCallback((fsm) => {
    const { entity, age } = fsm;

    if (!entity.angry.current && age.current > 10000) {
      fsm.replace('idle');
      fsm.entity.angry.current = true;
    } else if (entity.angry.current && age.current > 7000) {
      fsm.replace('idle');
    }
  }, []);
}
