import { VirtualInput } from "@overreact/engine";
import { EnemyState } from "../../state";
import { EnemyType } from "../../types";
import { StandardBot } from "../StandardBot";

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
