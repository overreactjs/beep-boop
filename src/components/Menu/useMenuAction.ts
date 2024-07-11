import { useVirtualInput, useProperty, useUpdate } from "@overreact/engine";

export const useMenuAction = (action: string, fn: () => void) => {
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
};
