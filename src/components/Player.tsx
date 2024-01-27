import { useId } from "react";
import { usePosition, useProperty, Velocity, useOffsetPosition, usePlatformMovement, CollisionBox, Node, BitmapImage, usePostCollisions, useSync, useKeyboardMap, useKeyPressed } from "@overreact/engine";
import { PLAYER1_IMAGE } from "../assets";
import { useGame, useIntegerPosition } from "../hooks";
import { Points } from "./Points";
import { Zap } from "./Zap";

export const Player: React.FC = () => {
  const game = useGame();
  const player = game.current.players[0];

  const pos = usePosition(player.pos);
  const flip = useProperty(player.flip);
  const points = useSync(() => game.current.points);
  const zaps = useSync(() => game.current.zaps);

  const velocity = useProperty<Velocity>([0, 0]);
  const collisionPos = useOffsetPosition(pos, [-8, -16]);
  const spritePos = useIntegerPosition(collisionPos);
  const collider = useId();

  // Map from keyboard input to virtual input events.
  useKeyboardMap({ left: 'KeyA', right: 'KeyD', jump: 'KeyW' });

  // Setup standard platform movement.
  const movement = usePlatformMovement(collider, pos, velocity, {
    gravity: [0, 0.0004],
    speed: 0.06,
    jumpStrength: 0.165,
  });

  // Update animations and flip direction.
  usePostCollisions(() => {
    flip.current = movement.direction.current === 'left';
  });

  useKeyPressed('Space', () => {
    game.current.fireZap(player);
  });
  
  return (
    <Node>
      <BitmapImage pos={spritePos} size={[16, 16]} offset={[0, 0]} flip={flip} image={PLAYER1_IMAGE} />
      <CollisionBox pos={collisionPos} size={[16, 16]} id={collider} tags={['player']} />
      {points.map((entry) => (
        <Points key={entry.id} points={entry} />
      ))}
      {zaps.map((zap) => (
        <Zap key={zap.id} zap={zap} />
      ))}
    </Node>
  );
};
