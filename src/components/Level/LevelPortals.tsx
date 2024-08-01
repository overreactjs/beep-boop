import { Node } from "@overreact/engine";
import { useGame } from "../../hooks";
import { Portal } from "../Portal";

type LevelPortalsProps = {
  level: number;
};

export const LevelPortals: React.FC<LevelPortalsProps> = ({ level }) => {
  const game = useGame();
  const { portals } = game.levels[level - 1];

  return (
    <Node>
      {portals.map((portal, index) => (
        <Portal key={portal.target} level={level} id={index + 1} {...portal} />
      ))}
    </Node>
  );
};
