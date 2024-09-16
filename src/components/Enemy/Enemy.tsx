import { useId } from "react";
import { VirtualInput, useTaggedCollision } from "@overreact/engine";
import { EnemyState, BounceBotState, FlyingBotState, GuardBotState, SecurityBotState, RollingBotState } from "../../state";
import { GlitchBotState, GreenOgreState, InvertedBotState, PathfinderBotState, RedOgreState, TeleportBotState } from "../../state/EnemyState";
import { useGame } from "../../hooks";

import { BounceBot } from "./BounceBot";
import { FlyingBot } from "./FlyingBot";
import { GlitchBot } from "./GlitchBot";
import { GreenOgre } from "./GreenOgre";
import { GuardBot } from "./GuardBot";
import { InvertedBot } from "./InvertedBot";
import { PathfinderBot } from "./PathfinderBot";
import { RedOgre } from "./RedOgre";
import { RollingBot } from "./RollingBot";
import { SecurityBot } from "./SecurityBot";
import { TeleportBot } from "./TeleportBot";

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
      {enemy.type === 'glitchBot' && (
        <GlitchBot enemy={enemy as GlitchBotState} collider={collider} />
      )}
      {enemy.type === 'invertedBot' && (
        <InvertedBot enemy={enemy as InvertedBotState} collider={collider} />
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
      {enemy.type === 'teleportBot' && (
        <TeleportBot enemy={enemy as TeleportBotState} collider={collider} />
      )}

      {/* Bosses */}
      {enemy.type === 'greenOgre' && (
        <GreenOgre enemy={enemy as GreenOgreState} collider={collider} />
      )}
      {enemy.type === 'redOgre' && (
        <RedOgre enemy={enemy as RedOgreState} collider={collider} />
      )}

    </VirtualInput>
  );
};
