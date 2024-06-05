import { Device, Engine } from "@overreact/engine";
import { Arena, BottomBar, Game, LevelOverlay, Screen, TopBar } from "./components";

export const App = () => {
  return (
    <Engine>
      <Device mode="desktop" bg="black" showFPS hideClose>
        <Screen size={[256, 240]} scale="auto">
          <Game>
            <TopBar />
            <Arena />
            <LevelOverlay />
            <BottomBar />
          </Game>
        </Screen>
      </Device>
    </Engine>
  );
};
