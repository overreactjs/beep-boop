import { VirtualInput } from "@overreact/engine";
import { EnemyState } from "../state";
import { StandardBot } from "./StandardBot";
import { EnemyType } from "../types";

const ENEMIES: Record<EnemyType, React.FC<EnemyProps>> = {
  standard: StandardBot,
}

type EnemyProps = {
  enemy: EnemyState;
}

export const Enemy: React.FC<EnemyProps> = ({ enemy }) => {
  const Component = ENEMIES[enemy.type];

  return (
    <VirtualInput>
      <Component enemy={enemy} />
    </VirtualInput>
  );
};
