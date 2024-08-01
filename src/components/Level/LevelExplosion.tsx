import { Box, Position, Prop, usePosition, useProperty, useUpdate } from "@overreact/engine";
import { useCalculatedProperty, useGame, useSettings } from "../../hooks";

/**
 * This uses the ZX Spectrum color brightness ramp, which gives an interesting retro explosion
 * effect when played quickly. It's the same color ramp we used in Beep's Escape for the fade
 * transitions between screens.
 */
const COLORS = [
  '#000', // black
  '#00f', // blue
  '#f00', // red
  '#f0f', // magenta
  '#0f0', // green
  '#0ff', // cyan
  '#ff0', // yellow
  '#fff', // white
  '#ff0', // yellow
  '#0ff', // cyan
  '#0f0', // green
  '#f0f', // magenta
  '#f00', // red
  '#00f', // blue
  '#000', // black...
  '#000',
  '#000',
  '#000',
  '#000',
  '#000',
  '#000',
  '#000',
  '#000',
  '#000',
  '#000',
];

type LevelExplosionProps = {
  pos?: Prop<Position>;
}

export const LevelExplosion: React.FC<LevelExplosionProps> = (props) => {
  const game = useGame();
  const settings = useSettings();

  const timer = useProperty(0);
  const color = useProperty('#000');
  const pos = usePosition(props.pos);

  const visible = useCalculatedProperty(() => settings.showExplosionFlashes.current && game.hasPowerup('dynamite'));
  
  useUpdate((delta) => {
    if (visible.current) {
      timer.current += delta;
      const value = Math.abs(Math.floor(timer.current / (1000 / 30)) % COLORS.length);
      color.current = COLORS[value];
    } else {
      timer.current = 0;
      color.current = COLORS[0];
    }
  });

  return <Box pos={pos} size={[256, 200]} color={color} visible={visible} className="mix-blend-screen" />
};
