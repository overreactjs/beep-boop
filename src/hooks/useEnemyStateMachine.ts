import { StateDefinitions, useStateMachine, useProperty, useUpdate } from "@overreact/engine";
import { BaseEnemyState } from "../state";

export function useEnemyStateMachine<T extends BaseEnemyState>(entity: T, states: StateDefinitions<T>) {
  const fsm = useStateMachine(entity, 'init', states);
  const ttl = useProperty(2000);

  useUpdate((delta) => {
    ttl.current -= delta;

    if (fsm.current.state.current === 'init' && ttl.current <= 0) {
      fsm.current.replace('idle');
    }

    fsm.current.entity.handleSignal('kill', () => {
      fsm.current.replace('dead');
    });

    fsm.current.entity.handleSignal('anger', () => {
      fsm.current.entity.angry.current = true;
    })
  });

  return fsm;
}
