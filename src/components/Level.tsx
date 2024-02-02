import { BitmapText, CollisionBox, Node, Tilemap } from "@overreact/engine";
import { LEVELS_FONT, TILESET } from "../assets";
import { LEVELS } from "../data";

type LevelProps = {
  level: number;
}

export const Level: React.FC<LevelProps> = ({ level }) => {
  const { tiles, collisions } = LEVELS[level - 1];
  const number = String(level).padStart(2, '0');

  return (
    <Node>
      <Tilemap pos={[0, 0]} tileset={TILESET} tiles={tiles} collisions={collisions} />
      <BitmapText pos={[0, 0]} font={LEVELS_FONT} text={number} />
      <CollisionBox pos={[0, 8]} size={[16, 184]} tags={['solid']} />
      <CollisionBox pos={[240, 8]} size={[16, 184]} tags={['solid']} />
    </Node>
  );
};
