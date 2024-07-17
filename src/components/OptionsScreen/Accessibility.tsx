import { useDynamicProperty, useKeyPressed } from "@overreact/engine";
import { useSettings } from "../../hooks";
import { Menu, MenuItem, MenuLabel } from "../Menu";
import { MenuStatic } from "../Menu/MenuLabel";
import { useBooleanOption } from "./useBooleanOption";
import { useMappedOption } from "./useMappedOption";

type AccessibilityProps = {
  onBack: () => void;
};

export const Accessibility: React.FC<AccessibilityProps> = (props) => {
  const { onBack } = props;
  
  const settings = useSettings();
  const showExplosionFlashes = useBooleanOption(settings.showExplosionFlashes);
  const gameSpeed = useDynamicProperty(settings.gameSpeed, (value) => value.toFixed(1));
  const enemySpeed = useMappedOption(settings.enemySpeed, { '0.7': '  SLOW', '1': 'NORMAL' });
  const invincibility = useMappedOption(settings.invincibility, { '0': '  NO', '1': '  P1', '2': '  P2', '3': 'BOTH'});
  const infiniteLives = useMappedOption(settings.infiniteLives, { '0': '  NO', '1': '  P1', '2': '  P2', '3': 'BOTH'});
  const highContrast = useBooleanOption(settings.highContrast);
  const dyslexiaFont = useBooleanOption(settings.dyslexiaFont);
  const firingMode = useDynamicProperty(settings.firingMode, (mode) => mode.toUpperCase().padStart(10, ' '));
  const showPlayerIndicators = useBooleanOption(settings.showPlayerIndicators);

  useKeyPressed('Escape', onBack);
  
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
      case 3:
        return settings.enemySpeed.next(direction);
      case 4:
        return settings.invincibility.next(direction);
      case 5:
        return settings.infiniteLives.next(direction);
      case 6:
        return settings.highContrast.toggle();
      case 7:
        return settings.dyslexiaFont.toggle();
      case 8:
        return settings.firingMode.next(direction);
      case 9:
        return settings.showPlayerIndicators.toggle();
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
      
      <MenuLabel index={3} pos={[32, 96]} text="ENEMY SPEED" />
      <MenuItem index={3} pos={[192, 96]} text={enemySpeed} hasOptions />
      
      <MenuLabel index={4} pos={[32, 112]} text="INVINCIBILITY" />
      <MenuItem index={4} pos={[208, 112]} text={invincibility} hasOptions />
      
      <MenuLabel index={5} pos={[32, 128]} text="UNLIMITED LIVES" />
      <MenuItem index={5} pos={[208, 128]} text={infiniteLives} hasOptions />

      <MenuLabel index={6} pos={[32, 144]} text="HIGH CONTRAST" />
      <MenuItem index={6} pos={[216, 144]} text={highContrast} hasOptions />

      <MenuLabel index={7} pos={[32, 160]} text="DYSLEXIA FONT" />
      <MenuItem index={7} pos={[216, 160]} text={dyslexiaFont} hasOptions />

      <MenuLabel index={8} pos={[32, 176]} text="FIRING MODE" />
      <MenuItem index={8} pos={[160, 176]} text={firingMode} hasOptions />

      <MenuLabel index={9} pos={[32, 192]} text="PLAYER INDICATORS" />
      <MenuItem index={9} pos={[216, 192]} text={showPlayerIndicators} hasOptions />
    </Menu>
  );
};


