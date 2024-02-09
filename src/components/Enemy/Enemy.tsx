import { useId } from "react";
import { VirtualInput, useTaggedCollision } from "@overreact/engine";
import { EnemyState } from "../../state";
import { EnemyType } from "../../types";
import { useGame } from "../../hooks";

import { BounceBot } from "../BounceBot";
import { GuardBot } from "../GuardBot";
import { SecurityBot } from "../SecurityBot";

const ENEMIES: Record<EnemyType, React.FC<EnemyProps>> = {
  bounceBot: BounceBot,
  guardBot: GuardBot,
  securityBot: SecurityBot,
};

export type EnemyProps = {
  enemy: EnemyState;
  collider: string;
}

export const Enemy: React.FC<EnemyProps> = ({ enemy }) => {
  const Component = ENEMIES[enemy.type];

  const game = useGame();
  const collider = useId();

  useTaggedCollision(collider, 'portal', () => {
    game.current.teleport(enemy);
  });

  return (
    <VirtualInput>
      <Component enemy={enemy} collider={collider} />
    </VirtualInput>
  );
};
