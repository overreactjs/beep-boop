import { Box } from "@overreact/engine";
import { MenuItem } from "./MenuItem";
import { Menu } from "./Menu";
import { ArcadeText } from "../ArcadeText";
import { useCallback } from "react";

type TitleScreenProps = {
  onStart: () => void;
};

export const TitleScreen: React.FC<TitleScreenProps> = ({ onStart }) => {

  const handleSelect = useCallback((index: number) => {
    if (index === 0) {
      onStart();
    }
  }, [onStart]);

  return (
    <div>
      <Box pos={[0, 0]} size={[256, 240]} color="black">
        <Menu onSelect={handleSelect}>
          <MenuItem index={0} pos={[80, 144]} text="INSERT COIN" />
          <MenuItem index={1} pos={[96, 160]} text="OPTIONS" />
          <MenuItem index={2} pos={[96, 176]} text="CREDITS" />
        </Menu>
        <ArcadeText pos={[0, 232]} text="v1.0" />
        <ArcadeText pos={[176, 232]} text="CREDITS: 0" />
      </Box>
    </div>
  );
};
