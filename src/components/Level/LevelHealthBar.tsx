import { Node } from "@overreact/engine";
import { useGame, useCalculatedProperty } from "../../hooks";
import { BaseBossState } from "../../state";
import { HealthBar } from "../HealthBar";

type LevelHealthBarProps = {
  level: number;
};

export const LevelHealthBar: React.FC<LevelHealthBarProps> = ({ level }) => {
  const game = useGame();

  const health = useCalculatedProperty(() => {
    return (game.enemies[0] as BaseBossState)?.health?.current || 15;
  });

  return (
    <Node offset={[128, 0]} visible={(level % 20) === 0}>
      <HealthBar health={health} />
    </Node>
  );
};
