import { BitmapText, CollisionBox, Node, Tilemap, useCachedDynamicProperty } from "@overreact/engine";
import { useGame } from "../../hooks";
import { LEVELS_FONT, TILESET } from "./assets";

import { LevelFilter } from "./LevelFilter";
import { LevelExplosion } from "./LevelExplosion";
import { LevelHealthBar } from "./LevelHealthBar";
import { LevelPortals } from "./LevelPortals";
import { LevelFlash } from "./LevelFlash";

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
      <Node offset={[0, -8]}>
        <LevelFilter>
          <Tilemap tileset={TILESET} tiles={data.background} />
        </LevelFilter>
      </Node>

      {/* Explosions, which cover the background tiles. */}
      <LevelExplosion />

      {/* Flash, when an enemy is killed. */}
      <LevelFlash level={level} />
     
      {/* Foreground tiles, the ones that the player actually interacts with. */}
      <Node offset={[0, -8]}>
        <LevelFilter>
          <Tilemap tileset={TILESET} tiles={data.foreground} collisions={data.collisions} active={active} />
        </LevelFilter>
      </Node>

      {/* Additional collision boxes to prevent the player jumping out of the arena. */}
      <Node offset={[0, -16]}>
        <CollisionBox size={[16, 16]} tags={['platform', 'right']} active={active} />
      </Node>
      <Node offset={[240, -16]}>
        <CollisionBox size={[16, 16]} tags={['platform', 'left']} active={active} />
      </Node>
      
      {/* Level number */}
      <BitmapText font={LEVELS_FONT} text={number} />

      {/* Horizontal level wrap portals. */}
      <LevelPortals level={level} />
      
      {/* Health bar for boss fights. */}
      <LevelHealthBar level={level} />
    </Node>
  );
};




