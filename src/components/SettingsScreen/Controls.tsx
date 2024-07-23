import { Menu, MenuItem } from "../Menu";
import { MenuStatic } from "../Menu/MenuLabel";

type ControlsProps = {
  onBack: () => void;
};

export const Controls: React.FC<ControlsProps> = (props) => {
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
    <Menu onSelect={handleSelect} onChange={handleChange} onBack={onBack}>
      <MenuStatic pos={[16, 32]} text="CONTROLS" color="#f0f" />
      <MenuItem index={0} pos={[32, 48]} text="BACK" />
    </Menu>
  );
};


