import { Property, useDynamicProperty } from "@overreact/engine";

export function useMappedOption<T>(value: Property<T>, map: Record<string, string>) {
  return useDynamicProperty(value, (value: T) => map[String(value)]);
}
