import { Property, Position, Velocity, VariableProperty } from "@overreact/engine";
import { PlayerZapState } from "../../../state";
import { BaseParticle } from "../../Particles/BaseParticle";

export class ZapParticle extends BaseParticle {
  direction: 1 | -1;
  pos: Property<Position>;
  velocity: Property<Velocity>;

  constructor(pos: Position, direction: 1 | -1) {
    super();
    this.ttl = 50 + Math.random() * 250;
    this.direction = direction;
    this.pos = new VariableProperty([...pos]);

    const dx = (Math.random() * 0.10 + 0.02) * this.direction;
    const dy = Math.random() * 0.06 - 0.04;
    this.velocity = new VariableProperty([dx, dy]);
  }

  init() {
    this.node.style.position = 'absolute';
    this.node.style.width = '1px';
    this.node.style.height = '1px';
    this.node.style.backgroundColor = '#0f0';

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
    this.node.style.transform = `translate(${x}px, ${y}px)`;

    const color = this.ttl < 100 ? '#0000ff' : '#00ff00';
    this.node.style.backgroundColor = color;
  }

  destroy() {
    this.node.style.display = 'none';
  }

  static fromZap(zap: PlayerZapState, bounce = false) {
    const direction = zap.direction === 1 ? (bounce ? -1 : 1) : (bounce ? 1 : -1);
    const x = zap.pos.current[0] - 4 * direction;
    const y = zap.pos.current[1] - 3 + Math.random() * 5;
    return new ZapParticle([x, y], direction);
  }
}
