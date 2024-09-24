import { Property, useCachedDynamicProperty } from "@overreact/engine";

export const useBooleanOption = (value: Property<boolean>) => {
  return useCachedDynamicProperty(value, (value) => value ? 'YES' : 'NO')
};
