import { Box, Camera, CollisionBox, Device, Engine, Node, Tilemap, Viewport, World } from "@overreact/engine";
import { TILESET } from "./assets";
import { ArcadeText, Player, Scoreboard, Screen } from "./components";
import { LEVEL001 } from "./data";

export const App = () => {
  return (
    <Engine>
      <Device mode="desktop" bg="black" showFPS hideClose>
        <Screen size={[256, 240]} scale="auto">
          <TopBar />
          <Arena />
        </Screen>
      </Device>
    </Engine>
  );
};

const TopBar = () => {
  return (
    <Node>
      <ArcadeText pos={[16, 0]} color="#0f0" text="1UP" />
      <ArcadeText pos={[88, 0]} color="#f00" text="HIGH SCORE" />
      <ArcadeText pos={[216, 0]} color="#0ff" text="2UP" />
      <Scoreboard pos={[8, 8]} score={34080} />
      <Scoreboard pos={[104, 8]} score={165240} />
      <Scoreboard pos={[208, 8]} score={76050} />
    </Node>
  );
};

const Arena = () => {
  return (
    <Box pos={[0, 24]} size={[256, 200]} color="#000">
      <Viewport>
        <World>
          <Level />
          <Player />
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
  return (
    <Node>
      <Tilemap pos={[0, 0]} tileset={TILESET} tiles={LEVEL001.tiles} collisions={LEVEL001.collisions} />
      <CollisionBox pos={[0, 0]} size={[256, 8]} tags={['solid']} />
      <CollisionBox pos={[0, 192]} size={[256, 8]} tags={['solid']} />
      <CollisionBox pos={[0, 8]} size={[16, 184]} tags={['solid']} />
      <CollisionBox pos={[240, 8]} size={[16, 184]} tags={['solid']} />
    </Node>
  );
};




