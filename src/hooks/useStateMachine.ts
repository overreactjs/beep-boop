import { useMemo } from "react";
import { usePostCollisions, useProperty } from "@overreact/engine";
import { StateDefinitions, StateMachine } from "../utils";

export function useStateMachine<S extends string, T>(entity: T, state: S, states: StateDefinitions<S, T>) {
  const fsm = useProperty(new StateMachine(entity, state, states));

  usePostCollisions((delta) => {
    fsm.current.update(delta);
  });

  return useMemo(() => fsm, [fsm]);
}
