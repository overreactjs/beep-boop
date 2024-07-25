import { ObjectState, Property } from "@overreact/engine";
import { useMemo, useRef } from "react";

export function useCalculatedProperty<OUT>(fn: () => OUT): Property<OUT> {
  const ref = useRef(fn);

  return useMemo(() => new CalculatedProperty(ref.current), [ref]);
}

class CalculatedProperty<T> extends ObjectState {

  private fn: () => T;

  constructor(fn: () => T) {
    super();
    this.fn = fn;
  }

  get current() {
    return this.fn();
  }

  set current(_: T) {
    // do nothing
  }

  get invalidated() {
    return true;
  }

  set invalidated(_: boolean) {
    // do nothing
  }
}
