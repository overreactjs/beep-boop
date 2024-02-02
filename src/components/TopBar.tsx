import { Node } from "@overreact/engine";
import { useGame } from "../hooks";
import { ArcadeText } from "./ArcadeText";
import { Scoreboard } from "./Scoreboard";

export const TopBar: React.FC = () => {
  const game = useGame();
  
  return (
    <Node>
      <ArcadeText pos={[16, 0]} color="green" text="1UP" />
      <ArcadeText pos={[88, 0]} color="blue" text="HIGH SCORE" />
      <ArcadeText pos={[216, 0]} color="red" text="2UP" />
      <Scoreboard pos={[0, 8]} score={game.current.players[0].score} />
      <Scoreboard pos={[104, 8]} score={game.current.highscore} />
      <Scoreboard pos={[200, 8]} score={game.current.players[1].score} />
    </Node>
  );
};
