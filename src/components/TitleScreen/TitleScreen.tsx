import { Box } from "@overreact/engine";
import { useAppState } from "../../hooks";
import { Screen } from "../Screen";
import { TitleMenu } from "./TitleMenu";
import { NewGame } from "./NewGame";
import { ArcadeText } from "../ArcadeText";

type TitleScreenState = 'titleMenu' | 'newGame';

type TitleScreenProps = {
  onStart: () => void;
  onOptions: () => void;
  onCredits: () => void;
};

export const TitleScreen: React.FC<TitleScreenProps> = (props) => {
  const { onStart, onOptions, onCredits } = props;
  const { state, go } = useAppState<TitleScreenState>('titleMenu');

  return (
    <Screen size={[256, 240]} scale="auto">
      <Box pos={[0, 0]} size={[256, 240]} color="black">
        {state === 'titleMenu' && (
          <TitleMenu onNewGame={go('newGame')} onOptions={onOptions} onCredits={onCredits} />
        )}
        {state === 'newGame' && (
          <NewGame onBack={go('titleMenu')} onStart={onStart} />
        )}
      </Box>
      <ArcadeText pos={[48, 232]} text="© LITTLE MARTIAN 2024" />
    </Screen>
  );
};
