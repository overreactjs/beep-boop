import { Box, Camera, Node, Viewport, World, useKeyPressed, useProperty, useSync, useUpdate } from "@overreact/engine";

import { useCamera, useGame } from "../../hooks";
import { Enemy } from "../enemies";
import { EnemyZap } from "../EnemyZap";
import { Item } from "../Item";
import { Level } from "../Level";
import { Player } from "../Player";
import { Points } from "../Points";
import { Zap } from "../Zap";

export const Arena: React.FC = () => {
  const game = useGame();
  const camera = useCamera();
  const timeout = useProperty(5000);

  useKeyPressed('KeyO', () => {
    game.prevLevel();
    camera.current[1] -= 200;
  });

  useKeyPressed('KeyK', () => {
    game.nextLevel();
    camera.current[1] += 200;
  });

  // Once all enemies have fallen, and all of the items have finished falling to the ground, move
  // on to the next level.
  useUpdate((delta) => {
    if (game.enemies.length === 0) {
      if (game.items.some((item) => item.state.current === 'falling')) {
        return;
      }

      if (timeout.current > 0) {
        timeout.current -= delta;
      } else {
        game.nextLevel();
        timeout.current = 5000;
      }
    }
  });

  // Only show the previous level, the current level, and the next level.
  const currentLevel = useSync(() => game.level.current);
  const levels = [];
  const min = Math.max(1, currentLevel - 1);
  const max = Math.min(10, currentLevel + 1);
  for (let i = min; i <= max; i++) {
    levels.push(<Level key={i} level={i} />);
  }

  return (
    <Box pos={[0, 24]} size={[256, 200]} color="#000">
      <Viewport>
        <World>
          {levels}

          <ItemList />
          <EnemyList />
          <PointsList />
          <ZapsList />
          <EnemyZapsList />
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
  const items = useSync(() => game.items);
  return <>{items.map((entry) => <Item key={entry.id} item={entry} />)}</>;
};

const EnemyList: React.FC = () => {
  const game = useGame();
  const enemies = useSync(() => game.enemies);
  return <>{enemies.map((entry) => <Enemy key={entry.id} enemy={entry} />)}</>;
};

const PointsList: React.FC = () => {
  const game = useGame();
  const points = useSync(() => game.points);
  return <>{points.map((entry) => <Points key={entry.id} points={entry} />)}</>;
};

const ZapsList: React.FC = () => {
  const game = useGame();
  const zaps = useSync(() => game.zaps);
  return <>{zaps.map((entry) => <Zap key={entry.id} zap={entry} />)}</>;
};

const EnemyZapsList: React.FC = () => {
  const game = useGame();
  const zaps = useSync(() => game.enemyZaps);
  return <>{zaps.map((entry) => <EnemyZap key={entry.id} zap={entry} />)}</>;
};
