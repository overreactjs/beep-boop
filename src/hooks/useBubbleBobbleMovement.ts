import { useMemo } from "react";
import { Position, Property, Velocity, lerp, useEventListeners, useOverlap, useProperty, useUpdate, useVirtualInput } from "@overreact/engine";

const THRESHOLD = 0.0001;

const DEFAULT_OPTIONS = {
  gravity: [0, 0.002],
  speed: 0.5,
  jumpStrength: 0.7,
  acceleration: 0.2,
  maxFallSpeed: 0.2,
  maxJumpCount: 1,
  canTurnMidair: false,
} as const;

export type BubbleBobbleMovementEventType = 'jump';

export type UseBubbleBobbleMovementOptions = {
  gravity?: Velocity;
  speed?: number;
  jumpStrength?: number;
  acceleration?: number;
  maxFallSpeed?: number;
  maxJumpCount?: number;
  canTurnMidair?: boolean;
};

export type UseBubbleBobbleMovementResult = {
  isOnFloor: Property<boolean>;
  isJumping: Property<boolean>;
  isFalling: Property<boolean>;
  wallToLeft: Property<boolean>;
  wallToRight: Property<boolean>;
  jumpCount: Property<number>;
  facing: Property<'left' | 'right'>;
  addEventListener: (type: BubbleBobbleMovementEventType, fn: () => void) => void;
  removeEventListener: (type: BubbleBobbleMovementEventType, fn: () => void) => void;
};

export const useBubbleBobbleMovement = (collider: string, pos: Property<Position>, velocity: Property<Velocity>, options?: UseBubbleBobbleMovementOptions): UseBubbleBobbleMovementResult => {
  const { gravity, speed, jumpStrength, acceleration, maxFallSpeed, maxJumpCount, canTurnMidair } = { ...DEFAULT_OPTIONS, ...options };
  const { isActive, hasAxis } = useVirtualInput();
  const { addEventListener, removeEventListener, fireEvent } = useEventListeners<BubbleBobbleMovementEventType>();

  const change = useProperty([0, 0]);
  const isOnFloor = useProperty(false);
  const isJumping = useProperty(false);
  const isFalling = useProperty(false);
  const wallToLeft = useProperty(false);
  const wallToRight = useProperty(false);
  const jumpCount = useProperty(0);
  const facing = useProperty<'left' | 'right'>('right');

  /**
   * Update the players velocity, position, and state flags, based on current inputs.
   */
  useUpdate((delta) => {
    // Apply keyboard input to the player's velocity.
    const horizontalInput = hasAxis('left', 'right');
    const accelerationFactor = isOnFloor.current ? 1.0 : 0.2;
    velocity.current[0] = lerp(velocity.current[0], horizontalInput * speed, acceleration * accelerationFactor);

    // Jump, if one of the following conditions are met:
    // 1. The entity is stood on the ground.
    // 2. The entity is falling, and has not yet jumped the maximum number of times.
    if (isActive('jump') && (isOnFloor.current || (isFalling.current && jumpCount.current > 0 && jumpCount.current < maxJumpCount))) {
      velocity.current[1] = -jumpStrength;
      isOnFloor.current = false;
      isJumping.current = true;
      isFalling.current = false;
      jumpCount.current++;
      fireEvent('jump', undefined);
    }

    // Update state flags.
    if (velocity.current[1] > 0) {
      isOnFloor.current = false;
      isJumping.current = false;
      isFalling.current = true;
    }

    // Add gravity to the player's velocity.
    velocity.current[0] = velocity.current[0] + (gravity[0] || 0) * delta;
    velocity.current[1] = Math.min(maxFallSpeed, velocity.current[1] + (gravity[1] || 0) * delta);

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
      }
    }
  });

  /**
   * Handle collisions, ensuring that the entity cannot pass through solid objects.
   */
  useOverlap(collider, (collisions) => {
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
    for (const { overlap, tags } of platforms) {
      if (tags.includes('top') && overlap.y > 0 && dy - overlap.y >= -THRESHOLD && adjustment[1] < overlap.y) {
        pos.current[1] -= overlap.y;
        adjustment[1] = overlap.y;
      }

      if (tags.includes('left') && overlap.x > 0 && dx - overlap.x >= -THRESHOLD && adjustment[0] < overlap.x) {
        pos.current[0] -= overlap.x;
        adjustment[0] = overlap.x;
      }

      if (tags.includes('right') && overlap.x < 0 && dx - overlap.x <= THRESHOLD && adjustment[0] > overlap.x) {
        pos.current[0] -= overlap.x;
        adjustment[0] = overlap.x;
      }
    }

    // Reset velocity if some overlap occurred.
    // if (adjustment[0] > 0 || adjustment[0] < 0) {
    //   velocity.current[0] = 0;
    // }
    if (adjustment[1] > 0 || adjustment[1] < 0) {
      velocity.current[1] = 0;
    }

    // Update state flags.
    wallToLeft.current = adjustment[0] > 0;
    wallToRight.current = adjustment[0] < 0;
    if (adjustment[1] > 0) {
      isOnFloor.current = true;
      isFalling.current = false;
      jumpCount.current = 0;
    }
  });

  return useMemo(() =>
    ({ isOnFloor, isJumping, isFalling, jumpCount, facing, wallToLeft, wallToRight, addEventListener, removeEventListener }),
    [isOnFloor, isJumping, isFalling, jumpCount, facing, wallToLeft, wallToRight, addEventListener, removeEventListener],
  );
};
