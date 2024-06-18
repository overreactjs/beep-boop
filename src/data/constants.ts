import { EnemyType } from "../types";

export const SOLID  = '0';
export const EMPTY  = ' ';
export const LEFT   = '<';
export const RIGHT  = '>';
export const PORTAL = '+';

export const ENEMIES: Record<string, EnemyType> = {
  // Regular enemies
  'A': 'securityBot',
  'B': 'guardBot',
  'C': 'bounceBot',
  'D': 'flyingBot',
  'E': 'rollingBot',
  'F': 'pathfinderBot',
  'G': 'teleportBot',
  // Bosses
  'Z': 'greenOgre',
};
