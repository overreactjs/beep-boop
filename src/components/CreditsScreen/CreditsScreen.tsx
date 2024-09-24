import { Box } from "@overreact/engine";
import { Screen } from "../Screen";
import { Menu, MenuItem } from "../Menu";
import { MenuStatic } from "../Menu/MenuLabel";
import { TintedArcadeText } from "../ArcadeText";

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

          <TintedArcadeText pos={[32, 80]} text="ENGINE, CODING, GAME DESIGN" color="#888" />
          <TintedArcadeText pos={[48, 96]} text="CRAIG SMITH" color="#0ff" />

          <TintedArcadeText pos={[32, 112]} text="ANIMATIONS" color="#888" />
          <TintedArcadeText pos={[48, 128]} text="SAMUELE FUELA" color="#0ff" />

          <TintedArcadeText pos={[32, 144]} text="MUSIC, SOUND EFFECTS" color="#888" />
          <TintedArcadeText pos={[48, 160]} text="SKETCHY LOGIC" color="#0ff" />
        </Menu>
      </Box>
    </Screen>
  );
};
