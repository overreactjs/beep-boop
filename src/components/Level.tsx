import { Box, CollisionBox, Node, Tilemap, useDynamicProperty, useSync } from "@overreact/engine";
import { TILESET } from "../assets";
import { LEVELS } from "../data";
import { useGame } from "../hooks";
import { ArcadeText } from "./ArcadeText";

export const Level = () => {
  const game = useGame();
  const number = useDynamicProperty(game.current.level, (level) => String(level).padStart(2, '0'));
  const level = useSync(() => game.current.level.current);
  const { background, foreground, tiles, collisions } = LEVELS[level - 1];

  return (
    <Node>
      <Tilemap pos={[0, 0]} tileset={TILESET} tiles={tiles} collisions={collisions} />
      <Box pos={[0, 0]} size={[16, 8]} color={background} />
      <ArcadeText pos={[0, 0]} color={foreground} text={number} />
      {/* <CollisionBox pos={[0, 0]} size={[256, 8]} tags={['solid']} /> */}
      <CollisionBox pos={[0, 8]} size={[16, 184]} tags={['solid']} />
      <CollisionBox pos={[240, 8]} size={[16, 184]} tags={['solid']} />
    </Node>
  );
};
