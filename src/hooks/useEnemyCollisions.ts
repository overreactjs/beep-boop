import { Property, useDynamicProperty, useTaggedCollision } from "@overreact/engine";
import { StateMachine } from "../utils";

export function useEnemyCollisions<S extends string, T>(collider: string, fsm: Property<StateMachine<S | 'stunned', T>>) {
  const tags = useDynamicProperty(fsm.current.state, (state): string[] => {
    return state[state.length - 1] === 'stunned' ? ['stunned'] : ['enemy'];
  });

  useTaggedCollision(collider, 'zap', () => {
    if (tags.current.includes('enemy')) {
      fsm.current.replace('stunned');
    }
  });

  return tags;
}
