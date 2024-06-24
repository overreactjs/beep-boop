import { Box, Node, Position } from "@overreact/engine";
import { Circuits } from "../Circuits";
import { Lives } from "../Lives";
import { useGame } from "../../hooks";

const P1_POS: Position = [0, 4];
const P2_POS: Position = [216, 4];

export const BottomBar: React.FC = () => {
  const game = useGame();
  
  return (
    <Node>
      <Box pos={[0, 224]} size={[256, 16]} color="black">
        <Lives index={0} pos={P1_POS} player={game.players[0]} />
        <Circuits pos={[88, 0]} />
        <Lives index={1} pos={P2_POS} player={game.players[1]} />
      </Box>
    </Node>
  );
};
