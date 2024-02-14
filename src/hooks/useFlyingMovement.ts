import { useMemo } from "react";
import { BBox } from "detect-collisions";
import { CollisionEventFunctionProps, Position, Prop, Property, Velocity, intersects, permutator, useOverlap, useProperty, useUpdate } from "@overreact/engine";

const DEFAULT_OPTIONS = {
  enabled: true,
} as const;

export type UseFlyingMovementOptions = {
  enabled?: Prop<boolean>;
};

export type UseFlyingMovementResult = {
  enabled: Property<boolean>;
  wallToLeft: Property<boolean>;
  wallToRight: Property<boolean>;
};

export const useFlyingMovement = (collider: string, pos: Property<Position>, velocity: Property<Velocity>, options?: UseFlyingMovementOptions): UseFlyingMovementResult => {
  const allOptions = { ...DEFAULT_OPTIONS, ...options };

  const enabled = useProperty(allOptions.enabled);
  const wallToLeft = useProperty(false);
  const wallToRight = useProperty(false);

  /**
   * 
   */
  useUpdate((delta) => {
    if (enabled.current) {
      pos.current[0] += velocity.current[0] * delta;
      pos.current[1] += velocity.current[1] * delta;
    }
  });

  /**
   * 
   */
  useOverlap(collider, (collisions) => {
    if (enabled.current) {
      const adjustment: Position = [0, 0];
      const surfaces = optimize(collisions.filter((event) => {
        return event.tags.includes('solid') || event.tags.includes('platform');
      }));

      // Solids: These can't be passed through. Ever!
      for (const { overlap } of surfaces) {
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

      // Update state flags.
      wallToLeft.current = adjustment[0] > 0;
      wallToRight.current = adjustment[0] < 0;

      // Flip the velocity (bounce) when colliding with any surface.
      if (adjustment[0] > 0 || adjustment[0] < 0) {
        velocity.current[0] = -velocity.current[0];
      }
      if (adjustment[1] > 0 || adjustment[1] < 0) {
        velocity.current[1] = -velocity.current[1];
      }
    }
  });

  return useMemo(() =>
    ({ enabled, wallToLeft, wallToRight }),
    [enabled, wallToLeft, wallToRight],
  );
};

/**
 * This function takes an array of collision events, and returns an optimal array of collision
 * events. It is considered optimal when the number of required adjustments to the player's
 * position is as small as possible.
 * 
 * To achieve this, we iterate through all of the permutations of the event list, and for each
 * permutation we apply the overlaps in order, checking to see if the previously applied offsets
 * have rendered the current one unnecessary.
 */
const optimize = (collisions: CollisionEventFunctionProps[]): CollisionEventFunctionProps[] => {
  const permutations = permutator(collisions);

  let result: CollisionEventFunctionProps[] = [];
  let best = Number.MAX_VALUE;

  for (const permutation of permutations) {
    const delta: Position = [0, 0];

    for (const event of permutation) {
      if (intersects(add(event.a.bbox, delta), event.b.bbox)) {
        delta[0] -= event.overlap.x;
        delta[1] -= event.overlap.y;
      }
    }

    const score = Math.abs(delta[0]) + Math.abs(delta[1]);

    if (score < best) {
      best = score;
      result = permutation;
    }
  }

  const delta: Position = [0, 0];

  for (const event of result) {
    if (intersects(add(event.a.bbox, delta), event.b.bbox)) {
      delta[0] -= event.overlap.x;
      delta[1] -= event.overlap.y;
    } else {
      event.overlap.x = 0;
      event.overlap.y = 0;
    }
  }

  return collisions;
};

/**
 * Add a delta offset to a bounding box.
 */
const add = (box: BBox, delta: Position): BBox => {
  return {
    minX: box.minX + delta[0],
    maxX: box.maxX + delta[0],
    minY: box.minY + delta[1],
    maxY: box.maxY + delta[1],
  };
};
