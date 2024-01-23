import { useCallback, useEffect, useId } from "react";
import { usePosition, useProperty, Velocity, useOffsetPosition, usePlatformMovement, CollisionBox, Node, BitmapImage, usePostCollisions } from "@overreact/engine";
import { useGame, useIntegerPosition } from "../hooks";
import { PLAYER1 } from "../assets";

export const Player: React.FC = () => {
  const game = useGame();
  const pos = usePosition(game.current.players[0].pos);
  const flip = useProperty(game.current.players[0].flip);

  const velocity = useProperty<Velocity>([0, 0]);
  const collisionPos = useOffsetPosition(pos, [-8, -16]);
  const spritePos = useIntegerPosition(collisionPos);
  const collider = useId();

  // Setup standard platform movement.
  const movement = usePlatformMovement(collider, pos, velocity, {
    gravity: [0, 0.0004],
    speed: 0.08,
    jumpStrength: 0.165,
  });

  // For testing: Add points each time the player jumps.
  const onJump = useCallback(() => {
    game.current.players[0].addPoints(100);
  }, [game]);

  // Listen for jump events.
  useEffect(() => {
    movement.addEventListener('jump', onJump);
    return () => movement.removeEventListener('jump', onJump);
  }, [movement, onJump])

  // Update animations and flip direction.
  usePostCollisions(() => {
    flip.current = movement.direction.current === 'left';
  });
  
  return (
    <Node pos={pos}>
      <BitmapImage pos={spritePos} size={[16, 16]} offset={[0, 0]} flip={flip} image={PLAYER1} />
      <CollisionBox pos={collisionPos} size={[16, 16]} id={collider} tags={['player']} />
    </Node>
  );
};