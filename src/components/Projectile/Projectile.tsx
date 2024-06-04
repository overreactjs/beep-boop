import { VirtualInput } from "@overreact/engine";
import { ProjectileState, PlayerZapState, EnemyZapState, PlayerFireballState, FlyingStarState, EnemyFireballState } from "../../state";
import { EnemyZap } from "./EnemyZap";
import { FlyingStar } from "./FlyingStar";
import { PlayerFireball } from "./PlayerFireball";
import { PlayerZap } from "./PlayerZap";
import { EnemyFireball } from "./EnemyFireball";

export const Projectile: React.FC<{ projectile: ProjectileState }> = ({ projectile }) => {
  return (
    <VirtualInput>
      {projectile.type === 'enemyFireball' && (
        <EnemyFireball projectile={projectile as EnemyFireballState} />
      )}
      {projectile.type === 'enemyZap' && (
        <EnemyZap projectile={projectile as EnemyZapState} />
      )}
      {projectile.type === 'flyingStar' && (
        <FlyingStar projectile={projectile as FlyingStarState} />
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
