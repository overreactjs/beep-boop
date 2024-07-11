import { Menu, MenuItem, MenuLabel } from "../Menu";

type AccessibilityProps = {
  onBack: () => void;
};

export const Accessibility: React.FC<AccessibilityProps> = (props) => {
  const { onBack } = props;

  const handleSelect = (index: number) => {
    switch (index) {
      case 0:
        return onBack();
    }
  };

  const handleChange = (index: number) => {
    switch (index) {
      case 1:
        return;
    }
  };

  return (
    <Menu onSelect={handleSelect} onChange={handleChange}>
      <MenuItem index={0} pos={[16, 48]} text="Back" />
      <MenuLabel index={1} pos={[16, 80]} text="Explosion Flashes" />
      <MenuItem index={1} pos={[224, 80]} text="On" hasOptions />
    </Menu>
  );
};
