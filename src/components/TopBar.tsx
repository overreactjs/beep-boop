import { Node, useProperty } from "@overreact/engine";
import { useGame } from "../hooks";
import { ArcadeText } from "./ArcadeText";
import { Scoreboard } from "./Scoreboard";

export const TopBar: React.FC = () => {
  const game = useGame();
  const highscore = useProperty(game.current.highscore);
  const score1 = useProperty(game.current.players[0].score);
  const score2 = useProperty(game.current.players[1].score);
  
  return (
    <Node>
      <ArcadeText pos={[16, 0]} color="#0f0" text="1UP" />
      <ArcadeText pos={[88, 0]} color="#f00" text="HIGH SCORE" />
      <ArcadeText pos={[216, 0]} color="#0ff" text="2UP" />
      <Scoreboard pos={[0, 8]} score={score1} />
      <Scoreboard pos={[104, 8]} score={highscore} />
      <Scoreboard pos={[200, 8]} score={score2} />
    </Node>
  );
};
