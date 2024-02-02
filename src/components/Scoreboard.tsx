import { Prop, Position, usePosition, useProperty, useDynamicProperty } from "@overreact/engine";
import { ArcadeText } from "./ArcadeText";

export type ScoreboardProps = {
  pos: Prop<Position>;
  score: Prop<number>;
}

export const Scoreboard: React.FC<ScoreboardProps> = (props) => {
  const pos = usePosition(props.pos);
  const score = useProperty(props.score);
  const text = useDynamicProperty(score, (score) => String(score).padStart(6, ' '));

  return <ArcadeText pos={pos} color="white" text={text} />
};
