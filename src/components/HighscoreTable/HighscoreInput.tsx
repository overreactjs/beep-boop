import { Box } from "@overreact/engine";
import { useMemo } from "react";
import { getLeaderboard } from "../../services";
import { ArcadeText } from "../ArcadeText";
import { Screen } from "../Screen";
import { Leaderboard } from "./Leaderboard";

type HighscoreInputProps = {
  onBack: () => void;
}

export const HighscoreInput: React.FC<HighscoreInputProps> = () => {
  const leaderboard = useMemo(() => getLeaderboard(), []);
  
  return (
    <Screen size={[256, 240]} scale="auto">
      <Box pos={[0, 0]} size={[256, 240]} color="#000">
        <ArcadeText pos={[104, 96]} text="BEST 5" color="red" />
        <Leaderboard pos={[0, 128]} scores={leaderboard} />
      </Box>
    </Screen>
  );
};
