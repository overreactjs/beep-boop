import { VirtualInput } from "@overreact/engine";
import { ProjectileState, PlayerZapState, EnemyZapState, PlayerFireballState } from "../../state";
import { PlayerZap } from "./PlayerZap";
import { EnemyZap } from "./EnemyZap";
import { PlayerFireball } from "./PlayerFireball";

export const Projectile: React.FC<{ projectile: ProjectileState }> = ({ projectile }) => {
  return (
    <VirtualInput>
      {projectile.type === 'enemyZap' && (
        <EnemyZap projectile={projectile as EnemyZapState} />
      )}
      {projectile.type === 'playerFireball' && (
        <PlayerFireball projectile={projectile as PlayerFireballState} />
      )}
      {projectile.type === 'playerZap' && (
        <PlayerZap projectile={projectile as PlayerZapState} />
      )}
    </VirtualInput>
  );
};
