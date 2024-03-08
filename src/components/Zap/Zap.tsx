import { useOffsetPosition, usePosition, useUpdate, useTaggedCollision, CollisionBox, Node, useProperty, SpriteSet, useDynamicProperty, BitmapSprite } from "@overreact/engine";
import { useId } from "react";
import { useGame } from "../../hooks";
import { ZapState } from "../../state";
import { ZAP_FLASH_SPRITE, ZAP_SPRITE } from "./assets";

const FLASH_AGE = 400;
const COLLISION_AGE = 500;
const DESTROY_AGE = 600;

type ZapProps = {
  zap: ZapState;
}

export const Zap: React.FC<ZapProps> = ({ zap }) => {
  const game = useGame();
  const collider = useId();
  const pos = useOffsetPosition(usePosition(zap.pos), [-4, -4]);
  const age = useProperty(0);
  const animation = useDynamicProperty(age, (age) => age >= FLASH_AGE ? 'flash' : 'solid');
  const active = useDynamicProperty(age, (age) => age <= COLLISION_AGE);

  useUpdate((delta) => {
    zap.pos.current[0] += delta / 8 * zap.direction;
    age.current += delta;

    if (age.current > DESTROY_AGE) {
      game.destroyZap(zap);
    }
  });

  useTaggedCollision(collider, 'solid', () => {
    game.destroyZap(zap);
  });

  useTaggedCollision(collider, 'enemy', () => {
    game.destroyZap(zap);
  });

  return (
    <Node pos={pos}>
      <SpriteSet animation={animation}>
        <BitmapSprite name="solid" size={[8, 8]} sprite={ZAP_SPRITE} />
        <BitmapSprite name="flash" size={[8, 8]} sprite={ZAP_FLASH_SPRITE} />
      </SpriteSet>
      <CollisionBox size={[8, 8]} id={collider} tags={['zap']} active={active}/>
    </Node>
  );
};