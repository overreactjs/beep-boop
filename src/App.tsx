import { Device, Engine } from "@overreact/engine";
import { Arena, BottomBar, Game, Screen, TopBar } from "./components";

export const App = () => {
  return (
    <Engine>
      <Device mode="desktop" bg="black" showFPS hideClose>
        <Screen size={[256, 240]} scale="auto">
          <Game>
            <TopBar />
            <Arena />
            {/* <Overlay /> */}
            <BottomBar />
          </Game>
        </Screen>
      </Device>
    </Engine>
  );
};

// const Overlay = () => {
//   const game = useGame();
//   const text = useDynamicProperty(game.level, (level) => `STAGE ${String(level).padStart(2, '0')}`);

//   return (
//     <Node>
//       <ArcadeText pos={[96, 104]} color="white" text={text} />
//       <ArcadeText pos={[88, 136]} color="white" text="GET READY!" />
//     </Node>
//   )
// }