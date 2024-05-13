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
  flags: Property<CollisionFlags>;
};

export const useFlyingMovement = (collider: string, pos: Property<Position>, velocity: Property<Velocity>, options?: UseFlyingMovementOptions): UseFlyingMovementResult => {
  const allOptions = { ...DEFAULT_OPTIONS, ...options };

  const enabled = useProperty(allOptions.enabled);
  const flags = useProperty(new CollisionFlags());

  /**
   * 
   */
  useUpdate((delta) => {
    if (enabled.current) {
      pos.current[0] += velocity.current[0] * delta;
      pos.current[1] += velocity.current[1] * delta;

      flags.current.reset();
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
      flags.current.update(adjustment);
    }
  });

  return useMemo(() => ({ enabled, flags }), [enabled, flags]);
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

class CollisionFlags {
  flags: number = 0;

  reset() {
    this.flags = 0;
  }

  update(adjustment: Position) {
    this.flags = +(adjustment[1] < 0)
      | (+(adjustment[0] > 0) << 1)
      | (+(adjustment[1] > 0) << 2)
      | (+(adjustment[0] < 0) << 3);
  }

  get top(): boolean {
    return (this.flags & 0b0001) > 0;
  }

  get right(): boolean {
    return (this.flags & 0b0010) > 0;
  }

  get bottom(): boolean {
    return (this.flags & 0b0100) > 0;
  }

  get left(): boolean {
    return (this.flags & 0b1000) > 0;
  }

  get horizontal(): boolean {
    return (this.flags & 0b1010) > 0;
  }

  get vertical(): boolean {
    return (this.flags & 0b0101) > 0;
  }

  get any(): boolean {
    return this.flags > 0;
  }
}