import { BitmapSprite, Position, Prop, Property, SpriteSet, StateMachine, useDynamicProperty, usePosition, useSync } from "@overreact/engine";
import { DIZZY1_SPRITE, DIZZY2_SPRITE, DIZZY3_SPRITE } from "./assets";
import { BaseEnemyState } from "../../state";

type DizzyProps<T> = {
  pos?: Prop<Position>;
  fsm: Property<StateMachine<T>>;
}

export function Dizzy<T extends BaseEnemyState>({ fsm, ...props }: DizzyProps<T>) {
  const pos = usePosition(props.pos);
  const stunned = useSync(() => fsm.current.state.current === 'stunned');

  const animation = useDynamicProperty(fsm.current.age, (age) => {
    if (!fsm.current.entity.angry.current) {
      return age > 8000 ? '3' : age > 5000 ? '2' : age > 500 ? '1' : '';
    } else {
      return age > 5000 ? '3' : age > 2000 ? '2' : age > 500 ? '1' : '';
    }
  });

  return stunned ? (
    <SpriteSet animation={animation}>
      <BitmapSprite name="1" pos={pos} size={[16, 16]} sprite={DIZZY1_SPRITE} />
      <BitmapSprite name="2" pos={pos} size={[16, 16]} sprite={DIZZY2_SPRITE} />
      <BitmapSprite name="3" pos={pos} size={[16, 16]} sprite={DIZZY3_SPRITE} />
    </SpriteSet>
  ) : null;
}
