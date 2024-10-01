import { Box } from "@overreact/engine";
import { useAppState } from "../../hooks";
import { Screen } from "../Screen";
import { SettingsMenu } from "./SettingsMenu";
import { Accessibility } from "./Accessibility";
import { VideoSettings } from "./VideoSettings";
import { AudioSettings } from "./AudioSettings";
import { KeyboardControls } from "./KeyboardControls";
import { GamepadControls } from "./GamepadControls";

type SettingsState = 'settings' | 'audioSettings' | 'videoSettings' | 'accessibility' | 'gamepadControls' | 'keyboardControls';

type SettingsScreenProps = {
  onBack: () => void;
};

export const SettingsScreen: React.FC<SettingsScreenProps> = (props) => {
  const { onBack } = props;
  const { state, go } = useAppState<SettingsState>('settings');

  return (
    <Screen size={[256, 240]} scale="auto">
      <Box pos={[0, 0]} size={[256, 240]} color="black">
        {state === 'settings' && (
          <SettingsMenu
            onBack={onBack}
            onAudioSettings={go('audioSettings')}
            onVideoSettings={go('videoSettings')} 
            onAccessibility={go('accessibility')}
            onKeyboardControls={go('keyboardControls')}
            onGamepadControls={go('gamepadControls')}
          />
        )}
        {state === 'audioSettings' && (
          <AudioSettings onBack={go('settings')} />
        )}
        {state === 'videoSettings' && (
          <VideoSettings onBack={go('settings')} />
        )}
        {state === 'accessibility' && (
          <Accessibility onBack={go('settings')} />
        )}
        {state === 'keyboardControls' && (
          <KeyboardControls onBack={go('settings')} />
        )}
        {state === 'gamepadControls' && (
          <GamepadControls onBack={go('settings')} />
        )}
      </Box>
    </Screen>
  );
};
