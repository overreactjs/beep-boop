import { useState } from "react";
import { Device, useGamepad, useUpdate } from "@overreact/engine";
import { ArcadeText, Arena, BottomBar, Game, LevelOverlay, Screen, TopBar } from "./components";

export const App = () => {
  const gamepad = useGamepad();

  const [active, setActive] = useState(false);

  // Activate the app if "A" is pressed on a gamepad.
  useUpdate(() => {
    if (!active && gamepad.isButtonDown(0, 'A')) {
      setActive(true);
    }
  });
  

  return (
    <Device mode="desktop" bg="black" showFPS hideClose>
      <Screen size={[256, 240]} scale="auto">
        {active ? (
          <Game>
            <TopBar />
            <Arena />
            <LevelOverlay />
            <BottomBar />
          </Game>
        ) : (
          <div className="w-full h-full bg-black grid place-items-center" onClick={() => setActive(true)}>
            <ArcadeText pos={[0, 0]} color="white" text="TAP TO BEGIN" />
          </div>
        )}
      </Screen>
    </Device>
  );
};
