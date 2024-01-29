import { useId } from "react";
import { useProperty, Velocity, useOffsetPosition, usePlatformMovement, CollisionBox, Node, BitmapImage, usePostCollisions, useKeyboardMap, useKeyPressed } from "@overreact/engine";
import { PLAYER1_IMAGE } from "../assets";
import { useGame, useIntegerPosition } from "../hooks";
import { BlockIndicator } from "./BlockIndicator";

export const Player: React.FC = () => {
  const game = useGame();
  const player = game.current.players[0];

  const collisionPos = useOffsetPosition(player.pos, [-8, -16]);
  const spritePos = useIntegerPosition(collisionPos);
  
  const flip = useProperty(player.flip);
  const velocity = useProperty<Velocity>([0, 0]);
  const collider = useId();

  // Map from keyboard input to virtual input events.
  useKeyboardMap({ left: 'KeyA', right: 'KeyD', jump: 'KeyW', fire: 'Space' });

  // Setup standard platform movement.
  const movement = usePlatformMovement(collider, player.pos, velocity, {
    gravity: [0, 0.0004],
    speed: 0.06,
    jumpStrength: 0.165,
  });

  // Update animations and flip direction.
  usePostCollisions(() => {
    flip.current = movement.direction.current === 'left';
  });

  // Fire an electric bolt when space is pressed.
  useKeyPressed('Space', () => {
    game.current.fireZap(player);
  });
  
  return (
    <Node>
      <BitmapImage pos={spritePos} size={[16, 16]} offset={[0, 0]} flip={flip} image={PLAYER1_IMAGE} />
      <CollisionBox pos={collisionPos} size={[16, 16]} id={collider} tags={['player']} />
      <BlockIndicator pos={player.block} />
    </Node>
  );
};
