import { useCallback, useContext } from "react";
import { Box, Node, Position, useCachedDynamicProperty } from "@overreact/engine";
import { ArcadeText } from "../ArcadeText";
import { Menu, MenuItem } from "../Menu";
import { Screen } from "../Screen";
import { MenuContext } from "../Menu/MenuContext";

type OptionsProps = {
  onBack: () => void;
};

export const Options: React.FC<OptionsProps> = (props) => {
  const { onBack } = props;

  const handleSelect = useCallback((index: number) => {
    if (index === 0) {
      onBack();    
    }
  }, [onBack]);

  const handleChange = useCallback((index: number, direction: -1 | 1) => {
    console.log(index, direction);
  }, []);

  return (
    <Screen size={[256, 240]} scale="auto">
      <Box pos={[0, 0]} size={[256, 240]} color="black">
        <Menu onSelect={handleSelect} onChange={handleChange}>
          <MenuItem index={0} pos={[32, 48]} text="BACK" />
          <MenuLabel index={1} pos={[32, 80]} text="SOUNDS" />
          <MenuItem index={1} pos={[192, 80]} text="ON" hasOptions />
          <MenuLabel index={2} pos={[32, 96]} text="MUSIC" />
          <MenuItem index={2} pos={[192, 96]} text="ON" hasOptions />
          <MenuItem index={3} pos={[32, 128]} text="CONTROLS" />
          <MenuItem index={4} pos={[32, 144]} text="ACCESSIBILITY" />
        </Menu>
        <ArcadeText pos={[0, 232]} text="v1.0" />
        <ArcadeText pos={[176, 232]} text="CREDITS: 0" />
      </Box>
    </Screen>
  );
};

type MenuLabelProps = {
  index: number;
  pos: Position;
  text: string;
}

const MenuLabel: React.FC<MenuLabelProps> = ({ index, pos, text }) => {
  const menu = useContext(MenuContext);
  
  const color = useCachedDynamicProperty(menu.index, (active) => {
    return active === index ? '#fff' : '#777';
  });

  return (
    <Node pos={pos}>
      <ArcadeText color="white" text={text} />
      <Box size={[text.length * 8, 8]} color={color} className="mix-blend-multiply" />
    </Node>
  );
};
