import { useAudioEngine, useCachedDynamicProperty } from "@overreact/engine";
import { Menu, MenuItem, MenuItemBar, MenuLabel, MenuStatic } from "../Menu";
import { useSettings } from "../../hooks";

type AudioSettingsProps = {
  onBack: () => void;
};

export const AudioSettings: React.FC<AudioSettingsProps> = (props) => {
  const { onBack } = props;
  
  const audio = useAudioEngine();
  const settings = useSettings();

  const playSounds = useCachedDynamicProperty(settings.muteSounds, (value) => value ? 'NO' : 'YES');
  const playMusic = useCachedDynamicProperty(settings.muteMusic, (value) => value ? 'NO' : 'YES');
  
  const handleSelect = (index: number) => {
    switch (index) {
      case 0:
        return onBack();
    }
  };

  const handleChange = (index: number, direction: -1 | 1) => {
    switch (index) {
      case 1:
        settings.muteSounds.toggle();
        audio.toggle('sounds');
        return;
      case 2:
        settings.volumeSounds.next(direction);
        audio.setVolume('sounds', settings.volumeSounds.current);
        return;
      case 3:
        settings.muteMusic.toggle();
        audio.toggle('music');
        return;
      case 4:
        settings.volumeMusic.next(direction);
        audio.setVolume('music', settings.volumeMusic.current);
        return;
    }
  };

  return (
    <Menu onSelect={handleSelect} onChange={handleChange} onBack={onBack}>
      <MenuStatic pos={[16, 32]} text="AUDIO SETTINGS" color="#f0f" />
      <MenuItem index={0} pos={[32, 48]} text="BACK" />

      <MenuLabel index={1} pos={[32, 64]} text="SOUNDS" />
      <MenuItem index={1} pos={[240, 64]} text={playSounds} hasOptions align="right" />

      <MenuLabel index={2} pos={[32, 80]} text="SOUND VOLUME" />
      <MenuItemBar index={2} pos={[160, 80]} value={settings.volumeSounds} />
      
      <MenuLabel index={3} pos={[32, 96]} text="MUSIC" />
      <MenuItem index={3} pos={[240, 96]} text={playMusic} hasOptions align="right" />

      <MenuLabel index={4} pos={[32, 112]} text="MUSIC VOLUME" />
      <MenuItemBar index={4} pos={[160, 112]} value={settings.volumeMusic} />
    </Menu>
  );
};


