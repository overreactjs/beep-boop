import { BitmapText, Node, Tilemap, useCachedDynamicProperty, useSync } from "@overreact/engine";
import { useCalculatedProperty, useGame } from "../../hooks";
import { BaseBossState } from "../../state";
import { Portal } from "../Portal";
import { HealthBar } from "../HealthBar";
import { LEVELS_FONT, TILESET } from "./assets";
import { Explosion } from "./Explosion";

type LevelProps = {
  level: number;
}

export const Level: React.FC<LevelProps> = ({ level }) => {
  const game = useGame();
  const { foreground, background, collisions, portals } = game.levels[level - 1];
  const number = String(level).padStart(2, '0');
  const offset = (level - 1) * 200;

  // We show multiple levels, but only one is active.
  const active = useCachedDynamicProperty(game.level, (current) => current === level);

  // Show the explosion effect when the dynamite powerup is active.
  const explosion = useCalculatedProperty(false, () => game.hasPowerup('dynamite'));

  // Show the health bar for bosses.
  const health = useSync(() => active.current ? (game.enemies[0] as BaseBossState)?.health || undefined : undefined);

  return (
    <Node>
      <Tilemap pos={[0, offset]} tileset={TILESET} tiles={background} />
      <Explosion offset={offset} visible={explosion} />
      <Tilemap pos={[0, offset]} tileset={TILESET} tiles={foreground} collisions={collisions} active={active} />
      <BitmapText pos={[0, offset]} font={LEVELS_FONT} text={number} />
      {portals.map((portal, index) => <Portal key={portal.target} level={level} id={index + 1} {...portal} />)}
      {health && <HealthBar pos={[128, offset]} health={health} />}
    </Node>
  );
};
