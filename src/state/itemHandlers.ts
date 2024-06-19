import { ItemHandler, ItemType } from "../types";

export const itemHandlers: Partial<Record<ItemType, ItemHandler>> = {

  // When a gold chest is collected, all items are gold coins.
  'chest_gold': (game, item) => {
    game.powerup('goldChest', ['level']);
    game.awardItemPoints(item);
  },

  // When a silver chest is collected, all items are silver coins.
  'chest_silver': (game, item) => {
    game.powerup('silverChest', ['level']);
    game.awardItemPoints(item);
  },

  // Activate the 'R' in "ROBOT".
  'circuit_1r': (game, item) => {
    game.circuits.current |= 1;
    game.awardItemPoints(item);
  },

  // Activate the first 'O' in "ROBOT".
  'circuit_2o': (game, item) => {
    game.circuits.current |= 2;
    game.awardItemPoints(item);
  },

  // Activate the 'B' in "ROBOT".
  'circuit_3b': (game, item) => {
    game.circuits.current |= 4;
    game.awardItemPoints(item);
  },

  // Activate the second 'O' in "ROBOT".
  'circuit_4o': (game, item) => {
    game.circuits.current |= 8;
    game.awardItemPoints(item);
  },

  // Activate the 'T' in "ROBOT".
  'circuit_5t': (game, item) => {
    game.circuits.current |= 16;
    game.awardItemPoints(item);
  },

  // Kill all enemies, and give diamonds.
  'dynamite': (game, item) => {
    game.signalEnemies('kill');
    game.powerup('dynamite', ['timer'], 0.5);
    game.powerup('diamonds', ['level']);
    game.awardItemPoints(item);
  },

  // Give player fireball power up.
  'hot_sauce': (game, item) => {
    game.players[0].powerup('fireballs', ['death', 'timer', 'level'], 20);
    game.awardItemPoints(item);
  },

  // Blue potions increase the travel distance of zaps.
  'potion_blue': (game, item) => {
    game.players[0].powerup('zapDistance', ['death']);
    game.awardItemPoints(item);
  },

  // Magenta potions increase the rate that zaps can be fired at.
  'potion_magenta': (game, item) => {
    game.players[0].powerup('zapSpeed', ['death']);
    game.awardItemPoints(item);
  },

  // Fire cyan stars in all directions.
  'star_cyan': (game, item) => {
    game.fireStars(item, 'cyan');
  },

  // Fire green stars in all directions.
  'star_green': (game, item) => {
    game.fireStars(item, 'green');
  },

  // Fire magenta stars in all directions.
  'star_magenta': (game, item) => {
    game.fireStars(item, 'magenta');
  },

  // Fire red stars in all directions.
  'star_red': (game, item) => {
    game.fireStars(item, 'red');
  },

  // Fire yellow stars in all directions.
  'star_yellow': (game, item) => {
    game.fireStars(item, 'yellow');
  },
};
