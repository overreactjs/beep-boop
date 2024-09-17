import { useFixedUpdate } from "@overreact/engine";
import { useGame } from "../../../hooks";
import { GlitchBotState } from "../../../state";
import { EnemyProps } from "../types";

function lerpAngle (a: number, b: number, t: number){
  const dx = (1 - t) * Math.cos(a) + t * Math.cos(b);
  const dy = (1 - t) * Math.sin(a) + t * Math.sin(b);
  return Math.atan2(dy, dx);
}

export const GlitchBot: React.FC<EnemyProps<GlitchBotState>> = ({ enemy }) => {
  const { angle, pos, velocity, speed } = enemy;
  const game = useGame();

  useFixedUpdate(10, (delta) => {
    if (game.enemyCount > 0) {
      pos.current[0] += velocity.current[0] * delta;
      pos.current[1] += velocity.current[1] * delta;

      const [gx, gy] = pos.current;
      const [px, py] = game.nearestPlayer(enemy).pos.current;

      const x = (gx - 4) >> 3;
      const y = (gy - 4 - ((game.level.current - 1) * 200)) >> 3;
      game.glitch.trigger(x + 0, y + 0);
      game.glitch.trigger(x + 1, y + 0);
      game.glitch.trigger(x + 0, y + 1);
      game.glitch.trigger(x + 1, y + 1);

      const target = Math.atan2(py - gy, px - gx);
      angle.current = lerpAngle(angle.current, target, speed.current * 4);

      velocity.current[0] = Math.cos(angle.current) * speed.current;
      velocity.current[1] = Math.sin(angle.current) * speed.current;

      speed.current += delta / 2500000;
    }
  });

  return null;
};
