import { Node } from "@overreact/engine";
import { useGame, useCalculatedProperty } from "../../hooks";
import { BaseBossState } from "../../state";
import { HealthBar } from "../HealthBar";

type LevelHealthBarProps = {
  level: number;
};

export const LevelHealthBar: React.FC<LevelHealthBarProps> = ({ level }) => {
  const game = useGame();
  const data = game.levels[level - 1];

  const health = useCalculatedProperty(() => {
    return (game.enemies[0] as BaseBossState)?.health?.current || 15;
  });

  console.log(level, data.meta.boss);

  return (
    <Node offset={[128, 0]} visible={data.meta.boss || false}>
      <HealthBar health={health} />
    </Node>
  );
};
