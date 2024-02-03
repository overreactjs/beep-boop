import { Position, Property, useDynamicProperty, useProperty, useUpdate } from "@overreact/engine";
import { useGame } from "./useGame";

export const useCamera = (): Property<Position> => {
  const game = useGame();
  const camera = useProperty<Position>([128, 100]);
  const target = useDynamicProperty(game.current.level, (level) => 100 + (level - 1) * 200);

  useUpdate((delta) => {
    let cy = camera.current[1];
    const ty = target.current;

    if (cy < ty) {
      cy += delta / 8;

      if (cy >= ty) {
        camera.current[1] = ty;
        game.current.init();
      } else {
        camera.current[1] = cy;
      }
    }
    
    if (cy > ty) {
      cy -= delta / 8;

      if (cy <= ty) {
        camera.current[1] = ty;
        game.current.init();
      } else {
        camera.current[1] = cy;
      }
    }
  });

  return camera;
}

  