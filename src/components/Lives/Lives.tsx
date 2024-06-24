import { BitmapImage, Node, Position, Prop, Size, useCachedDynamicProperty, usePosition } from "@overreact/engine";
import { PlayerState } from "../../state";
import { PlayerIndex } from "../../types";
import { LIVES_IMAGE } from "./assets";

const P1_OFFSET: Position = [0, 0];
const P2_OFFSET: Position = [0, 8];
const BG_OFFSET: Position = [0, 16];

type LivesProp = {
  index: PlayerIndex;
  pos: Prop<Position>;
  player: PlayerState;
};

export const Lives: React.FC<LivesProp> = ({ index, player, ...props }) => {
  const pos = usePosition(props.pos);

  const size = useCachedDynamicProperty(player.lives, (lives): Size => [lives * 8, 8]);

  return (
    <Node pos={pos}>
      <BitmapImage visible={player.active} image={LIVES_IMAGE} size={[40, 8]} offset={BG_OFFSET} />
      <BitmapImage visible={player.active} image={LIVES_IMAGE} size={size} offset={index === 0 ? P1_OFFSET : P2_OFFSET} />
    </Node>
  );
};
