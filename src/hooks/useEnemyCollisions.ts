import { Property, StateMachine, useDynamicProperty, useTaggedCollision } from "@overreact/engine";
import { BaseEnemyStates } from "../types";

export function useEnemyCollisions<S extends string, T>(collider: string, fsm: Property<StateMachine<S | BaseEnemyStates, T>>) {
  const tags = useDynamicProperty(fsm.current.state, (state): string[] => {
    return state === 'stunned' ? ['stunned'] : ['enemy'];
  });

  useTaggedCollision(collider, 'zap', () => {
    if (tags.current.includes('enemy')) {
      fsm.current.replace('stunned');
    }
  });

  useTaggedCollision(collider, 'player', () => {
    if (fsm.current.state.current === 'stunned') {
      fsm.current.replace('dead');
    }
  });

  return tags;
}
