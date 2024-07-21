import { Menu, MenuItem } from "../Menu";

type TitleMenuProps = {
  onNewGame: () => void;
  onSettings: () => void;
  onCredits: () => void;
  onQuit: () => void;
};

export const TitleMenu: React.FC<TitleMenuProps> = (props) => {
  const { onNewGame, onSettings, onCredits, onQuit } = props;

  const handleSelect = (index: number) => {
    switch (index) {
      case 0:
        return onNewGame();
      case 1:
        return onSettings();
      case 2:
        return onCredits();
      case 3:
        return onQuit();
    }
  };

  return (
    <Menu onSelect={handleSelect}>
      <MenuItem index={0} pos={[96, 144]} text="NEW GAME" />
      <MenuItem index={1} pos={[96, 160]} text="SETTINGS" />
      <MenuItem index={2} pos={[96, 176]} text="CREDITS" />
      <MenuItem index={3} pos={[96, 192]} text="QUIT" />
    </Menu>
  );
};


