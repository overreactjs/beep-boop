import { useElement, usePointer, useKeyboard, useUpdate } from "@overreact/engine";
import { RefObject, useRef } from "react";
import { ArcadeText } from "../ArcadeText";

export const VirtualController: React.FC = () => {
  return (
    <div className="flex absolute left-2 right-2 bottom-20">
      <Control code="KeyA" text="<" />
      <Control code="KeyD" text=">" />
      <div className="grow" />
      <Control code="KeyW" text="↑" />
      <Control code="Space" text="~" />
    </div>
  );
};

type ControlProps = {
  code: string;
  text: string;
};

const Control: React.FC<ControlProps> = ({ code, text }) => {
  const { ref } = useElement();
  useSimulateButton(code, ref);

  return (
    <div ref={ref} className="p-3">
      <div className="w-16 h-16 rounded-full shadow-lg border-2 border-solid border-white grid place-items-center [&>*]:static [&>*]:!scale-[4] [&>*]:!translate-x-[2px] [&>*]:!translate-y-[2px]">
        <ArcadeText pos={[0, 0]} text={text} />
      </div>
    </div>
  );
};

const useSimulateButton = (code: string, ref: RefObject<Element | null>) => {
  const isDown = useRef(false);
  const pointer = usePointer();
  const keyboard = useKeyboard();

  useUpdate(() => {
    if (ref.current) {
      const isButtonDown = pointer.isDown() && pointer.isTarget(ref.current);

      if (!isDown.current && isButtonDown) {
        keyboard.simulateKeyDown(code);
        isDown.current = true;
      } else if (isDown.current && !isButtonDown) {
        keyboard.simulateKeyUp(code);
        isDown.current = false;
      }
    }
  });
};
