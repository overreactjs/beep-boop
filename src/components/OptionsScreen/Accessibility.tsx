import { useDynamicProperty } from "@overreact/engine";
import { useSettings } from "../../hooks";
import { Menu, MenuItem, MenuLabel } from "../Menu";
import { MenuStatic } from "../Menu/MenuLabel";
import { useBooleanOption } from "./useBooleanOption";

type AccessibilityProps = {
  onBack: () => void;
};

export const Accessibility: React.FC<AccessibilityProps> = (props) => {
  const { onBack } = props;
  
  const settings = useSettings();
  const showExplosionFlashes = useBooleanOption(settings.showExplosionFlashes);
  const gameSpeed = useDynamicProperty(settings.gameSpeed, (value) => value.toFixed(1));

  const handleSelect = (index: number) => {
    switch (index) {
      case 0:
        return onBack();
    }
  };

  const handleChange = (index: number, direction: -1 | 1) => {
    switch (index) {
      case 1:
        return settings.showExplosionFlashes.toggle();
      case 2:
        return settings.gameSpeed.next(direction);
    }
  };

  return (
    <Menu onSelect={handleSelect} onChange={handleChange}>
      <MenuStatic pos={[16, 32]} text="ACCESSIBILITY" color="#f0f" />
      <MenuItem index={0} pos={[32, 48]} text="BACK" />
      <MenuLabel index={1} pos={[32, 64]} text="EXPLOSION FLASHES" />
      <MenuItem index={1} pos={[216, 64]} text={showExplosionFlashes} hasOptions />
      <MenuLabel index={2} pos={[32, 80]} text="GAME SPEED" />
      <MenuItem index={2} pos={[216, 80]} text={gameSpeed} hasOptions />
    </Menu>
  );
};
