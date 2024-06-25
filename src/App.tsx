import { useEffect, useState } from "react";
import { StatusBar } from '@capacitor/status-bar';
import { Device, useGamepad, useUpdate } from "@overreact/engine";
import { ArcadeText, Arena, BottomBar, Game, LevelOverlay, Screen, TopBar, VirtualController } from "./components";

export const App = () => {
  const gamepad = useGamepad();

  const [active, setActive] = useState(false);

  // Activate the app if "A" is pressed on a gamepad.
  useUpdate(() => {
    if (!active && gamepad.isButtonDown(0, 'A')) {
      setActive(true);
    }
  });

  // Hide the status bar on mobile devices.
  useEffect(() => {
    StatusBar.hide();
  }, []);

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
          <div className="w-full h-full bg-black grid place-items-center [&>*]:static" onClick={() => setActive(true)}>
            <ArcadeText pos={[0, 0]} color="white" text="TAP TO BEGIN" />
          </div>
        )}
      </Screen>
      <VirtualController />
    </Device>
  );
};
