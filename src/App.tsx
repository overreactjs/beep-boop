import { Box, Camera, CollisionBox, Device, Engine, Node, Tilemap, Viewport, World, useFixedUpdate, useProperty, useSync } from "@overreact/engine";
import { TILESET } from "./assets";
import { ArcadeText, Game, Item, Player, Scoreboard, Screen } from "./components";
import { LEVELS } from "./data";
import { useGame } from "./hooks";

export const App = () => {
  return (
    <Engine>
      <Device mode="desktop" bg="black" showFPS hideClose>
        <Screen size={[256, 240]} scale="auto">
          <Game>
            <TopBar />
            <Arena />
          </Game>
        </Screen>
      </Device>
    </Engine>
  );
};

const TopBar = () => {
  const game = useGame();
  const highscore = useProperty(game.current.highscore);
  const score1 = useProperty(game.current.players[0].score);
  const score2 = useProperty(game.current.players[1].score);
  
  return (
    <Node>
      <ArcadeText pos={[16, 0]} color="#0f0" text="1UP" />
      <ArcadeText pos={[88, 0]} color="#f00" text="HIGH SCORE" />
      <ArcadeText pos={[216, 0]} color="#0ff" text="2UP" />
      <Scoreboard pos={[0, 8]} score={score1} />
      <Scoreboard pos={[104, 8]} score={highscore} />
      <Scoreboard pos={[200, 8]} score={score2} />
    </Node>
  );
};

const Arena = () => {
  const game = useGame();

  useFixedUpdate(1, () => {
    game.current.createRandomItem();
  });

  return (
    <Box pos={[0, 24]} size={[256, 200]} color="#000">
      <Viewport>
        <World>
          <Level />
          <Player />
          <Items />
          <ArenaCamera />
        </World>
      </Viewport>
    </Box>
  );
};

const ArenaCamera = () => {
  return (
    <Node pos={[128, 100]}>
      <Camera />
    </Node>
  );
};

const Level = () => {
  const game = useGame();
  const level = useSync(() => game.current.level.current);
  const { tiles, collisions } = LEVELS[level - 1];

  return (
    <Node>
      <Tilemap pos={[0, 0]} tileset={TILESET} tiles={tiles} collisions={collisions} />
      <CollisionBox pos={[0, 0]} size={[256, 8]} tags={['solid']} />
      <CollisionBox pos={[0, 192]} size={[256, 8]} tags={['solid']} />
      <CollisionBox pos={[0, 8]} size={[16, 184]} tags={['solid']} />
      <CollisionBox pos={[240, 8]} size={[16, 184]} tags={['solid']} />
    </Node>
  );
};

const Items = () => {
  const game = useGame();
  const items = useSync(() => game.current.items);

  return (
    <Node>
      {items.map((item) => (
        <Item key={item.id} item={item} />
      ))}
    </Node>
  );
};
