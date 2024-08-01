import { BitmapText, CollisionBox, Node, Tilemap, useCachedDynamicProperty } from "@overreact/engine";
import { useCalculatedProperty, useGame } from "../../hooks";
import { BaseBossState } from "../../state";
import { Portal } from "../Portal";
import { HealthBar } from "../HealthBar";
import { LEVELS_FONT, TILESET } from "./assets";
import { LevelFilter } from "./LevelFilter";
import { LevelExplosion } from "./LevelExplosion";

type LevelProps = {
  level: number;
}

export const Level: React.FC<LevelProps> = ({ level }) => {
  const game = useGame();

  const data = game.levels[level - 1];
  const number = String(level).padStart(2, '0');
  const offset = (level - 1) * 200;

  // We show multiple levels, but only one is active.
  const active = useCachedDynamicProperty(game.level, (current) => current === level);

  return (
    <Node pos={[0, offset]}>
      {/* Background tiles, which appear behind any effects. */}
      <LevelFilter>
        <Tilemap tileset={TILESET} tiles={data.background} />
      </LevelFilter>

      {/* Explosions, which cover the background tiles. */}
      <LevelExplosion />
     
      {/* Foreground tiles, the ones that the player actually interacts with. */}
      <LevelFilter>
        <Tilemap tileset={TILESET} tiles={data.foreground} collisions={data.collisions} active={active} />
      </LevelFilter>

      {/* Additional collision boxes to prevent the player jumping out of the arena. */}
      <Node offset={[0, -16]}>
        <CollisionBox size={[16, 16]} tags={['platform', 'right']} />
      </Node>
      <Node offset={[240, -16]}>
        <CollisionBox size={[16, 16]} tags={['platform', 'left']} />
      </Node>
      
      {/* Level number */}
      <BitmapText font={LEVELS_FONT} text={number} />

      {/* Horizontal level wrap portals. */}
      <LevelPortals level={level} />
      
      {/* Health bar for boss fights. */}
      <LevelHealthBar />
    </Node>
  );
};

type LevelPortalsProps = {
  level: number;
};

const LevelPortals: React.FC<LevelPortalsProps> = ({ level }) => {
  const game = useGame();
  const { portals } = game.levels[level - 1];

  return (
    <Node>
      {portals.map((portal, index) => (
        <Portal key={portal.target} level={level} id={index + 1} {...portal} />
      ))}
    </Node>
  );
};

const LevelHealthBar: React.FC = () => {
  const game = useGame();

  const health = useCalculatedProperty(() => {
    return (game.enemies[0] as BaseBossState)?.health.current || 15;
  });

  return (
    <Node offset={[128, 0]}>
      <HealthBar health={health} />
    </Node>
  );
};
