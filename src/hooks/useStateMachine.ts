import { useRef } from "react";
import { useUpdate } from "@overreact/engine";
import { StateDefinitions, StateMachine } from "../utils";

export function useStateMachine<T>(entity: T, states: StateDefinitions<T>) {
  const fsm = useRef(new StateMachine(entity, states));

  useUpdate((delta) => {
    fsm.current.update(delta);
  });
}
