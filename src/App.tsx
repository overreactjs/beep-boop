import { Device } from "@overreact/engine";
import { BeepBoop } from "./components";
import { useHideStatusBar } from "./hooks";

export const App = () => {
  // Hide the status bar on mobile devices.
  useHideStatusBar();

  return (
    <Device mode="desktop" bg="black" showFPS hideClose>
      <BeepBoop />
    </Device>
  );
};

