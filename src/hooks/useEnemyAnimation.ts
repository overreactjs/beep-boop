import { useMergeProperty } from "@overreact/engine";
import { BaseEnemyState } from "../state";

export const useEnemyAnimation = (enemy: BaseEnemyState) => {
  return useMergeProperty(enemy.animation, enemy.angry, (animation, angry) => {
    return `${animation}${angry ? '-angry' : ''}`;
  });
};
