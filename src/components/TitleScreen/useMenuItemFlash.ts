import { Property, useProperty, useUpdate } from "@overreact/engine";
import { SELECTION_COOLDOWN } from "./constants";

export const useMenuItemFlash = (selected: Property<boolean>) => {
  const color = useProperty<string | null>(null);
  const cooldown = useProperty<number | null>(null);

  useUpdate((delta) => {
    if (!selected.current) {
      color.current = null;
      cooldown.current = null;
      return; 
    }

    if (cooldown.current === null) {
      cooldown.current = SELECTION_COOLDOWN;
    } else {
      cooldown.current -= delta;
    }

    color.current = Math.floor(cooldown.current / (SELECTION_COOLDOWN / 4)) % 2 === 1 ? '#f0f' : '#ff0';
  });

  return color;
};
