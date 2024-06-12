import { Property, useProperty, useUpdate } from "@overreact/engine";

export function useCalculatedProperty<OUT>(initial: OUT, fn: () => OUT): Property<OUT> {
  const prop = useProperty<OUT>(initial);

  useUpdate(() => {
    prop.current = fn();
  });

  return prop;
}
