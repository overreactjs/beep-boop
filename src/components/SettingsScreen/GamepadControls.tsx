import React from 'react';
import { BitmapImage, GamepadButtonName, Node, Position, Prop, useDynamicProperty, useGamepad, useProperty, useUpdate, useVirtualAction, VariableProperty } from "@overreact/engine";
import { Menu, MenuItem } from "../Menu";
import { MenuItemProps } from "../Menu/MenuItem";
import { MenuLabel, MenuStatic } from "../Menu/MenuLabel";
import { useSettings } from "../../hooks";
import { ARROWS, BUTTONS } from "./constants";
import { GAMEPAD_IMAGE } from "./assets";
import { useBooleanOption } from './useBooleanOption';

type GamepadControlsProps = {
  onBack: () => void;
};

export const GamepadControls: React.FC<GamepadControlsProps> = (props) => {
  const { onBack } = props;

  const gamepad = useGamepad();
  const settings = useSettings(); 
  const buttonLeft = useButtonBinding(settings.buttonBindings, 'left');
  const buttonRight = useButtonBinding(settings.buttonBindings, 'right');
  const buttonJump = useButtonBinding(settings.buttonBindings, 'jump');
  const buttonFire = useButtonBinding(settings.buttonBindings, 'fire');
  const gamepadAnalogStick = useBooleanOption(settings.gamepadAnalogStick);
  const gamepadRumble = useBooleanOption(settings.gamepadRumble);

  const active = useProperty(true);
  const editing = useProperty<string | null>(null);
  const previous = useProperty<GamepadButtonName | null>(null);

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
        return setEditing('fire');
    }
  };

  const handleChange = (index: number) => {
    switch (index) {
      case 5:
        return settings.gamepadAnalogStick.toggle();
      case 6:
        return settings.gamepadRumble.toggle();
    }
  };

  /**
   * Switch to edit mode, for the given player action.
   */
  const setEditing = (action: string) => {
    previous.current = settings.buttonBindings.get(action);
    settings.buttonBindings.clear(action);
    editing.current = action;
    active.current = false;
  };

  /**
   * Listen for any key presses when we're in edit mode, and if the user pressed a key that can be
   * bound to a player action, bind it and leave edit mode.
   */
  useUpdate(() => {
    if (editing.current !== null && gamepad.down.current.size > 0) {
      console.log(...gamepad.down.current);

      const button = [...gamepad.down.current][0];

      if (Object.keys(BUTTONS).includes(button)) {
        settings.buttonBindings.set(editing.current, button);
        editing.current = null;
        setTimeout(() => active.current = true, 250);
      }
    }
  });

  useVirtualAction('menu_back', () => {
    if (editing.current !== null && previous.current !== null && !active.current) {
      settings.buttonBindings.set(editing.current, previous.current);
      editing.current = null;
      setTimeout(() => active.current = true, 250);
    }
  });

  return (
    <Menu onSelect={handleSelect} onChange={handleChange} onBack={onBack} active={active}>
      <MenuStatic pos={[16, 32]} text="KEYBOARD CONTROLS" color="#f0f" />
      <MenuItem index={0} pos={[32, 48]} text="BACK" />

      <MenuLabel index={1} pos={[32, 64]} text="MOVE LEFT" />
      <MenuGamepadButtonItem index={1} pos={[208, 64]} offset={buttonLeft}  />

      <MenuLabel index={2} pos={[32, 80]} text="MOVE RIGHT" />
      <MenuGamepadButtonItem index={2} pos={[208, 80]} offset={buttonRight} />

      <MenuLabel index={3} pos={[32, 96]} text="JUMP UP" />
      <MenuGamepadButtonItem index={3} pos={[208, 96]} offset={buttonJump} />

      <MenuLabel index={4} pos={[32, 112]} text="FIRE" />
      <MenuGamepadButtonItem index={4} pos={[208, 112]} offset={buttonFire} />

      <MenuLabel index={5} pos={[32, 128]} text="ANALOG STICK" />
      <MenuItem index={5} pos={[240, 128]} text={gamepadAnalogStick} hasOptions align="right" />

      <MenuLabel index={6} pos={[32, 144]} text="RUMBLE" />
      <MenuItem index={6} pos={[240, 144]} text={gamepadRumble} hasOptions align="right" />
    </Menu>
  );
};

const useButtonBinding = (bindings: VariableProperty<Partial<Record<GamepadButtonName, string>>>, action: string) => {
  return useDynamicProperty(bindings, (bindings): Position => {
    const button = Object.entries(bindings).find((entry) => entry[1] === action)?.[0] as GamepadButtonName;
    const offset = BUTTONS[button];
    return offset !== undefined ? [0, offset] : [0, 96];
  });
};

type MenuGamepadButtonItemProps = Pick<MenuItemProps, 'index' | 'pos'> & {
  offset: Prop<Position>;
};

const MenuGamepadButtonItem: React.FC<MenuGamepadButtonItemProps> = ({ offset, pos, ...props }) => {
  return (
    <Node pos={pos}>
      <MenuItem {...props} text="    " arrows={ARROWS} />
      <BitmapImage image={GAMEPAD_IMAGE} size={[32, 8]} offset={offset} />
    </Node>
  );
};
