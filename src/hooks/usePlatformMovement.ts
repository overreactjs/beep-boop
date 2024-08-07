import { useMemo } from "react";
import { Position, Prop, Property, UseEventTarget, Velocity, lerp, useEventListeners, useOverlap, useProperty, useUpdate, useVirtualInput } from "@overreact/engine";

const DEFAULT_OPTIONS = {
  enabled: true,
  gravity: [0, 0.002],
  speed: 0.5,
  jumpStrength: 0.7,
  acceleration: 0.2,
  maxFallSpeed: 0.2,
  maxJumpCount: 1,
  canTurnMidair: false,
  canFallThrough: true,
  activeTags: ['top', 'left', 'right'] as string[],
} as const;

export type PlatformMovementEventType = 'jump';

export type UsePlatformMovementOptions = {
  enabled?: Prop<boolean>;
  gravity?: Velocity;
  speed?: Prop<number>;
  jumpStrength?: number;
  acceleration?: number;
  maxFallSpeed?: Prop<number>;
  maxJumpCount?: number;
  canTurnMidair?: boolean;
  canFallThrough?: boolean;
  activeTags?: string[];
};

export type UsePlatformMovementEvents = UseEventTarget<PlatformMovementEventType, void>;

export type UsePlatformMovementResult = UsePlatformMovementEvents & {
  enabled: Property<boolean>;
  isOnFloor: Property<boolean>;
  isJumping: Property<boolean>;
  isFalling: Property<boolean>;
  wallToLeft: Property<boolean>;
  wallToRight: Property<boolean>;
  jumpCount: Property<number>;
  facing: Property<'left' | 'right' | null>;
};

