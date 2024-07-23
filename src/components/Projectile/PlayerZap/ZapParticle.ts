import { Property, Position, Velocity, VariableProperty, BaseParticle } from "@overreact/engine";
import { PlayerZapState } from "../../../state";
import { PLAYER_COLORS } from "../../../data/constants";
import { PlayerColor } from "../../../types";

type Direction = 1 | -1;

export class ZapParticle extends BaseParticle {
  
  direction: Direction;

  color: PlayerColor;

  pos: Property<Position>;

  velocity: Property<Velocity>;

  constructor(pos: Position, direction: Direction, color: PlayerColor) {
    super();
    this.ttl = 50 + Math.random() * 250;
    this.direction = direction;
    this.color = color;
    this.pos = new VariableProperty([...pos]);

    const dx = (Math.random() * 0.10 + 0.02) * this.direction;
    const dy = Math.random() * 0.06 - 0.04;
    this.velocity = new VariableProperty([dx, dy]);
  }

  init() {
    this.node.style.position = 'absolute';
    this.node.style.width = '1px';
    this.node.style.height = '1px';
    this.node.style.backgroundColor = this.color;

    const x = Math.round(this.pos.current[0]);
    const y = Math.round(this.pos.current[1]);
    this.node.style.transform = `translate(${x}px, ${y}px)`;
    this.node.style.display = 'block';
  }

  update(delta: number) {
    this.pos.current[0] += this.velocity.current[0] * delta;
    this.pos.current[1] += this.velocity.current[1] * delta;
    this.velocity.current[1] += 0.0003 * delta;

    const x = Math.round(this.pos.current[0]);
    const y = Math.round(this.pos.current[1]);
    this.node.style.transform = `translate(${Math.round(x)}px, ${Math.round(y)}px)`;

    const color = this.ttl < 100 ? '#00f' : this.color;
    this.node.style.backgroundColor = color;
  }

  destroy() {
    this.node.style.display = 'none';
  }

  static fromZap(zap: PlayerZapState, bounce = false) {
    const direction = zap.direction === 1 ? (bounce ? -1 : 1) : (bounce ? 1 : -1);
    const color = PLAYER_COLORS[zap.player];
    const x = zap.pos.current[0] - 4 * direction;
    const y = zap.pos.current[1] - 3 + Math.random() * 5;
    return new ZapParticle([x, y], direction, color);
  }
}
