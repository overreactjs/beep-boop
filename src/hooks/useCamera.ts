import { Position, Property, useCachedDynamicProperty, useProperty, useUpdate } from "@overreact/engine";
import { useGame } from "./useGame";

export const useCamera = (): Property<Position> => {
  const game = useGame();
  const camera = useProperty<Position>([128, 100]);
  const target = useCachedDynamicProperty(game.level, (level) => 100 + (level - 1) * 200);

  useUpdate((delta) => {
    let cy = camera.current[1];
    const ty = target.current;

    if (cy < ty) {
      cy += delta / 8;
      camera.current[1] = cy >= ty ? ty : cy;
    }
    
    if (cy > ty) {
      cy -= delta / 8;
      camera.current[1] = cy <= ty ? ty : cy;
    }

    if (cy === ty && !game.initialized.current) {
      game.initLevel();
    }
  });

  return camera;
}

  