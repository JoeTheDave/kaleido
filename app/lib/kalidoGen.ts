import { memoize } from 'lodash';
import { Random } from '~/lib/random';

export class Cell {
  id: number;
  x: number;
  y: number;
  north: Cell | null;
  east: Cell | null;
  south: Cell | null;
  west: Cell | null;
  centerOffset: number;

  constructor(x: number, y: number, id: number) {
    this.id = id;
    this.x = x;
    this.y = y;
    this.north = null;
    this.east = null;
    this.south = null;
    this.west = null;
    this.centerOffset = 0;
  }
}

export const kalidoGen = memoize(
  (gridWidth: number, gridHeight: number, seed: string) => {
    console.log('Generating kalido data...');
    const rand = new Random(seed);

    const cells: Cell[] = [];
    for (let y = 1; y <= gridHeight; y++) {
      for (let x = 1; x <= gridWidth; x++) {
        cells.push(new Cell(x, y, x + (y - 1) * gridWidth));
      }
    }
    cells.forEach((cell) => {
      cell.north = cell.id <= gridWidth ? null : cells[cell.id - gridWidth - 1];
      cell.east = cell.id % gridWidth === 0 ? null : cells[cell.id];
      cell.south =
        cell.id > gridWidth * (gridHeight - 1)
          ? null
          : cells[cell.id + gridWidth - 1];
      cell.west = cell.id % gridWidth === 1 ? null : cells[cell.id - 2];
      cell.centerOffset = Math.floor(
        Math.sqrt(
          Math.pow(cell.x - gridWidth / 2 - 0.5, 2) +
            Math.pow(cell.y - gridHeight / 2 - 0.5, 2),
        ),
      );
    });

    return cells;
  },
);
