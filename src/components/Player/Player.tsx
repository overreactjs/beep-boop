import { useId } from "react";
import { useOffsetPosition, CollisionBox, Node, useKeyboardMap, BitmapSprite, SpriteSet, useIntegerPosition, Size, useMergeProperty, useTaggedCollision } from "@overreact/engine";
import { usePlatformMovement, useGame, useWrapAround } from "../../hooks";
import { ItemState } from "../../state";
import { DEAD, IDLE, RUN } from "./assets";
import { MOVEMENT_PROPS } from "./constants";
import { usePlayerEnemyCollisions } from "./usePlayerEnemyCollisions";
import { usePlayerFireZaps } from "./usePlayerFireZaps";
import { usePlayerUpdateState } from "./usePlayerUpdateState";

export const Player: React.FC = () => {
  const game = useGame();
  
  const player = game.players[0];
  const { flip, pos, velocity } = player;

  const collisionPos = useOffsetPosition(pos, [-6, -16]);
  const spritePos = useIntegerPosition(useOffsetPosition(pos, [-8, -16]));
  const animation = useMergeProperty(player.animation, player.alive, (animation, alive) => alive ? animation : 'dead');
  const collider = useId();

  // When the player leaves the screen, wrap to the other side.
  useWrapAround(player);

  // Map from keyboard input to virtual input events, but only when the player is still alive.
  useKeyboardMap({ left: 'KeyA', right: 'KeyD', jump: 'KeyW', fire: 'Space' }, player.alive);

  // Setup standard platform movement.
  const movement = usePlatformMovement(collider, pos, velocity, MOVEMENT_PROPS);

  // Handle collisions between the player and enemies, either alive or stunned.
  usePlayerEnemyCollisions(collider, player);

  // Update animations, flip direction, and combo state.
  usePlayerUpdateState(player, movement);

  // Fire an electric bolt when space is pressed.
  usePlayerFireZaps(player);

  // Teleport the player when they step into a portal.
  useTaggedCollision(collider, 'portal', () =>{
    game.teleport(player);
  });

  // Collect items.
  useTaggedCollision<ItemState>(collider, 'item', (collisions) => {
    collisions.forEach(({ b }) => {
      if (b.entity) {
        game.collectItem(b.entity);
      }
    });
  });
  
  // Common props for all sprites in the sprite set.
  const spriteProps = { size: [16, 16] as Size, flip };

  return (
    <Node pos={spritePos}>
      <SpriteSet animation={animation}>
        <BitmapSprite {...spriteProps} name="idle" sprite={IDLE} />
        <BitmapSprite {...spriteProps} name="run" sprite={RUN} />
        <BitmapSprite {...spriteProps} name="dead" sprite={DEAD} repeat={false} />
      </SpriteSet>
      <CollisionBox pos={collisionPos} size={[12, 16]} id={collider} tags={['player']} entity={player} />
    </Node>
  );
};
