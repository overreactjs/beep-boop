import { Box } from "@overreact/engine";
import { useAppState } from "../../hooks";
import { Screen } from "../Screen";
import { TitleMenu } from "./TitleMenu";
import { NewGame } from "./NewGame";
import { ArcadeText } from "../ArcadeText";

type TitleScreenState = 'titleMenu' | 'newGame';

type TitleScreenProps = {
  onStart: () => void;
  onSettings: () => void;
  onCredits: () => void;
  onQuit: () => void;
};

export const TitleScreen: React.FC<TitleScreenProps> = (props) => {
  const { onStart, onSettings, onCredits, onQuit } = props;
  const { state, go } = useAppState<TitleScreenState>('titleMenu');

  return (
    <Screen size={[256, 240]} scale="auto">
      <Box pos={[0, 0]} size={[256, 240]} color="black">
        {state === 'titleMenu' && (
          <TitleMenu onNewGame={go('newGame')} onSettings={onSettings} onCredits={onCredits} onQuit={onQuit} />
        )}
        {state === 'newGame' && (
          <NewGame onBack={go('titleMenu')} onStart={onStart} />
        )}
      </Box>
      <ArcadeText pos={[48, 232]} text="© LITTLE MARTIAN 2024" />
    </Screen>
  );
};
