import { BitmapText, CollisionBox, Node, Tilemap, useDynamicProperty } from "@overreact/engine";
import { LEVELS_FONT, TILESET } from "../assets";
import { LEVELS } from "../data";
import { useGame } from "../hooks";

type LevelProps = {
  level: number;
}

export const Level: React.FC<LevelProps> = ({ level }) => {
  const { tiles, collisions } = LEVELS[level - 1];
  const number = String(level).padStart(2, '0');
  const offset = (level - 1) * 200;

  const game = useGame();
  const active = useDynamicProperty(game.current.level, (current) => current === level);

  return (
    <Node>
      <Tilemap pos={[0, offset]} tileset={TILESET} tiles={tiles} collisions={collisions} active={active} />
      <BitmapText pos={[0, offset]} font={LEVELS_FONT} text={number} />
      <CollisionBox pos={[0, offset]} size={[16, 200]} tags={['solid']} />
      <CollisionBox pos={[240, offset]} size={[16, 200]} tags={['solid']} />
    </Node>
  );
};
