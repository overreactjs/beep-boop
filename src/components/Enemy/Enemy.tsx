import { useId } from "react";
import { VirtualInput, useTaggedCollision } from "@overreact/engine";
import { EnemyState, BounceBotState, FlyingBotState, GuardBotState, SecurityBotState, RollingBotState } from "../../state";
import { GreenOgreState, PathfinderBotState } from "../../state/EnemyState";
import { useGame } from "../../hooks";

import { BounceBot } from "./BounceBot";
import { FlyingBot } from "./FlyingBot";
import { GuardBot } from "./GuardBot";
import { RollingBot } from "./RollingBot";
import { SecurityBot } from "./SecurityBot";
import { PathfinderBot } from "./PathfinderBot";
import { GreenOgre } from "./GreenOgre";

export const Enemy: React.FC<{ enemy: EnemyState }> = ({ enemy }) => {
  const game = useGame();
  const collider = useId();

  useTaggedCollision(collider, 'portal', () => {
    game.teleport(enemy);
  });

  return (
    <VirtualInput>
      {/* Regular enemies */}
      {enemy.type === 'bounceBot' && (
        <BounceBot enemy={enemy as BounceBotState} collider={collider} />
      )}
      {enemy.type === 'flyingBot' && (
        <FlyingBot enemy={enemy as FlyingBotState} collider={collider} />
      )}
      {enemy.type === 'guardBot' && (
        <GuardBot enemy={enemy as GuardBotState} collider={collider} />
      )}
      {enemy.type === 'pathfinderBot' && (
        <PathfinderBot enemy={enemy as PathfinderBotState} collider={collider} />
      )}
      {enemy.type === 'rollingBot' && (
        <RollingBot enemy={enemy as RollingBotState} collider={collider} />
      )}
      {enemy.type === 'securityBot' && (
        <SecurityBot enemy={enemy as SecurityBotState} collider={collider} />
      )}

      {/* Bosses */}
      {enemy.type === 'greenOgre' && (
        <GreenOgre enemy={enemy as GreenOgreState} collider={collider} />
      )}

    </VirtualInput>
  );
};
