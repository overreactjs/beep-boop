import { VirtualInput } from "@overreact/engine";
import { ProjectileState, PlayerZapState, EnemyZapState, PlayerFireballState, FlyingStarState } from "../../state";
import { EnemyZap } from "./EnemyZap";
import { FlyingStar } from "./FlyingStar";
import { PlayerFireball } from "./PlayerFireball";
import { PlayerZap } from "./PlayerZap";

export const Projectile: React.FC<{ projectile: ProjectileState }> = ({ projectile }) => {
  return (
    <VirtualInput>
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
