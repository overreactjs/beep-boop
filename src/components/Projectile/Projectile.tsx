import { VirtualInput } from "@overreact/engine";

import { ProjectileState, PlayerZapState, EnemyZapState, PlayerFireballState, FlyingStarState, EnemyFireballState, PlayerRainbowState } from "../../state";

import { EnemyFireball } from "./EnemyFireball";
import { EnemyZap } from "./EnemyZap";
import { FlyingStar } from "./FlyingStar";
import { PlayerFireball } from "./PlayerFireball";
import { PlayerRainbow } from "./PlayerRainbow";
import { PlayerZap } from "./PlayerZap";

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
      {projectile.type === 'playerRainbow' && (
        <PlayerRainbow projectile={projectile as PlayerRainbowState} />
      )}
      {projectile.type === 'playerZap' && (
        <PlayerZap projectile={projectile as PlayerZapState} />
      )}
    </VirtualInput>
  );
};
