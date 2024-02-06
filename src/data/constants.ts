import { EnemyType } from "../types";

export const SOLID = '0';
export const EMPTY = ' ';
export const LEFT  = '<';
export const RIGHT = '>';

export const ENEMIES: Record<string, EnemyType> = {
  'A': 'securityBot',
  'C': 'bounceBot',
};
