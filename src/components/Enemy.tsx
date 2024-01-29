import { VirtualInput } from "@overreact/engine";
import { EnemyState } from "../state";
import { StandardBot } from "./bots";

type EnemyProps = {
  enemy: EnemyState;
}

export const Enemy: React.FC<EnemyProps> = ({ enemy }) => {
  return (
    <VirtualInput>
      <StandardBot enemy={enemy} />
    </VirtualInput>
  );
};
