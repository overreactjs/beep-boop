import { VirtualInput } from "@overreact/engine";
import { EnemyState } from "../../state";
import { EnemyType } from "../../types";
import { SecurityBot } from "../SecurityBot";
import { BounceBot } from "../BounceBot/BounceBot";

const ENEMIES: Record<EnemyType, React.FC<EnemyProps>> = {
  securityBot: SecurityBot,
  bounceBot: BounceBot,
};

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
