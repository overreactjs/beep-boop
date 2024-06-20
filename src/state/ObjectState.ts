type Signal<T> = {
  payload: T;
}

export class ObjectState {
  static autoId: number = 0;

  id: number;

  readonly signals: Map<string, Signal<unknown>> = new Map();

  constructor() {
    this.id = ObjectState.autoId++;
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
