import { Box, Camera, Node, Viewport, World, useKeyPressed, useSync } from "@overreact/engine";
import { useCamera, useGame } from "../hooks";
import { Level } from "./Level";
import { Player } from "./Player";
import { Enemy } from "./Enemy";
import { Points } from "./Points";
import { Zap } from "./Zap";
import { Item } from "./Item";

export const Arena: React.FC = () => {
  const game = useGame();
  const camera = useCamera();

  useKeyPressed('KeyO', () => {
    game.current.prevLevel();
  });

  useKeyPressed('KeyK', () => {
    game.current.nextLevel();
  });

  useKeyPressed('KeyJ', () => {
    game.current.init();
  });

  return (
    <Box pos={[0, 24]} size={[256, 200]} color="#000">
      <Viewport>
        <World>
          <Level level={1} />
          <Level level={2} />

          <ItemList />
          <EnemyList />
          <PointsList />
          <ZapsList />
          <Player />

          <Node pos={camera}>
            <Camera />
          </Node>
        </World>
      </Viewport>
    </Box>
  );
};

const ItemList: React.FC = () => {
  const game = useGame();
  const items = useSync(() => game.current.items);
  return <>{items.map((entry) => <Item key={entry.id} item={entry} />)}</>;
};

const EnemyList: React.FC = () => {
  const game = useGame();
  const enemies = useSync(() => game.current.enemies);
  return <>{enemies.map((entry) => <Enemy key={entry.id} enemy={entry} />)}</>;
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