import { VirtualInput } from "@overreact/engine";
import { ProjectileState, PlayerZapState, EnemyZapState } from "../../state";
import { PlayerZap } from "./PlayerZap";
import { EnemyZap } from "./EnemyZap";

export const Projectile: React.FC<{ projectile: ProjectileState }> = ({ projectile }) => {
  return (
    <VirtualInput>
      {projectile.type === 'enemyZap' && (
        <EnemyZap projectile={projectile as EnemyZapState} />
      )}
      {projectile.type === 'playerZap' && (
        <PlayerZap projectile={projectile as PlayerZapState} />
      )}
    </VirtualInput>
  );
};
