import { Device, Engine } from "@overreact/engine";
import { Screen } from "./components";

export const App = () => {
  return (
    <Engine>
      <Device mode="desktop" bg="black" showFPS hideClose>
        <Screen size={[256, 240]}>
          <div />
        </Screen>
      </Device>
    </Engine>
  );
};
