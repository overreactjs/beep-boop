import { Position, Property, VariableProperty } from "@overreact/engine";
import { PositionedObjectState } from "./PositionedObjectState";
import { Direction } from "../types";
import { GameState } from "./GameState";

class StatefulObjectState extends PositionedObjectState {
  state: Property<string[]>;

  constructor(pos: Position) {
    super(pos);
    this.state = new VariableProperty(['idle']);
  }

  push(state: string) {
    this.state.current.push(state);
  }
}

export class EnemyState extends StatefulObjectState {
  flip: Property<boolean>;
  direction: Property<Direction>;

  constructor(pos: Position) {
    super(pos);
    this.flip = new VariableProperty(false);
    this.direction = new VariableProperty('right');
  }

  update(game: GameState, simulate: (what: string) => void) {
    const [x, y] = this.block.current;

    if (this.direction.current === 'right') {
      if (!game.isSolid(x + 1, y) || game.isSolid(x + 1, y - 1)) {
        this.direction.current = 'left';
      }
    } else {
      if (!game.isSolid(x - 1, y) || game.isSolid(x - 1, y - 1)) {
        this.direction.current = 'right';
      }
    }

    if (this.direction.current === 'left') {
      simulate('left');
    } else {
      simulate('right');
    }
  }
}
