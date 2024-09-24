import { useDynamicProperty } from "@overreact/engine";
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
  const enemySpeed = useMappedOption(settings.enemySpeed, { '0.7': 'SLOW', '1': 'NORMAL' });
  const invincibility = useMappedOption(settings.invincibility, { '0': 'NO', '1': 'P1', '2': 'P2', '3': 'BOTH'});
  const infiniteLives = useMappedOption(settings.infiniteLives, { '0': 'NO', '1': 'P1', '2': 'P2', '3': 'BOTH'});
  const highContrast = useBooleanOption(settings.highContrast);
  const dyslexiaFont = useBooleanOption(settings.dyslexiaFont);
  const firingMode = useDynamicProperty(settings.firingMode, (mode) => mode.toUpperCase());
  const showPlayerIndicators = useBooleanOption(settings.showPlayerIndicators);
  const hurryUpMode = useMappedOption(settings.hurryUpMode, { 'normal': 'NORMAL', 'noGlitch': 'NO GLITCH', 'off': 'OFF'});
  
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
      case 10:
        return settings.hurryUpMode.next(direction);
    }
  };

  return (
    <Menu onSelect={handleSelect} onChange={handleChange} onBack={onBack}>
      <MenuStatic pos={[16, 32]} text="ACCESSIBILITY" color="#f0f" />
      <MenuItem index={0} pos={[32, 48]} text="BACK" />
      
      <MenuLabel index={1} pos={[32, 64]} text="BACKGROUND FLASHES" />
      <MenuItem index={1} pos={[240, 64]} text={showExplosionFlashes} hasOptions align="right" />
      
      <MenuLabel index={2} pos={[32, 80]} text="GAME SPEED" />
      <MenuItem index={2} pos={[240, 80]} text={gameSpeed} hasOptions align="right" />
      
      <MenuLabel index={3} pos={[32, 96]} text="ENEMY SPEED" />
      <MenuItem index={3} pos={[240, 96]} text={enemySpeed} hasOptions align="right" />
      
      <MenuLabel index={4} pos={[32, 112]} text="INVINCIBILITY" />
      <MenuItem index={4} pos={[240, 112]} text={invincibility} hasOptions align="right" />
      
      <MenuLabel index={5} pos={[32, 128]} text="UNLIMITED LIVES" />
      <MenuItem index={5} pos={[240, 128]} text={infiniteLives} hasOptions align="right" />

      <MenuLabel index={6} pos={[32, 144]} text="HIGH CONTRAST" />
      <MenuItem index={6} pos={[240, 144]} text={highContrast} hasOptions align="right" />

      <MenuLabel index={7} pos={[32, 160]} text="DYSLEXIA FONT" />
      <MenuItem index={7} pos={[240, 160]} text={dyslexiaFont} hasOptions align="right" />

      <MenuLabel index={8} pos={[32, 176]} text="FIRING MODE" />
      <MenuItem index={8} pos={[240, 176]} text={firingMode} hasOptions align="right" />

      <MenuLabel index={9} pos={[32, 192]} text="PLAYER INDICATORS" />
      <MenuItem index={9} pos={[240, 192]} text={showPlayerIndicators} hasOptions align="right" />

      <MenuLabel index={10} pos={[32, 208]} text="HURRY UP" />
      <MenuItem index={10} pos={[240, 208]} text={hurryUpMode} hasOptions align="right" />
    </Menu>
  );
};


