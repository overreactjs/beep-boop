import { Position, VariableProperty } from "@overreact/engine";
import { ObjectState } from "./ObjectState";

export class GlitchState extends ObjectState {

  cells: VariableProperty<number>[];

  constructor() {
    super();
    this.cells = new Array(800).fill(0).map(() => {
      return new VariableProperty(0);
    });
  }

  update(delta: number) {
    for (let i = 0; i < this.cells.length; i++) {
      const cell = this.cells[i];
      if (cell.current > 0) {
        cell.current = Math.max(0, cell.current - delta);
      }
    }
  }

  reset() {
    for (let i = 0; i < this.cells.length; i++) {
      this.cells[i].current = 0;
    }
  }

  trigger(x: number, y: number) {
    if (x >= 0 && x < 32 && y >= 0 && y < 25) {
      this.cells[y * 32 + x].current = 1500 + Math.random() * 4000;
    }
  }

  check([x, y]: Position) {
    if (x >= 0 && x < 32 && y >= 0 && y < 25) {
      return this.cells[y * 32 + x].current > 0;
    } else {
      return false;
    }
  }
}