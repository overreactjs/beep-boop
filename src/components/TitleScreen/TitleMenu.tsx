import { Menu, MenuItem } from "../Menu";

type TitleMenuProps = {
  onNewGame: () => void;
  onHighscoreTable: () => void;
  onSettings: () => void;
  onCredits: () => void;
  onQuit: () => void;
};

export const TitleMenu: React.FC<TitleMenuProps> = (props) => {
  const { onNewGame, onHighscoreTable, onSettings, onCredits, onQuit } = props;

  const handleSelect = (index: number) => {
    switch (index) {
      case 0:
        return onNewGame();
      case 1:
        return onHighscoreTable();
      case 2:
        return onSettings();
      case 3:
        return onCredits();
      case 4:
        return onQuit();
    }
  };

  return (
    <Menu onSelect={handleSelect}>
      <MenuItem index={0} pos={[96, 136]} text="NEW GAME" />
      <MenuItem index={1} pos={[96, 152]} text="HIGH SCORES" />
      <MenuItem index={2} pos={[96, 168]} text="SETTINGS" />
      <MenuItem index={3} pos={[96, 184]} text="CREDITS" />
      <MenuItem index={4} pos={[96, 200]} text="QUIT" />
    </Menu>
  );
};


