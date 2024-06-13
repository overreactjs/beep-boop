import { useUpdate } from "@overreact/engine";
import { EntityObjectState } from "../state/EntityObjectState";
import { useGame } from "./useGame";

const DEFAULT_OPTIONS: UseWrapAroundOptions = {
  direction: 'both',
};

type UseWrapAroundOptions = {
  direction?: 'upwards' | 'downwards' | 'both';
}

export const useWrapAround = (entity: EntityObjectState, options?: UseWrapAroundOptions) => {
  const { direction } = { ...DEFAULT_OPTIONS, ...options };
  const upwards = direction === 'upwards' || direction === 'both';
  const downwards = direction === 'downwards' || direction === 'both';

  const level = useGame().level;

  useUpdate(() => {
    const threshold = level.current * 200 + 16;

    if (downwards && entity.pos.current[1] >= threshold) {
      entity.pos.current[1] -= 216;
    } else if (upwards && entity.pos.current[1] <= threshold - 200) {
      entity.pos.current[1] += 216;
    }
  });
};
