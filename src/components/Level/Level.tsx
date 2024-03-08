import { BitmapText, Node, Tilemap, useDynamicProperty } from "@overreact/engine";
import { LEVELS } from "../../data";
import { useGame } from "../../hooks";
import { Portal } from "../Portal";
import { LEVELS_FONT, TILESET } from "./assets";

type LevelProps = {
  level: number;
}

export const Level: React.FC<LevelProps> = ({ level }) => {
  const game = useGame();
  const { tiles, collisions, portals } = game.levels[level - 1];
  const number = String(level).padStart(2, '0');
  const offset = (level - 1) * 200;

  const active = useCachedDynamicProperty(game.level, (current) => current === level);

  return (
    <Node>
      <Tilemap pos={[0, offset]} tileset={TILESET} tiles={tiles} collisions={collisions} active={active} />
      <BitmapText pos={[0, offset]} font={LEVELS_FONT} text={number} />
      {portals.map((portal, index) => <Portal key={portal.target} level={level} id={index + 1} {...portal} />)}
    </Node>
  );
};
