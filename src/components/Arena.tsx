import { Box, Camera, Node, Viewport, World, useSync } from "@overreact/engine";
import { useGame } from "../hooks";
import { Enemy } from "./Enemy";
import { Items } from "./Items";
import { Level } from "./Level";
import { Player } from "./Player";
import { Points } from "./Points";
import { Zap } from "./Zap";

export const Arena: React.FC = () => {
  const game = useGame();
  const points = useSync(() => game.current.points);
  const zaps = useSync(() => game.current.zaps);
  const enemies = useSync(() => game.current.enemies);

  return (
    <Box pos={[0, 24]} size={[256, 200]} color="#000">
      <Viewport>
        <World>
          <Level />
          <Items />
          {enemies.map((enemy) => <Enemy key={enemy.id} enemy={enemy} />)}
          {points.map((entry) => <Points key={entry.id} points={entry} />)}
          {zaps.map((zap) => <Zap key={zap.id} zap={zap} />)}
          <Player />
          <Node pos={[128, 100]}>
            <Camera />
          </Node>
        </World>
      </Viewport>
    </Box>
  );
};
