import { BitmapText, Node, Tilemap, useCachedDynamicProperty, useSync } from "@overreact/engine";
import { useGame } from "../../hooks";
import { BaseBossState } from "../../state";
import { Portal } from "../Portal";
import { HealthBar } from "../HealthBar";
import { LEVELS_FONT, TILESET } from "./assets";
import { LevelBackground } from "./LevelBackground";

type LevelProps = {
  level: number;
}

export const Level: React.FC<LevelProps> = ({ level }) => {
  const game = useGame();
  const { foreground, background, collisions, portals } = game.levels[level - 1];
  const number = String(level).padStart(2, '0');
  const offset = (level - 1) * 200;

  const active = useCachedDynamicProperty(game.level, (current) => current === level);
  const explosion = useSync(() => game.hasPowerup('dynamite'));
  const health = useSync(() => {
    return level === game.level.current ? (game.enemies[0] as BaseBossState)?.health || undefined : undefined;
  });

  return (
    <Node>
      <Tilemap pos={[0, offset]} tileset={TILESET} tiles={background} />
      {explosion && <LevelBackground offset={offset} color="#f00"/>}
      <Tilemap pos={[0, offset]} tileset={TILESET} tiles={foreground} collisions={collisions} active={active} />
      <BitmapText pos={[0, offset]} font={LEVELS_FONT} text={number} />
      {portals.map((portal, index) => <Portal key={portal.target} level={level} id={index + 1} {...portal} />)}
      {health && <HealthBar pos={[128, offset]} health={health} />}
    </Node>
  );
};
