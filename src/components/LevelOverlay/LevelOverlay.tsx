import { Node, useCachedDynamicProperty, useSync } from "@overreact/engine";
import { useGame } from "../../hooks";
import { ArcadeText } from "../ArcadeText";

export const LevelOverlay: React.FC = () => {
  const game = useGame();
  const text = useCachedDynamicProperty(game.level, (level) => `STAGE ${String(level).padStart(2, '0')}`);
  const visible = useSync(() => game.levelTime.current <= 2000);

  return visible && (
    <Node>
      <ArcadeText pos={[96, 104]} color="white" text={text} />
      <ArcadeText pos={[88, 136]} color="white" text="GET READY!" />
    </Node>
  );
};
