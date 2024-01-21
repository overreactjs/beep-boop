import { Prop, Position, usePosition, useProperty, useDynamicProperty } from "@overreact/engine";
import { ArcadeText } from "./ArcadeText";

export type ScoreboardProps = {
  pos: Prop<Position>;
  score: Prop<number>;
}

export const Scoreboard: React.FC<ScoreboardProps> = (props) => {
  const pos = usePosition(props.pos);
  const score = useProperty(props.score);
  const text = useDynamicProperty(score, (score) => String(score));

  return <ArcadeText pos={pos} color="#fff" text={text} />
};
