import { useDynamicProperty, useKeyboard } from "@overreact/engine";
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
  const keyboard = useKeyboard();

  const crtFilter = useBooleanOption(settings.crtFilter);
  const windowMode = useDynamicProperty(settings.windowMode, (mode) => mode.toUpperCase());
  const showFrameRate = useBooleanOption(settings.showFrameRate);
  
  const handleSelect = (index: number) => {
    switch (index) {
      case 0:
        return onBack();
    }
  };

  const handleChange = (index: number, direction: -1 | 1) => {
    switch (index) {
      case 1:
        settings.windowMode.next(direction);
        keyboard.simulateKeyUp('KeyA');
        keyboard.simulateKeyUp('KeyD');
        keyboard.simulateKeyUp('ArrowLeft');
        keyboard.simulateKeyUp('ArrowRight');
        window.engine?.setWindowMode(settings.windowMode.current);
        return;
      case 2:
        return settings.crtFilter.toggle();
      case 3:
        return settings.showFrameRate.toggle();
    }
  };

  return (
    <Menu onSelect={handleSelect} onChange={handleChange} onBack={onBack}>
      <MenuStatic pos={[16, 32]} text="VIDEO SETTINGS" color="#f0f" />
      <MenuItem index={0} pos={[32, 48]} text="BACK" />

      <MenuLabel index={1} pos={[32, 64]} text="WINDOW MODE" />
      <MenuItem index={1} pos={[240, 64]} text={windowMode} hasOptions align="right" />
      
      <MenuLabel index={2} pos={[32, 80]} text="CRT FILTER" />
      <MenuItem index={2} pos={[240, 80]} text={crtFilter} hasOptions align="right" />
      
      <MenuLabel index={3} pos={[32, 96]} text="SHOW FRAME RATE" />
      <MenuItem index={3} pos={[240, 96]} text={showFrameRate} hasOptions align="right" />
    </Menu>
  );
};


