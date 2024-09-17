import { Box, Camera, Node, ParticleEngine, Particles, Viewport, VirtualInput, World, useSync } from "@overreact/engine";
import { useCamera, useCheatCodes, useDeveloperMode, useGame, useSettings } from "../../hooks";
import { ProjectileType } from "../../types";

import { Enemy } from "../Enemy";
import { Item } from "../Item";
import { Level } from "../Level";
import { Player } from "../Player";
import { Points } from "../Points";
import { Projectile } from "../Projectile";
import { Ending } from "../Ending";
import { Glitch } from "../Glitch";
import { Message } from "./Message";

type ArenaProps = {
  onEndGame: () => void;
}

export const Arena: React.FC<ArenaProps> = ({ onEndGame }) => {
  const game = useGame();
  const settings = useSettings();
  const camera = useCamera();

  // Enable a whole bunch of special developer key bindings.
  useDeveloperMode(camera);

  // Enable some cheat codes.
  useCheatCodes(camera);

  // Only show the previous level, the current level, and the next level.
  const currentLevel = useSync(() => game.level.current);
  const levels = [];
  const min = Math.max(1, currentLevel - 1);
  const max = Math.min(game.levels.length, currentLevel + 1);
  for (let i = min; i <= max; i++) {
    levels.push(<Level key={i} level={i} />);
  }

  const glitchMode = useSync(() => game.glitchMode.current);

  return (
    <Node>
      <Box pos={[0, 24]} size={[256, 200]} color="#000">
        <Node timeScale={game.timescale}>
          <ParticleEngine>
            <Viewport>
              <World>
                {levels}
                <Ending onEndGame={onEndGame} />

                <Particles />
                <ItemList />
                <PointsList />
                
                <VirtualInput>
                  <Player index={1} />
                </VirtualInput>
                <VirtualInput>
                  <Player index={0} />
                </VirtualInput>
                
                <Node timeScale={settings.enemySpeed}>
                  <EnemyList />
                  <EnemyProjectilesList />
                </Node>
                
                <PlayerProjectilesList />

                {glitchMode && <Glitch />}

                <Node pos={camera}>
                  <Camera />
                </Node>
              </World>
            </Viewport>
          </ParticleEngine>
        </Node>

        <Messages />
      </Box>
    </Node>
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

const ENEMY_PROJECTILES: ProjectileType[] = ['enemyFireball', 'enemyZap'];

const EnemyProjectilesList: React.FC = () => {
  const game = useGame();
  const projectiles = useSync(() => game.projectiles.filter(({ type }) => ENEMY_PROJECTILES.includes(type)));
  return <>{projectiles.map((entry) => <Projectile key={entry.id} projectile={entry} />)}</>;
};

const PlayerProjectilesList: React.FC = () => {
  const game = useGame();
  const projectiles = useSync(() => game.projectiles.filter(({ type }) => !ENEMY_PROJECTILES.includes(type)));
  return <>{projectiles.map((entry) => <Projectile key={entry.id} projectile={entry} />)}</>;
};

const Messages: React.FC = () => {
  const game = useGame();

  return (
    <>
      <Message text="HURRY UP!!!" color1="#ff0" color2="#f00" condition={game.hurryMode} />
      <Message text="TOO LATE!!!" color1="#f00" color2="#f0f" condition={game.glitchMode} />
    </>
  )
}
