import { Device } from "@overreact/engine";
import { AudioEngine, BeepBoop } from "./components";
import { useHideStatusBar } from "./hooks";

export const App = () => {
  useHideStatusBar();

  return (
    <AudioEngine>
      <Device mode="desktop" bg="black" showFPS hideClose>
        <BeepBoop />
      </Device>
    </AudioEngine>
  );
};
