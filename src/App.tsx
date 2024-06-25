import { useState } from "react";
import { Device, useGamepad, useUpdate } from "@overreact/engine";
import { ArcadeText, Arena, BottomBar, Game, LevelOverlay, Screen, TopBar, VirtualController } from "./components";
import { useHideStatusBar } from "./hooks";

export const App = () => {
  const gamepad = useGamepad();
  const [active, setActive] = useState(false);

  // Hide the status bar on mobile devices.
  useHideStatusBar();

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
          <StartScreen onClick={() => setActive(true)} />
        )}
      </Screen>
      <VirtualController />
    </Device>
  );
};

const StartScreen: React.FC<{ onClick: () => void }> = ({ onClick }) => (
  <div className="w-full h-full bg-black grid place-items-center [&>*]:static" onClick={onClick}>
    <ArcadeText pos={[0, 0]} color="white" text="TAP TO BEGIN" />
  </div>
);
