import { Device } from "@overreact/engine";
import { Screen, VirtualController, BeepBoop } from "./components";
import { useHideStatusBar } from "./hooks";

export const App = () => {
  // Hide the status bar on mobile devices.
  useHideStatusBar();

  return (
    <Device mode="desktop" bg="black" showFPS hideClose>
      <Screen size={[256, 240]} scale="auto">
        <BeepBoop />
      </Screen>
      <VirtualController />
    </Device>
  );
};

