import { Property, StateMachine, useCachedDynamicProperty, useTaggedCollision } from "@overreact/engine";
import { BaseEnemyState, PlayerState } from "../state";
import { useSoundEffects } from "./useSoundEffects";

type FSM<T> = Property<StateMachine<T>>;

type Result = [Property<string[]>, Property<boolean>];

export function useEnemyCollisions<T extends BaseEnemyState>(collider: string, fsm: FSM<T>): Result {
  const sfx = useSoundEffects();
  
  const tags = useCachedDynamicProperty(fsm.current.state, (state): string[] => state === 'stunned' ? ['stunned'] : ['enemy']);
  const active = useCachedDynamicProperty(fsm.current.state, (state) => state !== 'dead');

  useTaggedCollision(collider, ['zap', 'playerRainbow'], () => {
    if (tags.current.includes('enemy')) {
      fsm.current.replace('stunned');
      sfx.play('EnemyStun');
    }
  });

  useTaggedCollision(collider, ['playerFireball', 'flyingStar'], () => {
    fsm.current.replace('dead');
  });

  useTaggedCollision<PlayerState>(collider, 'player', (collisions) => {
    if (fsm.current.state.current === 'stunned') {
      fsm.current.entity.killedBy = collisions[0].b.entity || null;
      fsm.current.replace('dead');
    }
  });

  return [tags, active];
}
