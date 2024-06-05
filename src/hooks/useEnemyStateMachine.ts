import { StateDefinitions, useStateMachine, useProperty, useUpdate } from "@overreact/engine";

export function useEnemyStateMachine<T>(entity: T, states: StateDefinitions<T>) {
  const fsm = useStateMachine(entity, 'init', states);
  const ttl = useProperty(2000);

  useUpdate((delta) => {
    ttl.current -= delta;

    if (fsm.current.state.current === 'init' && ttl.current <= 0) {
      fsm.current.replace('idle');
    }
  });

  return fsm;
}
