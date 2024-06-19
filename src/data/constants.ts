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

export const ENEMY_POINTS: Record<EnemyType, number> = {
  bounceBot: 1000,
  flyingBot: 1000,
  guardBot: 1000,
  pathfinderBot: 1000,
  rollingBot: 1000,
  securityBot: 1000,
  teleportBot: 2000,
  greenOgre: 32000,
};

export const ENEMY_ITEMS: Record<EnemyType, number> = {
  bounceBot: 2,
  flyingBot: 2,
  guardBot: 2,
  pathfinderBot: 2,
  rollingBot: 2,
  securityBot: 2,
  teleportBot: 3,
  greenOgre: 16,
};