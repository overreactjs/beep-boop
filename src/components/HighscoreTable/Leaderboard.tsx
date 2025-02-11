import { Box, Position, Prop, usePosition } from "@overreact/engine";
import { Fragment } from "react";
import { TintedArcadeText } from "../ArcadeText";
import React from "react";
import { Highscore } from "../../types";

const ORDINALS = ['1.', '2.', '3.', '4.', '5.', '6.', '7.', '8.', '9.', '10.'];
const COLORS = ['#f00', '#0f0', '#0ff', '#fff', '#fff', '#fff', '#fff', '#fff', '#fff', '#fff', '#fff'];

type LeaderboardProps = {
  pos?: Prop<Position>;
  scores: Highscore[];
}

export const Leaderboard: React.FC<LeaderboardProps> = ({ scores, ...props }) => {
  const pos = usePosition(props.pos);

  return (
    <Box pos={pos} size={[256, scores.length * 16 + 16]} color="black">
      <TintedArcadeText color="#888" pos={[80, 0]} text="SCORE" />
      <TintedArcadeText color="#888" pos={[152, 0]} text="LVL" />
      <TintedArcadeText color="#888" pos={[208, 0]} text="NAME" />

      {scores.map((entry, index) => {
        const y = index * 16 + 16;
        const color = COLORS[index];

        return (
          <Fragment key={index}>
            <TintedArcadeText color="#888" pos={[16, y]} text={ORDINALS[index]} />
            <TintedArcadeText color={color} pos={[56, y]} text={String(entry.score).padStart(8, ' ')} />
            <TintedArcadeText color={color} pos={[136, y]} text={String(entry.stage).padStart(5, ' ')} />
            <TintedArcadeText color={color} pos={[216, y]} text={entry.name} />
          </Fragment>
        );
      })}
    </Box>
  );
};
