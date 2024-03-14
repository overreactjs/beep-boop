import { useId } from "react";
import { CollisionBox, Node, useKeyboardMap, BitmapSprite, SpriteSet, Size, useMergeProperty, useTaggedCollision, useUpdate } from "@overreact/engine";
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

  const animation = useMergeProperty(player.animation, player.alive, (animation, alive) => alive ? animation : 'dead');
  const collider = useId();

  // When the player leaves the screen, wrap to the other side.
  useWrapAround(player);

  // Map from keyboard input to virtual input events, but only when the player is still alive.
  const active = useMergeProperty(player.alive, game.initialized, (a, b) => a && b);
  useKeyboardMap({ left: 'KeyA', right: 'KeyD', jump: 'KeyW', fire: 'Space' }, active);

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

  // Update the player state.
  useUpdate((delta) => {
    player.update(delta);
  });
  
  // Common props for all sprites in the sprite set.
  const spriteProps = { size: [16, 16] as Size, flip };

  return (
    <Node pos={pos}>
      <Node offset={[-8, -16]} rounded>
        <SpriteSet animation={animation}>
          <BitmapSprite {...spriteProps} name="idle" sprite={IDLE} />
          <BitmapSprite {...spriteProps} name="run" sprite={RUN} />
          <BitmapSprite {...spriteProps} name="dead" sprite={DEAD} repeat={false} />
        </SpriteSet>
      </Node>
      <Node offset={[-6, -10]}>
        <CollisionBox size={[12, 10]} id={collider} tags={['player']} entity={player} />
      </Node>
    </Node>
  );
};
