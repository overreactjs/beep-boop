import { BitmapImage, Box, Position, Node, useGamepad, useGamepadButtonMap, useKeyboard, useKeyboardMap, useProperty, useUpdate, useSync } from "@overreact/engine";
import { PlayerIndex } from "../../types";
import { useGame, useSettings } from "../../hooks";
import { useMenuAction } from "../Menu/useMenuAction";
import { BOX, INSTRUCTIONS } from "./assets";
import { ArcadeText } from "../ArcadeText";

type ControlsSelectProps = {
  onBack: () => void;
  onStart: () => void;
};

export const ControlsSelect: React.FC<ControlsSelectProps> = (props) => {
  const { onStart, onBack } = props;
  
  const game = useGame();
  const settings = useSettings();
  const keyboard = useKeyboard();
  const gamepad = useGamepad();

  const player = useProperty<PlayerIndex>(0);
  const guard = useProperty(false);

  useKeyboardMap({ Escape: 'menu_back' });
  useGamepadButtonMap(0, { B: 'menu_back' });
  useGamepadButtonMap(1, { B: 'menu_back' });
  useMenuAction('menu_back', onBack);

  const assign = () => {
    guard.current = true;
    player.current += 1;
    if (player.current >= game.playerCount) {
      onStart();
    }
  }

  const assignKeyboard = () => {
    settings.keyboardAssign.current[player.current] = true;
    settings.gamepadAssign.current[player.current] = null;
    assign();
  };

  const assignGamepad = (index: 0 | 1) => {
    settings.keyboardAssign.current[player.current] = false;
    settings.gamepadAssign.current[player.current] = index;
    assign();
  }

  useUpdate(() => {
    const isKeyboard = keyboard.isKeyDown('KeyA');
    const isGamepad1 = gamepad.isButtonDown(0, 'A');
    const isGamepad2 = gamepad.isButtonDown(1, 'A');

    if (!guard.current) {
      if (isKeyboard) {
        assignKeyboard();
      } else if (isGamepad1) {
        assignGamepad(0);
      } else if (isGamepad2) {
        assignGamepad(1);
      }
    }

    if (!isKeyboard && !isGamepad1 && !isGamepad2) {
      guard.current = false;
    }
  });

  const count = useSync(() => game.playerCount);
  const p1pos: Position = count === 1 ? [76, 136] : [16, 136];
  const p1state = useSync(() => player.current === 0 ? 'active' : 'ready');
  const p2state = useSync(() => player.current === 1 ? 'active' : 'waiting');

  return (
    <Node>
      <ControlsSelector index={0} state={p1state} pos={p1pos} />
      {count > 1 && (
        <ControlsSelector index={1} state={p2state} pos={[136, 136]} />
      )}
    </Node>
  );
};

type ControlsSelectorProps = {
  index: PlayerIndex;
  state: 'waiting' | 'active' |  'ready';
  pos: Position;
}

const ControlsSelector: React.FC<ControlsSelectorProps> = ({ index, state, pos }) => {
  const heading = `PLAYER ${index + 1}`;
  const headingColor = index === 0 ? 'green' : 'blue';

  return (
    <Box pos={pos} size={[104, 88]} color="yellow">
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
          <BitmapImage image={INSTRUCTIONS} size={[56, 16]} pos={[24, 56]} offset={[0, 0]} />
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


