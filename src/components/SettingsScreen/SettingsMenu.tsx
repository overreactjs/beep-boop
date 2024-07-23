import { Menu, MenuItem } from "../Menu";
import { MenuStatic } from "../Menu/MenuLabel";
import { useSettings } from "../../hooks";

type SettingsMenuProps = {
  onBack: () => void;
  onAudioSettings: () => void;
  onVideoSettings: () => void;
  onAccessibility: () => void;
  onControls: () => void;
};

export const SettingsMenu: React.FC<SettingsMenuProps> = (props) => {
  const settings = useSettings();

  const handleSelect = (index: number) => {
    switch (index) {
      case 0:
        settings.save();
        return props.onBack();
      case 1:
        return props.onAudioSettings();
      case 2:
        return props.onVideoSettings();
      case 3:
        return props.onAccessibility();
      case 4:
        return props.onControls();
    }
  };

  return (
    <Menu onSelect={handleSelect} onBack={props.onBack}>
      <MenuStatic pos={[16, 32]} text="SETTINGS" color="#f0f" />
      <MenuItem index={0} pos={[32, 48]} text="BACK" />
      <MenuItem index={1} pos={[32, 64]} text="AUDIO SETTINGS" />
      <MenuItem index={2} pos={[32, 80]} text="VIDEO SETTINGS" />
      <MenuItem index={3} pos={[32, 96]} text="ACCESSIBILITY" />
      <MenuItem index={4} pos={[32, 112]} text="CONTROLS" />
    </Menu>
  );
};
