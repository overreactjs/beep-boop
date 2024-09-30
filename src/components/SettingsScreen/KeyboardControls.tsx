import { KeyboardKeyName, useDynamicProperty, useKeyboard, useProperty, useUpdate, VariableProperty } from "@overreact/engine";
import { Menu, MenuItem } from "../Menu";
import { MenuLabel, MenuStatic } from "../Menu/MenuLabel";
import { useSettings } from "../../hooks";
import { ARROWS, KEYS } from "./constants";

type KeyboardControlsProps = {
  onBack: () => void;
};

export const KeyboardControls: React.FC<KeyboardControlsProps> = (props) => {
  const { onBack } = props;

  const keyboard = useKeyboard();
  const settings = useSettings(); 
  const keyLeft = useKeyBinding(settings.keyBindings, 'left');
  const keyRight = useKeyBinding(settings.keyBindings, 'right');
  const keyJump = useKeyBinding(settings.keyBindings, 'jump');
  const keyFire = useKeyBinding(settings.keyBindings, 'fire');
  const keyDown = useKeyBinding(settings.keyBindings, 'down');

  const active = useProperty(true);
  const editing = useProperty<string | null>(null);

  const handleSelect = (index: number) => {
    switch (index) {
      case 0:
        return onBack();
      case 1:
        return setEditing('left');
      case 2:
        return setEditing('right');
      case 3:
        return setEditing('jump');
      case 4:
        return setEditing('down');
      case 5:
        return setEditing('fire');
    }
  };

  const handleChange = (index: number) => {
    switch (index) {
      case 1:
        return;
    }
  };

  /**
   * Switch to edit mode, for the given player action.
   */
  const setEditing = (action: string) => {
    settings.keyBindings.clear(action);
    editing.current = action;
    active.current = false;
  };

  /**
   * Listen for any key presses when we're in edit mode, and if the user pressed a key that can be
   * bound to a player action, bind it and leave edit mode.
   */
  useUpdate(() => {
    if (editing.current !== null && keyboard.down.current.size > 0) {
      const key = [...keyboard.down.current][0] as KeyboardKeyName;

      if (Object.keys(KEYS).includes(key)) {
        settings.keyBindings.set(editing.current, key);
        editing.current = null;
        setTimeout(() => active.current = true, 250);
      }
    }
  });

  return (
    <Menu onSelect={handleSelect} onChange={handleChange} onBack={onBack} active={active}>
      <MenuStatic pos={[16, 32]} text="KEYBOARD CONTROLS" color="#f0f" />
      <MenuItem index={0} pos={[32, 48]} text="BACK" />

      <MenuLabel index={1} pos={[32, 64]} text="MOVE / MENU LEFT" />
      <MenuItem index={1} pos={[240, 64]} text={keyLeft} arrows={ARROWS} align="right" />

      <MenuLabel index={2} pos={[32, 80]} text="MOVE / MENU RIGHT" />
      <MenuItem index={2} pos={[240, 80]} text={keyRight} arrows={ARROWS} align="right" />

      <MenuLabel index={3} pos={[32, 96]} text="JUMP / MENU UP" />
      <MenuItem index={3} pos={[240, 96]} text={keyJump} arrows={ARROWS} align="right" />

      <MenuLabel index={4} pos={[32, 112]} text="MENU DOWN" />
      <MenuItem index={4} pos={[240, 112]} text={keyDown} arrows={ARROWS} align="right" />

      <MenuLabel index={5} pos={[32, 128]} text="FIRE / SELECT" />
      <MenuItem index={5} pos={[240, 128]} text={keyFire} arrows={ARROWS} align="right" />
    </Menu>
  );
};

const useKeyBinding = (bindings: VariableProperty<Partial<Record<KeyboardKeyName, string>>>, action: string) => {
  return useDynamicProperty(bindings, (bindings): string => {
    const key = Object.entries(bindings).find((entry) => entry[1] === action)?.[0] as KeyboardKeyName;
    return KEYS[key] ?? '???';
  });
};
