import { memoize } from 'lodash';
import { Random } from '~/lib/random';

export class Cell {
  id: number;

  constructor(id: number) {
    this.id = id;
  }
}

export const kalidoGen = memoize(
  (gridWidth: number, gridHeight: number, seed: string) => {
    console.log('Generating kalido data...');
    const rand = new Random(seed);

    const cells = [];
    for (let i = 1; i <= gridWidth * gridHeight; i++) {
      cells.push(new Cell(i));
    }

    return cells;
  },
);
