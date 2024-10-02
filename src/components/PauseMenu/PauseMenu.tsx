import { Box, useSync } from "@overreact/engine";
import { useAppState, useGame } from "../../hooks";
import { Menu, MenuItem } from "../Menu";
import { Accessibility, AudioSettings, GamepadControls, KeyboardControls, SettingsMenu, VideoSettings } from "../SettingsScreen";

type State = 'pause' | 'settings' | 'audioSettings' | 'videoSettings' | 'accessibility' | 'keyboardControls' | 'gamepadControls';

type PauseMenuProps = {
  onEndGame: () => void;
}

export const PauseMenu: React.FC<PauseMenuProps> = ({ onEndGame }) => {
  const game = useGame();
  const isPaused = useSync(() => game?.paused.current);
  
  const { state, go } = useAppState<State>('pause');
  const onSettings = go('settings');
  
  const handleSelect = (index: number) => {
    switch (index) {
      case 0:
        return game.unpause();
      case 1:
        return onSettings();
      case 2:
        return onEndGame();
    }
  };

  if (!isPaused) {
    return null;
  }

  return (
    <Box pos={[0, 0]} size={[256, 240]} color="#000">
      {state === 'pause' && (
        <Menu onSelect={handleSelect}>
          <MenuItem index={0} pos={[72, 100]} text="CONTINUE GAME" />
          <MenuItem index={1} pos={[88, 116]} text="SETTINGS" />
          <MenuItem index={2} pos={[104, 132]} text="QUIT" />
        </Menu>
      )}
      {state === 'settings' && (
        <SettingsMenu
          onBack={go('pause')}
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
  );
};
