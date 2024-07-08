import { useProperty, useDynamicProperty, useCachedDynamicProperty, useUpdate } from "@overreact/engine";

const COLORS = ['#00f', '#f00', '#f0f', '#0f0', '#0ff', '#ff0', '#fff'];

export const useCycle = () => {
  const time = useProperty(0);
  const index = useDynamicProperty(time, (time) => Math.floor(time / 100) % 7);
  const color = useCachedDynamicProperty(index, (index) => COLORS[index]);

  useUpdate((delta) => {
    time.current += delta;
  });

  return color;
};
