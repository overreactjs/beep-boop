import { Position, Box, BitmapImage, Node } from "@overreact/engine";
import { PlayerIndex } from "../../types";
import { ArcadeText } from "../ArcadeText";
import { INSTRUCTIONS_FULL, INSTRUCTIONS_GAMEPAD, BOX } from "./assets";

type ControlsSelectorProps = {
  index: PlayerIndex;
  pos: Position;
  state: 'waiting' | 'active' |  'ready';
  instructions: 'full' | 'gamepad';
}

export const ControlsSelector: React.FC<ControlsSelectorProps> = ({ index, pos, state, instructions }) => {
  const heading = `PLAYER ${index + 1}`;
  const headingColor = index === 0 ? 'green' : 'blue';
  const image = instructions === 'full' ? INSTRUCTIONS_FULL : INSTRUCTIONS_GAMEPAD;

  return (
    <Box pos={pos} size={[104, 88]}>
      <BitmapImage image={BOX} size={[104, 88]} pos={[0, 0]} offset={[0, 0]} />
      <ArcadeText pos={[20, 8]} color={headingColor} text={heading} />

      {state === 'waiting' && (
        <Node>
          <ArcadeText pos={[24, 40]} color="white" text="WAITING" />
          <ArcadeText pos={[24, 56]} color="white" text="FOR P1!" />
        </Node>
      )}

      {state === 'active' && (
        <Node>
          <ArcadeText pos={[32, 40]} color="white" text="PRESS" />
          <BitmapImage image={image} size={[56, 16]} pos={[24, 56]} offset={[0, 0]} />
        </Node>
      )}

      {state === 'ready' && (
        <Node>
          <ArcadeText pos={[32, 48]} color="white" text="READY" />
        </Node>
      )}
    </Box>
  );
};
