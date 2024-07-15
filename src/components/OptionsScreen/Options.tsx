import { useSync } from "@overreact/engine";
import { useAudioEngine } from "../../hooks/useAudioEngine";
import { Menu, MenuItem, MenuLabel } from "../Menu";
import { MenuStatic } from "../Menu/MenuLabel";

type OptionsProps = {
  onBack: () => void;
  onAccessibility: () => void;
};

export const Options: React.FC<OptionsProps> = (props) => {
  const { onBack, onAccessibility } = props;
  const audio = useAudioEngine();

  const soundsText = useSync(() => audio.getChannel('sounds').gain.value > 0 ? 'YES' : ' NO');
  const musicText = useSync(() => audio.getChannel('music').gain.value > 0 ? 'YES' : ' NO');

  const handleSelect = (index: number) => {
    switch (index) {
      case 0:
        return onBack();
      case 3:
        return onAccessibility();
    }
  };

  const handleChange = (index: number) => {
    switch (index) {
      case 1:
        return audio.toggle('sounds');
      case 2:
        return audio.toggle('music');
    }
  };

  return (
    <Menu onSelect={handleSelect} onChange={handleChange}>
      <MenuStatic pos={[16, 32]} text="OPTIONS" color="#f0f" />
      <MenuItem index={0} pos={[32, 48]} text="BACK" />
      <MenuLabel index={1} pos={[32, 64]} text="SOUNDS" />
      <MenuItem index={1} pos={[216, 64]} text={soundsText} hasOptions />
      <MenuLabel index={2} pos={[32, 80]} text="MUSIC" />
      <MenuItem index={2} pos={[216, 80]} text={musicText} hasOptions />
      <MenuItem index={3} pos={[32, 96]} text="ACCESSIBILITY" />
    </Menu>
  );
};
