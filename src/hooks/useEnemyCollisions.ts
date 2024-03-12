import { Property, StateMachine, useCachedDynamicProperty, useTaggedCollision } from "@overreact/engine";

type FSM<T> = Property<StateMachine<T>>;

type Result = [Property<string[]>, Property<boolean>];

export function useEnemyCollisions<T>(collider: string, fsm: FSM<T>): Result {
  const tags = useCachedDynamicProperty(fsm.current.state, (state): string[] => state === 'stunned' ? ['stunned'] : ['enemy']);
  const active = useCachedDynamicProperty(fsm.current.state, (state) => state !== 'dead');

  useTaggedCollision(collider, 'zap', () => {
    if (tags.current.includes('enemy')) {
      fsm.current.replace('stunned');
    }
  });

  useTaggedCollision(collider, 'playerFireball', () => {
    fsm.current.replace('dead');
  });

  useTaggedCollision(collider, 'player', () => {
    if (fsm.current.state.current === 'stunned') {
      fsm.current.replace('dead');
    }
  });

  return [tags, active];
}
