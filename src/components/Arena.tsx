import { Box, Camera, Node, Viewport, World, useSync } from "@overreact/engine";
import { useGame } from "../hooks";
import { Enemy } from "./Enemy";
import { Items } from "./Items";
import { Level } from "./Level";
import { Player } from "./Player";
import { Points } from "./Points";
import { Zap } from "./Zap";

export const Arena: React.FC = () => {
  return (
    <Box pos={[0, 24]} size={[256, 200]} color="#000">
      <Viewport>
        <World>
          <Level level={1} />
          <Items />
          <EnemyList />
          <PointsList />
          <ZapsList />
          <Player />
          <Node pos={[128, 100]}>
            <Camera />
          </Node>
        </World>
      </Viewport>
    </Box>
  );
};

const EnemyList: React.FC = () => {
  const game = useGame();
  const enemies = useSync(() => game.current.enemies);
  return <>{enemies.map((enemy) => <Enemy key={enemy.id} enemy={enemy} />)}</>;
};

const PointsList: React.FC = () => {
  const game = useGame();
  const points = useSync(() => game.current.points);
  return <>{points.map((entry) => <Points key={entry.id} points={entry} />)}</>;
};

const ZapsList: React.FC = () => {
  const game = useGame();
  const zaps = useSync(() => game.current.zaps);
  return <>{zaps.map((entry) => <Zap key={entry.id} zap={entry} />)}</>;
};
