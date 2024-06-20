import { Property, Position, Velocity, VariableProperty } from "@overreact/engine";
import { PlayerZapState } from "../../../state";
import { BaseParticle } from "../../Particles/BaseParticle";

export class ZapParticle extends BaseParticle {
  direction: 1 | -1;
  pos: Property<Position>;
  velocity: Property<Velocity>;

  constructor(pos: Position, direction: 1 | -1) {
    super();
    this.ttl = 200 + Math.random() * 200;
    this.direction = direction;
    this.pos = new VariableProperty([...pos]);

    const dx = (Math.random() * 0.05 + 0.01) * this.direction;
    const dy = Math.random() * 0.12 - 0.09;
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
    this.velocity.current[1] += 0.0005 * delta;

    const x = Math.round(this.pos.current[0]);
    const y = Math.round(this.pos.current[1]);
    this.node.style.transform = `translate(${x}px, ${y}px)`;

    const color = this.ttl < 100 ? '#0000ff' : '#00ff00';
    this.node.style.backgroundColor = color;
  }

  destroy() {
    this.node.style.display = 'none';
  }

  static fromZap(zap: PlayerZapState) {
    const direction = zap.direction === 1 ? -1 : 1;
    const x = zap.pos.current[0] - 4 * direction;
    const y = zap.pos.current[1] - 4 + Math.random() * 8
    return new ZapParticle([x, y], direction);
  }
}
