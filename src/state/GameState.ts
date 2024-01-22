import { ObjectState, Position, Property, VariableProperty } from "@overreact/engine";

export class GameState {
  highscore = new VariableProperty(100000);

  players = [
    new PlayerState([32, 192]),
    new PlayerState([224, 192]),
  ];

//   addScore(delta: number) {
//     this.score += delta;
//   }

//   collectGem(gem: GemState) {
//     this.gems.remove(gem);
//     this.addScore(100);
//   }
}

class PlayerState extends ObjectState {
  pos: Property<Position>;
  flip: Property<boolean>;
  score: Property<number>;

  constructor(pos: Position) {
    super();
    this.pos = new VariableProperty(pos);
    this.flip = new VariableProperty(false);
    this.score = new VariableProperty(0);
  }

  addPoints(points: number) {
    this.score.current += points;
  }
}