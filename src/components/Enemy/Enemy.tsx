import { useId } from "react";
import { VirtualInput, useTaggedCollision } from "@overreact/engine";
import { EnemyState } from "../../state";
import { useGame } from "../../hooks";

import { BounceBot } from "../BounceBot";
import { GuardBot } from "../GuardBot";
import { SecurityBot } from "../SecurityBot";

export type EnemyProps<T = EnemyState> = {
  enemy: T;
  collider: string;
}

export const Enemy: React.FC<EnemyProps> = ({ enemy }) => {
  const game = useGame();
  const collider = useId();

  useTaggedCollision(collider, 'portal', () => {
    game.current.teleport(enemy);
  });

  return (
    <VirtualInput>
      {enemy.type === 'bounceBot' && (
        <BounceBot enemy={enemy} collider={collider} />
      )}
      {enemy.type === 'guardBot' && (
        <GuardBot enemy={enemy} collider={collider} />
      )}
      {enemy.type === 'securityBot' && (
        <SecurityBot enemy={enemy} collider={collider} />
      )}
    </VirtualInput>
  );
};
