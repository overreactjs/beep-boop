import { Box } from "@overreact/engine";
import { ArcadeText } from "../ArcadeText";
import { Menu, MenuItem } from "../Menu";
import { Screen } from "../Screen";

type TitleScreenProps = {
  onStart: () => void;
  onOptions: () => void;
  onCredits: () => void;
};

export const TitleScreen: React.FC<TitleScreenProps> = (props) => {
  const { onStart, onOptions, onCredits } = props;

  const handleSelect = (index: number) => {
    switch (index) {
      case 0:
        return onStart();
      case 1:
        return onOptions();
      case 2:
        return onCredits();
    }
  };

  return (
    <Screen size={[256, 240]} scale="auto">
      <Box pos={[0, 0]} size={[256, 240]} color="black">
        <Menu onSelect={handleSelect}>
          <MenuItem index={0} pos={[80, 144]} text="INSERT COIN" />
          <MenuItem index={1} pos={[96, 160]} text="OPTIONS" />
          {/* <MenuItem index={2} pos={[96, 176]} text="CREDITS" /> */}
        </Menu>
        <ArcadeText pos={[0, 232]} text="v1.0" />
        <ArcadeText pos={[176, 232]} text="Credits: 0" />
      </Box>
    </Screen>
  );
};
