import { Position, Property, VariableProperty, Velocity } from "@overreact/engine";
import { PositionedObjectState } from "./PositionedObjectState";

type Signal<T> = {
  payload: T;
}

export class EntityObjectState extends PositionedObjectState {

  velocity: Property<Velocity>;

  readonly signals: Map<string, Signal<unknown>> = new Map();

  constructor(pos: Position) {
    super(pos);
    this.velocity = new VariableProperty([0, 0]);
  }

  signal(type: string, payload?: unknown) {
    this.signals.set(type, { payload });
  }

  handleSignal(type: string, fn: () => void) {
    if (this.hasSignal(type)) {
      this.clearSignal(type);
      fn();
    }
  }

  hasSignal(type: string) {
    return this.signals.has(type);
  }

  clearSignal(type: string) {
    this.signals.delete(type);
  }
}
