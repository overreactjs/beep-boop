import { useCallback, useMemo, useRef } from "react";
import { useKeyboardMap, useProperty, useUpdate } from "@overreact/engine";
import { useSoundEffects } from "../../hooks";
import { KEYBOARD_MAP, SELECTION_COOLDOWN } from "./constants";
import { MenuItem } from "./types";
import { MenuContext } from "./MenuContext";
import { useMenuAction } from "./useMenuAction";

type MenuProps = {
  children: React.ReactNode;
  onSelect: (index: number) => void;
  onChange?: (index: number, direction: -1 | 1) => void;
}

export const Menu: React.FC<MenuProps> = ({ children, onSelect, onChange }) => {
  const sfx = useSoundEffects();
  const index = useProperty(0);
  const selected = useProperty<number | null>(null);
  const cooldown = useProperty(0);
  const items = useRef<Map<number, MenuItem>>(new Map());

  const register = useCallback((index: number, item: MenuItem) => {
    items.current.set(index, item);
    return () => items.current.delete(index);
  }, [items]);

  useKeyboardMap(KEYBOARD_MAP);

  useMenuAction('menu_down', () => {
    if (selected.current === null) {
      index.current = (index.current + 1) % items.current.size;
      sfx.play('MenuNavigate');
    }
  });

  useMenuAction('menu_up', () => {
    if (selected.current === null) {
      index.current = (index.current + items.current.size - 1) % items.current.size;
      sfx.play('MenuNavigate');
    }
  });

  useMenuAction('menu_select', () => {
    if (!items.current.get(index.current)?.hasOptions) {
      selected.current = index.current;
      cooldown.current = SELECTION_COOLDOWN;
      sfx.play('MenuSelect');
    }
  });

  useMenuAction('menu_left', () => {
    if (items.current.get(index.current)?.hasOptions) {
      onChange?.(index.current, -1);
      sfx.play('MenuNavigate');
    }
  });

  useMenuAction('menu_right', () => {
    if (items.current.get(index.current)?.hasOptions) {
      onChange?.(index.current, 1);
      sfx.play('MenuNavigate');
    }
  });

  useUpdate((delta) => {
    if (selected.current !== null) {
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