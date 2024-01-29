import { Property, VariableProperty } from "@overreact/engine";

export type StateBehaviour<S extends string, T> = (fsm: StateMachine<S, T>, delta: number) => void;

export type StateDefinitions<S extends string, T> = Record<string, StateBehaviour<S, T>>;

export class StateMachine<S extends string, T> {

  entity: T;

  states: StateDefinitions<S, T>;

  state: Property<S[]>;

  age: number = 0;
  
  init = false;

  constructor(entity: T, state: S, states: StateDefinitions<S, T>) {
    this.entity = entity;
    this.state = new VariableProperty([state]);
    this.states = states;
  }

  update(delta: number) {
    if (!this.init) {
      this.age += delta;
    }
    
    this.init = false;
  
    const state = this.state.current;
    (this.states[state[state.length - 1]])?.(this, delta);
  }

  push(state: S) {
    this.state.current.push(state);
    this.age = 0;
    this.init = true;
  }

  pop() {
    this.state.current.pop();
    this.age = 0;
    this.init = true;
  }

  replace(state: S) {
    const index = this.state.current.length - 1;
    
    if (this.state.current[index] !== state) {
      this.state.current[index] = state;
      this.age = 0;
      this.init = true;
    }
  }
}