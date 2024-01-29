export type StateBehaviour<T> = (fsm: StateMachine<T>, delta: number) => void;

export type StateDefinitions<T> = Record<string, StateBehaviour<T>>;

export class StateMachine<T> {

  entity: T;

  states: StateDefinitions<T>;

  state: string[] = ['idle'];

  age: number = 0;

  constructor(entity: T, states: StateDefinitions<T>) {
    this.entity = entity;
    this.states = states;
  }

  update(delta: number) {
    this.age += delta;
    (this.states[this.state[this.state.length - 1]])?.(this, delta);
  }

  push(state: string) {
    this.state.push(state);
    this.age = 0;
  }

  pop() {
    this.state.pop();
    this.age = 0;
  }

  replace(state: string) {
    this.state[this.state.length - 1] = state;
    this.age = 0;
  }
}