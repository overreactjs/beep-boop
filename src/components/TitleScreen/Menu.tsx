import { useMemo } from "react";
import { useKeyboardMap, useProperty, useUpdate, useVirtualInput } from "@overreact/engine";
import { MenuContext } from "./MenuContext";
import { SELECTION_COOLDOWN } from "./constants";
import { useSoundEffects } from "../../hooks";

const KEYBOARD_MAP = {
  ArrowUp: 'menu_up',
  ArrowDown: 'menu_down',
  Enter: 'menu_select',
  Space: 'menu_select',
  KeyW: 'menu_up',
  KeyS: 'menu_down',
};

type MenuProps = {
  children: React.ReactNode;
  onSelect: (index: number) => void;
}

export const Menu: React.FC<MenuProps> = ({ children, onSelect }) => {
  const sfx = useSoundEffects();
  const index = useProperty(0);
  const selected = useProperty<number | null>(null);
  const cooldown = useProperty(0);

  useKeyboardMap(KEYBOARD_MAP);

  useMenuAction('menu_down', () => {
    if (selected.current === null) {
      index.current = (index.current + 1) % 3;
      sfx.play('MenuNavigate');
    }
  });

  useMenuAction('menu_up', () => {
    if (selected.current === null) {
      index.current = (index.current + 2) % 3;
      sfx.play('MenuNavigate');
    }
  });

  useMenuAction('menu_select', () => {
    selected.current = index.current;
    cooldown.current = SELECTION_COOLDOWN;
    sfx.play('MenuSelect');
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

  const context = useMemo(() => ({ index, selected }), [index, selected]);

  return <MenuContext.Provider value={context}>{children}</MenuContext.Provider>;
};

/**
 * 
 */
const useMenuAction = (action: string, fn: () => void) => {
  const input = useVirtualInput();

  const cooldown = useProperty(0);

  useUpdate((delta) => {
    if (input.isActive(action)) {
      if (cooldown.current === 0) {
        fn();
        cooldown.current = 300;
      }
    } else {
      cooldown.current = 0;
    }

    cooldown.current = Math.max(0, cooldown.current - delta);
  });
}