import { Property, Position, Velocity, VariableProperty, BaseParticle } from "@overreact/engine";
import { ItemState } from "../../state";
import { ITEMS } from "../../data";

export class ItemParticle extends BaseParticle {
  
  color: string;

  pos: Property<Position>;

  velocity: Property<Velocity>;

  constructor(pos: Position, color: string) {
    super();
    this.ttl = 300;
    this.color = color;
    this.pos = new VariableProperty([...pos]);

    const dx = Math.random() * 0.12 - 0.06;
    const dy = Math.random() * 0.12 - 0.06;
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

    const x = Math.round(this.pos.current[0]);
    const y = Math.round(this.pos.current[1]);
    this.node.style.transform = `translate(${Math.round(x)}px, ${Math.round(y)}px)`;

    const color = this.ttl < 50 ? '#00f' : this.color;
    this.node.style.backgroundColor = color;
  }

  destroy() {
    this.node.style.display = 'none';
  }

  static fromItem(item: ItemState) {
    const color = ITEMS[item.type].particles || '#fff';
    const x = item.pos.current[0];
    const y = item.pos.current[1] - 8;
    console.log(color);
    return new ItemParticle([x, y], color);
  }
}
