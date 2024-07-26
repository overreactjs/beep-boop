import { useCallback, useMemo, useRef } from "react";
import { Prop, useGamepadAxisMap, useGamepadButtonMap, useKeyboardMap, useProperty, useUpdate } from "@overreact/engine";
import { useSoundEffects } from "../../hooks";
import { GAMEPAD_AXIS_MAP, GAMEPAD_BUTTON_MAP, KEYBOARD_MAP, SELECTION_COOLDOWN } from "./constants";
import { MenuItem } from "./types";
import { MenuContext } from "./MenuContext";
import { useMenuAction } from "./useMenuAction";

type MenuProps = {
  active?: Prop<boolean>
  children: React.ReactNode;
  onSelect: (index: number) => void;
  onChange?: (index: number, direction: -1 | 1) => void;
  onBack?: () => void;
}

export const Menu: React.FC<MenuProps> = ({ children, onSelect, onChange, onBack, ...props }) => {
  const sfx = useSoundEffects();
  const index = useProperty(0);
  const selected = useProperty<number | null>(null);
  const cooldown = useProperty(0);
  const items = useRef<Map<number, MenuItem>>(new Map());
  const active = useProperty(props.active === undefined ? true : props.active);

  const register = useCallback((index: number, item: MenuItem) => {
    items.current.set(index, item);
    return () => items.current.delete(index);
  }, [items]);

  useKeyboardMap(KEYBOARD_MAP);
  useGamepadButtonMap(0, GAMEPAD_BUTTON_MAP);
  useGamepadButtonMap(1, GAMEPAD_BUTTON_MAP);
  useGamepadAxisMap(0, GAMEPAD_AXIS_MAP);
  useGamepadAxisMap(1, GAMEPAD_AXIS_MAP);

  useMenuAction('menu_back', () => {
    if (active.current) {
      onBack?.();
    }
  });

  useMenuAction('menu_down', () => {
    if (active.current && selected.current === null) {
      index.current = (index.current + 1) % items.current.size;
      sfx.play('MenuNavigate');
    }
  });

  useMenuAction('menu_up', () => {
    if (active.current && selected.current === null) {
      index.current = (index.current + items.current.size - 1) % items.current.size;
      sfx.play('MenuNavigate');
    }
  });

  useMenuAction('menu_select', () => {
    if (active.current && !items.current.get(index.current)?.hasOptions) {
      selected.current = index.current;
      cooldown.current = SELECTION_COOLDOWN;
      sfx.play('MenuSelect');
    }
  });

  useMenuAction('menu_left', () => {
    if (active.current && items.current.get(index.current)?.hasOptions) {
      onChange?.(index.current, -1);
      sfx.play('MenuNavigate');
    }
  });

  useMenuAction('menu_right', () => {
    if (active.current && items.current.get(index.current)?.hasOptions) {
      onChange?.(index.current, 1);
      sfx.play('MenuNavigate');
    }
  });

  useUpdate((delta) => {
    if (active.current && selected.current !== null) {
      if (cooldown.current > 0) {
        cooldown.current -= delta;
      } else {
        onSelect(selected.current);
        selected.current = null;
      }
    }
  });

  const context = useMemo(() => ({ index, selected, register }), [index, selected, register]);

  return <MenuContext.Provider value={context}>{children}</MenuContext.Provider>;
};
