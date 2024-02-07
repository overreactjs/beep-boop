import { VirtualInput } from "@overreact/engine";
import { EnemyState } from "../../state";
import { EnemyType } from "../../types";
import { SecurityBot } from "../SecurityBot";
import { BounceBot } from "../BounceBot/BounceBot";
import { GuardBot } from "../GuardBot";

const ENEMIES: Record<EnemyType, React.FC<EnemyProps>> = {
  bounceBot: BounceBot,
  guardBot: GuardBot,
  securityBot: SecurityBot,
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
