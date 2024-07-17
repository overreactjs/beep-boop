import { Menu, MenuItem } from "../Menu";

type TitleMenuProps = {
  onNewGame: () => void;
  onOptions: () => void;
  onCredits: () => void;
};

export const TitleMenu: React.FC<TitleMenuProps> = (props) => {
  const { onNewGame, onOptions, onCredits } = props;

  const handleSelect = (index: number) => {
    switch (index) {
      case 0:
        return onNewGame();
      case 1:
        return onOptions();
      case 2:
        return onCredits();
    }
  };

  return (
    <Menu onSelect={handleSelect}>
      <MenuItem index={0} pos={[96, 144]} text="NEW GAME" />
      <MenuItem index={1} pos={[96, 160]} text="OPTIONS" />
      <MenuItem index={2} pos={[96, 176]} text="CREDITS" />
    </Menu>
  );
};


