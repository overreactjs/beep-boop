import { useId } from "react";
import { VirtualInput, useTaggedCollision } from "@overreact/engine";
import { EnemyState, BounceBotState, FlyingBotState, GuardBotState, SecurityBotState } from "../../state";
import { useGame } from "../../hooks";

import { BounceBot } from "../BounceBot";
import { FlyingBot } from "../FlyingBot";
import { GuardBot } from "../GuardBot";
import { SecurityBot } from "../SecurityBot";

export type EnemyProps<T> = {
  enemy: T;
  collider: string;
}

export const Enemy: React.FC<EnemyProps<EnemyState>> = ({ enemy }) => {
  const game = useGame();
  const collider = useId();

  useTaggedCollision(collider, 'portal', () => {
    game.current.teleport(enemy);
  });

  return (
    <VirtualInput>
      {enemy.type === 'bounceBot' && (
        <BounceBot enemy={enemy as BounceBotState} collider={collider} />
      )}
      {enemy.type === 'flyingBot' && (
        <FlyingBot enemy={enemy as FlyingBotState} collider={collider} />
      )}
      {enemy.type === 'guardBot' && (
        <GuardBot enemy={enemy as GuardBotState} collider={collider} />
      )}
      {enemy.type === 'securityBot' && (
        <SecurityBot enemy={enemy as SecurityBotState} collider={collider} />
      )}
    </VirtualInput>
  );
};
