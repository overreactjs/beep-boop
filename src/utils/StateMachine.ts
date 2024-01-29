export type StateBehaviour<S extends string, T> = (fsm: StateMachine<S, T>, delta: number) => void;

export type StateDefinitions<S extends string, T> = Record<string, StateBehaviour<S, T>>;

export class StateMachine<S extends string, T> {

  entity: T;

  states: StateDefinitions<S, T>;

  state: S[] = [];

  age: number = 0;

  constructor(entity: T, state: S, states: StateDefinitions<S, T>) {
    this.entity = entity;
    this.state = [state];
    this.states = states;
  }

  update(delta: number) {
    this.age += delta;
    (this.states[this.state[this.state.length - 1]])?.(this, delta);
  }

  push(state: S) {
    this.state.push(state);
    this.age = 0;
  }

  pop() {
    this.state.pop();
    this.age = 0;
  }

  replace(state: S) {
    this.state[this.state.length - 1] = state;
    this.age = 0;
  }
}