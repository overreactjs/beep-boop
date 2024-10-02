import { Property, useMergeProperty } from "@overreact/engine";

export const useMergeBooleans = (a: Property<boolean>, b: Property<boolean>) => {
  return useMergeProperty(a, b, (a, b) => a && b);
};
