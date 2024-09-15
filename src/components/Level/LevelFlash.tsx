import { Box, Position, Prop, useMergeProperty, usePosition } from "@overreact/engine";
import { useGame, useSettings } from "../../hooks";

type LevelFlashProps = {
  level: number;
  pos?: Prop<Position>;
}

export const LevelFlash: React.FC<LevelFlashProps> = (props) => {
  const game = useGame();
  const settings = useSettings();

  const color = '#00007f';
  const pos = usePosition(props.pos);
  const visible = useMergeProperty(settings.showExplosionFlashes, game.lastEnemyTime, (enabled, time) => {
    return enabled && time <= 200;
  });

  return <Box pos={pos} size={[256, 200]} color={color} visible={visible} className="mix-blend-screen" />
};
