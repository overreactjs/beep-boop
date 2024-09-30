import { Camera, Node, useCachedDynamicProperty, useUpdate } from "@overreact/engine";
import { useGame } from "../../hooks";

export const GameCamera: React.FC = () => {
  const game = useGame();
  const target = useCachedDynamicProperty(game.level, (level) => 100 + (level - 1) * 200);

  useUpdate((delta) => {
    let cy = game.camera.current[1];
    const ty = target.current;

    if (cy < ty) {
      cy += delta / 8;
      game.camera.current[1] = cy >= ty ? ty : cy;
    }
    
    if (cy > ty) {
      cy -= delta / 8;
      game.camera.current[1] = cy <= ty ? ty : cy;
    }

    if (cy === ty && !game.initialized.current) {
      game.initLevel();
    }
  });

  return (
    <Node pos={game.camera}>
      <Camera />
    </Node>
  );
};
