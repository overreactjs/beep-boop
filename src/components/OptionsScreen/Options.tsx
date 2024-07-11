import { useAudioEngine } from "../../hooks/useAudioEngine";
import { Menu, MenuItem, MenuLabel } from "../Menu";

type OptionsProps = {
  onBack: () => void;
  onAccessibility: () => void;
};

export const Options: React.FC<OptionsProps> = (props) => {
  const { onBack, onAccessibility } = props;
  const audio = useAudioEngine();

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
        audio.toggle('sounds');
        return;
      case 2:
        audio.toggle('music');
        return;
    }
  };

  return (
    <Menu onSelect={handleSelect} onChange={handleChange}>
      <MenuItem index={0} pos={[16, 48]} text="Back" />
      <MenuLabel index={1} pos={[16, 80]} text="Sounds" />
      <MenuItem index={1} pos={[224, 80]} text="On" hasOptions />
      <MenuLabel index={2} pos={[16, 96]} text="Music" />
      <MenuItem index={2} pos={[224, 96]} text="On" hasOptions />
      <MenuItem index={3} pos={[16, 128]} text="Accessibility" />
    </Menu>
  );
};
