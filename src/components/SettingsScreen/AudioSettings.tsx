import { useAudioEngine, useSync } from "@overreact/engine";
import { Menu, MenuItem } from "../Menu";
import { MenuLabel, MenuStatic } from "../Menu/MenuLabel";
import { useSettings } from "../../hooks";

type AudioSettingsProps = {
  onBack: () => void;
};

export const AudioSettings: React.FC<AudioSettingsProps> = (props) => {
  const { onBack } = props;
  
  const audio = useAudioEngine();
  const settings = useSettings();

  const soundsText = useSync(() => audio.getChannel('sounds').gain.value > 0 ? 'YES' : ' NO');
  const musicText = useSync(() => audio.getChannel('music').gain.value > 0 ? 'YES' : ' NO');
  
  const handleSelect = (index: number) => {
    switch (index) {
      case 0:
        return onBack();
    }
  };

  const handleChange = (index: number) => {
    switch (index) {
      case 1:
        settings.muteSounds.toggle();
        audio.toggle('sounds');
        return;
      case 2:
        settings.muteMusic.toggle();
        audio.toggle('music');
        return;
    }
  };

  return (
    <Menu onSelect={handleSelect} onChange={handleChange} onBack={onBack}>
      <MenuStatic pos={[16, 32]} text="AUDIO SETTINGS" color="#f0f" />
      <MenuItem index={0} pos={[32, 48]} text="BACK" />
      <MenuLabel index={1} pos={[32, 64]} text="SOUNDS" />
      <MenuItem index={1} pos={[216, 64]} text={soundsText} hasOptions />
      <MenuLabel index={2} pos={[32, 80]} text="MUSIC" />
      <MenuItem index={2} pos={[216, 80]} text={musicText} hasOptions />
    </Menu>
  );
};


