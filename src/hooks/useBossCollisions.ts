import { Property, StateMachine, useCachedDynamicProperty, useTaggedCollision } from "@overreact/engine";
import { BaseBossState } from "../state/enemies";

type FSM<T> = Property<StateMachine<T>>;

type Result = [Property<string[]>, Property<boolean>];

export function useBossCollisions<T extends BaseBossState>(collider: string, fsm: FSM<T>): Result {
  const tags = useCachedDynamicProperty(fsm.current.entity.animation, (animation): string[] => animation === 'teleport' ? ['enemy-teleport'] : ['enemy']);
  const active = useCachedDynamicProperty(fsm.current.state, (state) => state !== 'dead');

  useTaggedCollision(collider, ['zap', 'playerFireball', 'flyingStar'], () => {
    if (fsm.current.entity.invulnerable.current <= 0) {
      fsm.current.entity.hit();

      if (fsm.current.entity.health.current === 0) {
        fsm.current.replace('dead');
      }
    }
  });

  return [tags, active];
}
