import { useKeyPressed } from "@overreact/engine";
import { Menu, MenuItem } from "../Menu";

type NewGameProps = {
  onBack: () => void;
  onStart: () => void;
};

export const NewGame: React.FC<NewGameProps> = (props) => {
  const { onStart, onBack } = props;

  useKeyPressed('Escape', onBack);

  const handleSelect = (index: number) => {
    switch (index) {
      case 0:
        return onStart();
    }
  };

  return (
    <Menu onSelect={handleSelect}>
      <MenuItem index={0} pos={[96, 160]} text="1 PLAYER" />
      <MenuItem index={1} pos={[96, 176]} text="2 PLAYERS" />
    </Menu>
  );
};


