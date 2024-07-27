import { Box } from "@overreact/engine";
import { Screen } from "../Screen";
import { Menu, MenuItem } from "../Menu";
import { MenuStatic } from "../Menu/MenuLabel";

type CreditsScreenProps = {
  onBack: () => void;
};

export const CreditsScreen: React.FC<CreditsScreenProps> = ({ onBack }) => {
  return (
    <Screen size={[256, 240]} scale="auto">
      <Box pos={[0, 0]} size={[256, 240]} color="black">
        <Menu onSelect={onBack} onBack={onBack}>
          <MenuStatic pos={[16, 32]} text="CREDITS" color="#f0f" />
          <MenuItem index={0} pos={[32, 48]} text="BACK" />
        </Menu>
      </Box>
    </Screen>
  );
};
