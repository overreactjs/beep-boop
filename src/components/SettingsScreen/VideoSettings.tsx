import { useKeyPressed } from "@overreact/engine";
import { Menu, MenuItem } from "../Menu";
import { MenuLabel, MenuStatic } from "../Menu/MenuLabel";
import { useSettings } from "../../hooks";
import { useBooleanOption } from "./useBooleanOption";

type VideoSettingsProps = {
  onBack: () => void;
};

export const VideoSettings: React.FC<VideoSettingsProps> = (props) => {
  const { onBack } = props;

  const settings = useSettings();
  const crtFilter = useBooleanOption(settings.crtFilter);

  useKeyPressed('Escape', onBack);
  
  const handleSelect = (index: number) => {
    switch (index) {
      case 0:
        return onBack();
    }
  };

  const handleChange = (index: number) => {
    switch (index) {
      case 1:
        return settings.crtFilter.toggle();
    }
  };

  return (
    <Menu onSelect={handleSelect} onChange={handleChange}>
      <MenuStatic pos={[16, 32]} text="VIDEO SETTINGS" color="#f0f" />
      <MenuItem index={0} pos={[32, 48]} text="BACK" />
      
      <MenuLabel index={1} pos={[32, 64]} text="CRT FILTER" />
      <MenuItem index={1} pos={[216, 64]} text={crtFilter} hasOptions />
    </Menu>
  );
};


