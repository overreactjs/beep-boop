import { Box, Camera, Node, Viewport, World, useFixedUpdate } from "@overreact/engine";
import { useGame } from "../hooks";
import { Items } from "./Items";
import { Level } from "./Level";
import { Player } from "./Player";

export const Arena: React.FC = () => {
  const game = useGame();

  useFixedUpdate(1, () => {
    game.current.createRandomItem();
  });

  return (
    <Box pos={[0, 24]} size={[256, 200]} color="#000">
      <Viewport>
        <World>
          <Level />
          <Items />
          <Player />
          <Node pos={[128, 100]}>
            <Camera />
          </Node>
        </World>
      </Viewport>
    </Box>
  );
};
