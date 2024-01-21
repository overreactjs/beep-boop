import DATA_LEVEL001 from "./level001.json";

export const LEVEL001 = convert(DATA_LEVEL001);

type LevelData = {
  tiles: number[];
  collisions: (false | string)[];
};

function convert(data: string[]): LevelData {
  const tiles: number[] = [];
  const collisions: (string | false)[] = [];

  for (let y = 0; y < 25; y++) {
    for (let x = 0; x < 32; x++) {
      if (data[y][x] === '1') {
        tiles.push(10);
        collisions.push('platform');
      } else {
        const hasAbove = y > 0 && data[y-1][x] === '1';
        const hasLeft = x > 0 && data[y][x-1] === '1';
        const hasAboveLeft = y > 0 && x > 0 && data[y-1][x-1] === '1';

        if (hasAbove && hasLeft) {
          tiles.push(0);
        } else if (hasAbove) {
          tiles.push(hasAboveLeft ? 1 : 4);
        } else if (hasLeft) {
          tiles.push(hasAboveLeft ? 2 : 5);
        } else if (hasAboveLeft) {
          tiles.push(3);
        } else {
          tiles.push(-1);
        }

        collisions.push(false);
      }
    }
  }

  return { tiles, collisions };
}
