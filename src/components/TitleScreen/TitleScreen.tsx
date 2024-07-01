import { useGamepad, useUpdate } from "@overreact/engine";
import { ArcadeText } from "../ArcadeText";

type TitleScreenProps = {
  onStart: () => void;
};

export const TitleScreen: React.FC<TitleScreenProps> = ({ onStart }) => {
  const gamepad = useGamepad();
  
  useUpdate(() => {
    if (gamepad.isButtonDown(0, 'A')) {
      onStart();
    }
  });

  return (
    <div className="w-full h-full bg-black grid place-items-center [&>*]:static" onClick={onStart}>
      <ArcadeText pos={[0, 0]} color="white" text="TAP TO BEGIN" />
    </div>
  );
};
