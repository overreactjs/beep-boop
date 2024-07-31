import { ItemHandler, ItemType } from "../types";

export const itemHandlers: Partial<Record<ItemType, ItemHandler>> = {

  // When a gold chest is collected, all items are gold coins.
  'chest_gold': (game, player, item) => {
    game.powerup('goldChest', ['level']);
    game.awardItemPoints(player, item);
  },

  // When a silver chest is collected, all items are silver coins.
  'chest_silver': (game, player, item) => {
    game.powerup('silverChest', ['level']);
    game.awardItemPoints(player, item);
  },

  // Activate the 'R' in "ROBOT".
  'circuit_1r': (game, player, item) => {
    game.circuits.current |= 1;
    game.awardItemPoints(player, item);
  },

  // Activate the first 'O' in "ROBOT".
  'circuit_2o': (game, player, item) => {
    game.circuits.current |= 2;
    game.awardItemPoints(player, item);
  },

  // Activate the 'B' in "ROBOT".
  'circuit_3b': (game, player, item) => {
    game.circuits.current |= 4;
    game.awardItemPoints(player, item);
  },

  // Activate the second 'O' in "ROBOT".
  'circuit_4o': (game, player, item) => {
    game.circuits.current |= 8;
    game.awardItemPoints(player, item);
  },

  // Activate the 'T' in "ROBOT".
  'circuit_5t': (game, player, item) => {
    game.circuits.current |= 16;
    game.awardItemPoints(player, item);
  },

  // Kill all enemies, and give diamonds.
  'dynamite': (game, player, item) => {
    game.signalEnemies('kill');
    game.powerup('dynamite', ['timer'], 0.5);
    game.powerup('diamonds', ['level']);
    game.awardItemPoints(player, item);
  },

  // Give player fireball power up.
  'hot_sauce': (game, player, item) => {
    player.powerup('fireballs', ['death', 'level'], 20);
    game.awardItemPoints(player, item);
  },

  // Speed up the player's movement.
  'joystick': (game, player, item) => {
    player.powerup('speed', ['death']);
    game.awardItemPoints(player, item);
  },

  // Blue potions increase the travel distance of zaps.
  'potion_blue': (game, player, item) => {
    player.powerup('zapDistance', ['death']);
    game.awardItemPoints(player, item);
  },

  // Magenta potions increase the rate that zaps can be fired at.
  'potion_magenta': (game, player, item) => {
    player.powerup('zapSpeed', ['death']);
    game.awardItemPoints(player, item);
  },

  // Fire cyan stars in all directions.
  'star_cyan': (game, player, item) => {
    game.fireStars(player, item, 'cyan');
  },

  // Fire green stars in all directions.
  'star_green': (game, player, item) => {
    game.fireStars(player, item, 'green');
  },

  // Fire magenta stars in all directions.
  'star_magenta': (game, player, item) => {
    game.fireStars(player, item, 'magenta');
  },

  // Fire red stars in all directions.
  'star_red': (game, player, item) => {
    game.fireStars(player, item, 'red');
  },

  // Fire yellow stars in all directions.
  'star_yellow': (game, player, item) => {
    game.fireStars(player, item, 'yellow');
  },

  // Skip either 3, 5, or 7 levels.
  'teleporter': (game, player, item) => {
    game.skipLevels(Math.floor(Math.random() * 3) * 2 + 3);
    game.awardItemPoints(player, item);
  },
};
