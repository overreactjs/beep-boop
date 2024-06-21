import { Box, Node } from "@overreact/engine";
import { Circuits } from "../Circuits";
import { Lives } from "../Lives";
import { useGame } from "../../hooks";

export const BottomBar: React.FC = () => {
  const game = useGame();
  
  return (
    <Node>
      <Box pos={[0, 224]} size={[256, 16]} color="black">
        <Lives pos={[0, 4]} lives={game.players[0].lives} />
        <Circuits pos={[88, 0]} />
        <Lives pos={[216, 4]} lives={game.players[1].lives} />
      </Box>
    </Node>
  );
};
