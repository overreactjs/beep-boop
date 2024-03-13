import { ItemHandler, ItemType } from "../types";

export const itemHandlers: Partial<Record<ItemType, ItemHandler>> = {

  // Activate the 'R' in robot.
  'circuit_1r': (game, item) => {
    game.circuits.current |= 1;
    game.awardItemPoints(item);
  },

  // Activate the first 'O' in robot.
  'circuit_2o': (game, item) => {
    game.circuits.current |= 2;
    game.awardItemPoints(item);
  },

  // Activate the 'B' in robot.
  'circuit_3b': (game, item) => {
    game.circuits.current |= 4;
    game.awardItemPoints(item);
  },

  // Activate the second 'O' in robot.
  'circuit_4o': (game, item) => {
    game.circuits.current |= 8;
    game.awardItemPoints(item);
  },

  // Activate the 'T' in robot.
  'circuit_5t': (game, item) => {
    game.circuits.current |= 16;
    game.awardItemPoints(item);
  },

  // Give player fireball power up.
  'hot_sauce': (game, item) => {
    game.players[0].powerup('fireballs', ['death', 'timer'], 20);
    game.awardItemPoints(item);
  },

  // Fire yellow stars in all directions.
  'star_yellow': (game, item) => {
    game.fireStars(item, 'yellow');
  },

  // Fire green stars in all directions.
  'star_green': (game, item) => {
    game.fireStars(item, 'green');
  },

  // Fire cyan stars in all directions.
  'star_cyan': (game, item) => {
    game.fireStars(item, 'cyan');
  },

  // Fire magenta stars in all directions.
  'star_magenta': (game, item) => {
    game.fireStars(item, 'magenta');
  },

  // Fire red stars in all directions.
  'star_red': (game, item) => {
    game.fireStars(item, 'red');
  },
};
