import { DynamicProperty, Property, VariableProperty } from "@overreact/engine";

export type StateBehaviour<S extends string, T> = (fsm: StateMachine<S, T>, delta: number) => void;

export type StateDefinitions<S extends string, T> = Record<string, StateBehaviour<S, T>>;

export class StateMachine<S extends string, T> {

  entity: T;

  states: StateDefinitions<S, T>;

  stack: Property<S[]>;

  readonly state: Property<S>;

  age: number = 0;
  
  init = false;

  constructor(entity: T, state: S, states: StateDefinitions<S, T>) {
    this.entity = entity;
    this.stack = new VariableProperty([state]);
    this.state = new DynamicProperty(this.stack, (stack) => stack[stack.length - 1]);
    this.states = states;
  }

  update(delta: number) {
    if (!this.init) {
      this.age += delta;
    }
    
    this.init = false;
  
    const stack = this.stack.current;
    (this.states[stack[stack.length - 1]])?.(this, delta);
  }

  push(state: S) {
    this.stack.current.push(state);
    this.age = 0;
    this.init = true;
  }

  pop() {
    this.stack.current.pop();
    this.age = 0;
    this.init = true;
  }

  replace(state: S) {
    const index = this.stack.current.length - 1;
    
    if (this.stack.current[index] !== state) {
      this.stack.current[index] = state;
      this.age = 0;
      this.init = true;
    }
  }
}