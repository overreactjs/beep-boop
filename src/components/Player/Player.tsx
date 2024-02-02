import { useId } from "react";
import { useOffsetPosition, usePlatformMovement, CollisionBox, Node, usePostCollisions, useKeyboardMap, useKeyPressed, BitmapSprite, SpriteSet, useTaggedCollision, useIntegerPosition } from "@overreact/engine";
import { useGame, useWrapAround } from "../../hooks";
import { IDLE, RUN } from "./assets";

export const Player: React.FC = () => {
  const game = useGame();
  
  const player = game.current.players[0];
  const { animation, combo, flip, pos, velocity } = player;

  const collisionPos = useOffsetPosition(pos, [-6, -16]);
  const spritePos = useIntegerPosition(useOffsetPosition(pos, [-8, -16]));
  const collider = useId();

  // When the player leaves the screen, wrap to the other side.
  useWrapAround(player);

  // Map from keyboard input to virtual input events.
  useKeyboardMap({ left: 'KeyA', right: 'KeyD', jump: 'KeyW', fire: 'Space' });

  // Setup standard platform movement.
  const movement = usePlatformMovement(collider, pos, velocity, {
    gravity: [0, 0.0006],
    speed: 0.06,
    jumpStrength: 0.21,
    canTurnMidair: true,
  });

  // When the player touches a stunned enemy, do a little jump.
  useTaggedCollision(collider, 'stunned', () => {
    velocity.current[1] = Math.min(-0.125, velocity.current[1]);
    combo.current++;
  });

  // Update animations, flip direction, and combo state.
  usePostCollisions(() => {
    flip.current = movement.direction.current === 'left';
    animation.current = Math.round(velocity.current[0] * 100) / 100 !== 0 ? 'run' : 'idle';

    if (movement.isOnFloor && velocity.current[1] === 0) {
      combo.current = -1;
    }
  });

  // Fire an electric bolt when space is pressed.
  useKeyPressed('Space', () => {
    game.current.fireZap(player);
  });
  
  return (
    <Node>
      <SpriteSet animation={animation}>
        <BitmapSprite name="idle" pos={spritePos} size={[16, 16]} sprite={IDLE} flip={flip} />
        <BitmapSprite name="run" pos={spritePos} size={[16, 16]} sprite={RUN} flip={flip} />
      </SpriteSet>
      <CollisionBox pos={collisionPos} size={[12, 16]} id={collider} tags={['player']} />
    </Node>
  );
};
