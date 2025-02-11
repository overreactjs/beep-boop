import { BitmapImage, Box, useFlash } from "@overreact/engine";
import { useAppState } from "../../hooks";
import { Screen } from "../Screen";
import { TitleMenu } from "./TitleMenu";
import { ArcadeText } from "../ArcadeText";
import { PlayersSelect } from "./PlayersSelect";
import { ControlsSelect } from "./ControlsSelect";
import { LOGO } from "./assets";

type TitleScreenState = 'titleMenu' | 'playersSelect' | 'contolsSelect';

type TitleScreenProps = {
  onStart: () => void;
  onHighscoreTable: () => void;
  onSettings: () => void;
  onCredits: () => void;
  onQuit: () => void;
};

export const TitleScreen: React.FC<TitleScreenProps> = (props) => {
  const { onStart, onHighscoreTable, onSettings, onCredits, onQuit } = props;
  const { state, go } = useAppState<TitleScreenState>('titleMenu');

  const isDemo = process.env.NODE_ENV === 'demo';
  const flash = useFlash(500);

  return (
    <Screen size={[256, 240]} scale="auto">
      <Box pos={[0, 0]} size={[256, 240]} color="black">
        <BitmapImage image={LOGO} pos={[64, 0]} size={[128, 128]} offset={[0, 0]} />
        {isDemo && (
          <Box pos={[72, 88]} size={[112, 8]} color="#f00">
            <ArcadeText pos={[0, 0]} text=" DEMO VERSION " color="white" />
            <Box pos={[0, 0]} size={[112, 8]} color="#fff" className="mix-blend-difference" visible={flash} />
            <Box pos={[0, 0]} size={[112, 8]} color="#f0f" className="mix-blend-multiply" />
          </Box>
        )}
        {state === 'titleMenu' && (
          <TitleMenu onNewGame={go('playersSelect')} onHighscoreTable={onHighscoreTable} onSettings={onSettings} onCredits={onCredits} onQuit={onQuit} />
        )}
        {state === 'playersSelect' && (
          <PlayersSelect onBack={go('titleMenu')} onSelect={go('contolsSelect')} />
        )}
        {state === 'contolsSelect' && (
          <ControlsSelect onBack={go('playersSelect')} onStart={onStart} />
        )}
      </Box>
      <ArcadeText pos={[64, 232]} text="© OVERREACT 2024" />
    </Screen>
  );
};
