import { Position, Property, useUpdate } from "@overreact/engine";

export const useWrapAround = (pos: Property<Position>) => {
  useUpdate(() => {
    if (pos.current[1] >= 216) {
      pos.current[1] -= 224;
    }
  });
};
