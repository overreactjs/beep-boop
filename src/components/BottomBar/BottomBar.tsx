import { Box, Node } from "@overreact/engine";
import { Circuits } from "../Circuits";

export const BottomBar: React.FC = () => {
  return (
    <Node>
      <Box pos={[0, 224]} size={[256, 16]} color="black">
        <Circuits pos={[88, 0]} />
      </Box>
    </Node>
  );
};
