import { useState } from "react";
import { Device, Engine } from "@overreact/engine";
import { Arena, BottomBar, Game, LevelOverlay, Screen, TopBar } from "./components";
import { ArcadeText } from "./components/ArcadeText";

export const App = () => {
  const [active, setActive] = useState(false);

  return (
    <Engine>
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
    </Engine>
  );
};
