import { BitmapImage, Box, Position, Prop, useCachedDynamicProperty, usePosition } from "@overreact/engine"
import { CIRCUITS } from "./assets";
import { useGame } from "../../hooks";

type CircuitsProps = {
  pos: Prop<Position>;
}

export const Circuits: React.FC<CircuitsProps> = (props) => {
  const pos = usePosition(props.pos);

  return (
    <Box pos={pos} size={[80, 16]}>
      <Letter index={0} />
      <Letter index={1} />
      <Letter index={2} />
      <Letter index={3} />
      <Letter index={4} />
    </Box>
  );
};

type LetterProps = {
  index: number;
}

const Letter: React.FC<LetterProps> = ({ index }) => {
  const game = useGame();
  const x = 16 * index;
  const mask = 2 ** index;

  const offset = useCachedDynamicProperty(game.circuits, (circuits): Position => {
    return (circuits & mask) === mask ? [x, 0] : [x, 16];
  });

  return <BitmapImage image={CIRCUITS} pos={[x, 0]} size={[16, 16]} offset={offset} />;
};