export const usePlatformMovement = (collider: string, pos: Property<Position>, velocity: Property<Velocity>, options?: UsePlatformMovementOptions): UsePlatformMovementResult => {
  const allOptions = { ...DEFAULT_OPTIONS, ...options };
  const { gravity, jumpStrength, acceleration, maxJumpCount, canTurnMidair, canFallThrough, activeTags } = allOptions;
  const { addEventListener, removeEventListener, fireEvent } = useEventListeners<PlatformMovementEventType>();
  const input = useVirtualInput();

  const enabled = useProperty(allOptions.enabled);
  const speed = useProperty(allOptions.speed);
  const maxFallSpeed = useProperty(allOptions.maxFallSpeed);

  const change = useProperty([0, 0]);
  const isOnFloor = useProperty(false);
  const isJumping = useProperty(false);
  const isFalling = useProperty(false);
  const wallToLeft = useProperty(false);
  const wallToRight = useProperty(false);
  const jumpCount = useProperty(0);
  const facing = useProperty<'left' | 'right' | null>(null);
  const fallingThrough = useProperty(false);

  const gravitySign = Math.sign(gravity[1]);

  /**
   * Update the players velocity, position, and state flags, based on current inputs.
   */
  useUpdate((delta) => {
    if (fallingThrough.current) {
      fallingThrough.current = false;
    }

    if (enabled.current) {
      // Apply keyboard input to the player's velocity.
      const horizontalInput = input.hasAxis('left', 'right');
      const accelerationFactor = isOnFloor.current ? 1.0 : 0.2;
      velocity.current[0] = lerp(velocity.current[0], horizontalInput * speed.current, acceleration * accelerationFactor);

      // Jump, if one of the following conditions are met:
      // 1. The entity is stood on the ground.
      // 2. The entity is falling, and has not yet jumped the maximum number of times.
      if (input.isActive('jump') && (isOnFloor.current || (isFalling.current && jumpCount.current > 0 && jumpCount.current < maxJumpCount))) {
        velocity.current[1] = jumpStrength * -gravitySign;
        isOnFloor.current = false;
        isJumping.current = true;
        isFalling.current = false;
        jumpCount.current++;
        fireEvent('jump', undefined);
      }

      // Fall through a platform, if allowed.
      if (canFallThrough && input.isActive('fall') && isOnFloor.current) {
        isOnFloor.current = false;
        isFalling.current = false;
        fallingThrough.current = true;
        pos.current[1] += 1;
      }

      // Update state flags.
      if (velocity.current[1] * gravitySign > 0) {
        isOnFloor.current = false;
        isJumping.current = false;
        isFalling.current = true;
      }

      // Add gravity to the player's velocity.
      velocity.current[0] = velocity.current[0] + (gravity[0] || 0) * delta;
      velocity.current[1] = velocity.current[1] + (gravity[1] || 0) * delta;

      // Clamp the velocity to the maximum fall speed
      velocity.current[1] = Math.min(maxFallSpeed.current, velocity.current[1] * gravitySign) * gravitySign;

      // Apply the velocity to the player.
      change.current[0] = velocity.current[0] * delta;
      change.current[1] = velocity.current[1] * delta;
      pos.current[0] += change.current[0];
      pos.current[1] += change.current[1];

      // Update the direction the player is facing.
      if (canTurnMidair || isOnFloor.current) {
        if (horizontalInput < 0) {
          facing.current = 'left';
        } else if (horizontalInput > 0) {
          facing.current = 'right';
        } else {
          facing.current = null;
        }
      } else {
        facing.current = null;
      }
    }
  });

  /**
   * Handle collisions, ensuring that the entity cannot pass through solid objects.
   */
  useOverlap(collider, (collisions) => {
    if (enabled.current) {
      const [dx, dy] = change.current;
      const adjustment: Position = [0, 0];

      const solids = collisions.filter((event) => event.tags.includes('solid'));
      const platforms = collisions.filter((event) => event.tags.includes('platform'));

      wallToLeft.current = false;
      wallToRight.current = false;

      // Solids: These can't be passed through. Ever!
      for (const { overlap } of solids) {
        if (overlap.y > 0 && overlap.y > adjustment[1]) {
          pos.current[1] -= overlap.y;
          adjustment[1] = overlap.y;
        }

        if (overlap.y < 0 && overlap.y < adjustment[1]) {
          pos.current[1] -= overlap.y;
          adjustment[1] = overlap.y;
        }

        if (overlap.x > 0 && overlap.x > adjustment[0]) {
          pos.current[0] -= overlap.x;
          adjustment[0] = overlap.x;
        }

        if (overlap.x < 0 && overlap.x < adjustment[0]) {
          pos.current[0] -= overlap.x;
          adjustment[0] = overlap.x;
        }
      }

      // Platforms: These can be passed through from below or the sides, but not from above.
      if (!fallingThrough.current) {
        for (const { overlap, tags } of platforms) {

          // top (platforms, when falling)
          if (tags.includes('top')
            && activeTags.includes('top')
            && overlap.y > 0
            && dy > 0
            && dy - overlap.y >= -1
            && adjustment[1] < overlap.y
          ) {
            pos.current[1] -= overlap.y;
            adjustment[1] = overlap.y;
          }

          // bottom (platforms, when falling with negative gravity)
          if (tags.includes('bottom')
            && activeTags.includes('bottom')
            && overlap.y < 0
            && dy < 0
            && dy - overlap.y <= 1
            && adjustment[1] > overlap.y
          ) {
            pos.current[1] -= overlap.y;
            adjustment[1] = overlap.y;
          }

          // left (when moving right)
          if (tags.includes('left')
            && activeTags.includes('left')
            && overlap.x > 0
            && dx > 0
            && dx - overlap.x >= -1
            && adjustment[0] < overlap.x
          ) {
            pos.current[0] -= overlap.x;
            adjustment[0] = overlap.x;
          }

          // right (when moving left)
          if (tags.includes('right')
            && activeTags.includes('right')
            && overlap.x < 0
            && dx < 0
            && dx - overlap.x <= 1
            && adjustment[0] > overlap.x
          ) {
            pos.current[0] -= overlap.x;
            adjustment[0] = overlap.x;
          }
        }
      }

      // Reset velocity if some overlap occurred.
      if (adjustment[1] > 0 || adjustment[1] < 0) {
        velocity.current[1] = 0;
      }

      // Update state flags.
      wallToLeft.current = adjustment[0] > 0;
      wallToRight.current = adjustment[0] < 0;
      if ((adjustment[1] * gravitySign) > 0 && (dy * gravitySign) > 0) {
        isOnFloor.current = true;
        isFalling.current = false;
        jumpCount.current = 0;
      }
    }
  });

  return useMemo(() =>
    ({ enabled, isOnFloor, isJumping, isFalling, jumpCount, facing, wallToLeft, wallToRight, addEventListener, removeEventListener }),
    [enabled, isOnFloor, isJumping, isFalling, jumpCount, facing, wallToLeft, wallToRight, addEventListener, removeEventListener],
  );
};
