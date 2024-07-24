import { BitmapImage } from "@overreact/engine";
import { Menu, MenuItem } from "../Menu";
import { LOGO } from "./assets";
import { useGame, useSettings } from "../../hooks";

type PlayersSelectProps = {
  onBack: () => void;
  onSelect: () => void;
};

export const PlayersSelect: React.FC<PlayersSelectProps> = (props) => {
  const { onSelect, onBack } = props;
  const game = useGame();
  const settings = useSettings();

  const handleSelect = (index: number) => {
    settings.keyboardAssign.current = [false, false];
    settings.gamepadAssign.current = [null, null];

    switch (index) {
      case 0:
        game.initPlayers(1);
        return onSelect();
      case 1:
        game.initPlayers(2);
        return onSelect();
    }
  };

  return (
    <>
      <BitmapImage image={LOGO} pos={[64, 8]} size={[128, 128]} offset={[0, 0]} />
      <Menu onSelect={handleSelect} onBack={onBack}>
        <MenuItem index={0} pos={[96, 160]} text="1 PLAYER" />
        <MenuItem index={1} pos={[96, 176]} text="2 PLAYERS" />
      </Menu>
    </>
  );
};


