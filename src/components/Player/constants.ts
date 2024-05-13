import { UsePlatformMovementOptions } from "../../hooks/usePlatformMovement";

export const MOVEMENT_PROPS: UsePlatformMovementOptions = {
  gravity: [0, 0.0006],
  speed: 0.06,
  jumpStrength: 0.21,
  maxFallSpeed: 0.1,
  canTurnMidair: true,
};
