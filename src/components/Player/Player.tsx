import { useId } from "react";
import { CollisionBox, Node, useKeyboardMap, BitmapSprite, SpriteSet, Size, useMergeProperty, useUpdate, useGamepadMap, useFlash } from "@overreact/engine";

import { usePlatformMovement, useGame, useWrapAround } from "../../hooks";
import { PlayerIndex } from "../../types";

import { DEAD_P1, FALL_P1, IDLE_P1, JUMP_P1, RUN_P1, DEAD_P2, FALL_P2, IDLE_P2, JUMP_P2, RUN_P2, INACTIVE_P2, INACTIVE_P1 } from "./assets";
import { GAMEPAD_MAP, KEYBOARD_MAPS, MOVEMENT_PROPS } from "./constants";
import { usePlayerEnemyCollisions } from "./usePlayerEnemyCollisions";
import { usePlayerFireZaps } from "./usePlayerFireZaps";
import { usePlayerUpdateState } from "./usePlayerUpdateState";
import { usePlayerActivateOnFire } from "./usePlayerActivateOnFire";
import { usePlayerTeleport } from "./usePlayerTeleport";
import { usePlayerCollectItems } from "./usePlayerCollectItems";

type PlayerProps = {
  index: PlayerIndex;
}

export const Player: React.FC<PlayerProps> = ({ index }) => {
  const game = useGame();
  
  const player = game.players[index];
  const { flip, pos, velocity } = player;
  const collider = useId();

  // Flash the player's visibility when they are invulnerable.
  const visible = useMergeProperty(player.invulnerable, useFlash(100), (invulnerable, flash) => invulnerable <= 0 || flash);

  // Override the player's animation when they are not alive.
  const override = useMergeProperty(player.active, player.alive, (active, alive) => !active ? 'inactive' : !alive ? 'dead' : null);
  const animation = useMergeProperty(player.animation, override, (animation, override) => override ? override : animation);

  // When the player leaves the screen, wrap to the other side.
  useWrapAround(player, { direction: 'downwards' });

  // Map from real inputs to virtual input events, but only when the player is still alive.
  const active = useMergeProperty(player.alive, game.initialized, (a, b) => a && b);
  useKeyboardMap(KEYBOARD_MAPS[index], active);
  useGamepadMap(index, GAMEPAD_MAP, active);

  // Setup standard platform movement.
  const movement = usePlatformMovement(collider, pos, velocity, { ...MOVEMENT_PROPS, enabled: player.active });

  // Handle collisions between the player and enemies, either alive or stunned.
  usePlayerEnemyCollisions(collider, player);

  // Update animations, flip direction, and combo state.
  usePlayerUpdateState(player, movement);

  // Fire an electric bolt when space is pressed.
  usePlayerFireZaps(player);

  // Teleport the player when they step into a portal.
  usePlayerTeleport(collider, player);

  // Collect items.
  usePlayerCollectItems(collider, player);

  // Activate the player if they are inactive and the fire button is pressed.
  usePlayerActivateOnFire(player);

  // Update the player state.
  useUpdate((delta) => {
    player.update(delta);
  });
  
  // Common props for all sprites in the sprite set.
  const spriteProps = { size: [16, 16] as Size, flip, visible };

  return (
    <Node pos={pos}>
      <Node offset={[-8, -16]} rounded>
        <SpriteSet animation={animation}>
          <BitmapSprite {...spriteProps} name="idle" sprite={index === 0 ? IDLE_P1 : IDLE_P2} />
          <BitmapSprite {...spriteProps} name="jump" sprite={index === 0 ? JUMP_P1 : JUMP_P2} />
          <BitmapSprite {...spriteProps} name="fall" sprite={index === 0 ? FALL_P1 : FALL_P2} />
          <BitmapSprite {...spriteProps} name="run"  sprite={index === 0 ? RUN_P1  : RUN_P2} />
          <BitmapSprite {...spriteProps} name="dead" sprite={index === 0 ? DEAD_P1 : DEAD_P2} repeat={false} />
          <Node offset={index === 0 ? [-24, -8] : [0, -8]}>
            <BitmapSprite size={[40, 24]} name="inactive" sprite={index === 0 ? INACTIVE_P1 : INACTIVE_P2} />
          </Node>
        </SpriteSet>
      </Node>
      <Node offset={[-6, -10]}>
        <CollisionBox size={[12, 10]} id={collider} tags={['player']} entity={player} />
      </Node>
    </Node>
  );
};
