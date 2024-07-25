import { Position, Node, useGamepad, useGamepadButtonMap, useKeyboard, useKeyboardMap, useProperty, useUpdate, useSync } from "@overreact/engine";
import { PlayerIndex } from "../../types";
import { useGame, useSettings } from "../../hooks";
import { useMenuAction } from "../Menu/useMenuAction";
import { ControlsSelector } from "./ControlsSelector";

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

  // Check various input sources, and assign them if the correct key/button was pressed, and the
  // input source wasn't already assigned to a different player.
  useUpdate(() => {
    const isKeyboard = keyboard.isKeyDown('KeyA') && settings.keyboardAssign.current[0] === false;
    const isGamepad1 = gamepad.isButtonDown(0, 'A') && settings.gamepadAssign.current[0] !== 0;
    const isGamepad2 = gamepad.isButtonDown(1, 'A') && settings.gamepadAssign.current[0] !== 1;

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
  const keyboardTaken = useSync(() => settings.keyboardAssign.current[0]);

  return (
    <Node>
      <ControlsSelector index={0} state={p1state} pos={p1pos} instructions="full" />
      {count > 1 && (
        <ControlsSelector index={1} state={p2state} pos={[136, 136]} instructions={keyboardTaken ? 'gamepad' : 'full'}/>
      )}
    </Node>
  );
};
