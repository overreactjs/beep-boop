import { Property, StateMachine, useDynamicProperty, useTaggedCollision } from "@overreact/engine";
import { BaseEnemyStates } from "../types";

type FSM<S extends string, T> = Property<StateMachine<S | BaseEnemyStates, T>>;

type Result = [Property<string[]>, Property<boolean>];

export function useEnemyCollisions<S extends string, T>(collider: string, fsm: FSM<S, T>): Result {
  const tags = useDynamicProperty(fsm.current.state, (state): string[] => state === 'stunned' ? ['stunned'] : ['enemy']);
  const active = useDynamicProperty(fsm.current.state, (state) => state !== 'dead');

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

  return [tags, active];
}
