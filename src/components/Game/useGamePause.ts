import { useGamepadButtonMap, useKeyboardMap, useProperty, useUpdate, useVirtualInput } from "@overreact/engine";
import { useGame } from "../../hooks";

export const useGamePause = () => {
  useKeyboardMap({ KeyP: 'pause', Escape: 'pause' });
  useGamepadButtonMap(0, { Select: 'pause' });
  useGamepadButtonMap(1, { Select: 'pause' });

  const game = useGame();
  const input = useVirtualInput();
  const guard = useProperty(false);

  useUpdate(() => {
    if (input.isActive('pause')) {
      if (!guard.current) {
        guard.current = true;

        if (!game.paused.current) {
          game.pause();
        }
      }
    } else {
      guard.current = false;
    }
  });
};
