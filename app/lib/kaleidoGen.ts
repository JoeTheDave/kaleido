import { memoize } from 'lodash';
import { Random } from '~/lib/random';

// export const gridSize = 20;
const startSizeRadiusCoefficient = 0.4;
const minSegmentLengthCoefficient = 0.2;
const maxSegmentLengthCoefficient = 0.3;
const friendlySelectionCoefficient = 1;
export class Cell {
  id: number;
  x: number;
  y: number;
  north: Cell | null;
  east: Cell | null;
  south: Cell | null;
  west: Cell | null;
  centerOffset: number;
  segment: number | null;
  iteration: number | null;

  constructor(x: number, y: number, id: number) {
    this.id = id;
    this.x = x;
    this.y = y;
    this.north = null;
    this.east = null;
    this.south = null;
    this.west = null;
    this.centerOffset = 0;
    this.segment = null;
    this.iteration = null;
  }

  getNeighbors() {
    return [this.north, this.east, this.south, this.west];
  }
}

export class Grid {
  cells: Cell[];
  rand: Random;
  gridSize: number;

  constructor(seed: string, size: number) {
    this.rand = new Random(seed);
    this.gridSize = size;
    this.cells = [];
    for (let y = 1; y <= this.gridSize; y++) {
      for (let x = 1; x <= this.gridSize; x++) {
        this.cells.push(new Cell(x, y, x + (y - 1) * this.gridSize));
      }
    }
    this.cells.forEach((cell) => {
      cell.north =
        cell.id <= this.gridSize
          ? null
          : this.cells[cell.id - this.gridSize - 1];
      cell.east = cell.id % this.gridSize === 0 ? null : this.cells[cell.id];
      cell.south =
        cell.id > this.gridSize * (this.gridSize - 1)
          ? null
          : this.cells[cell.id + this.gridSize - 1];
      cell.west =
        cell.id % this.gridSize === 1 ? null : this.cells[cell.id - 2];
      cell.centerOffset = Math.floor(
        Math.sqrt(
          Math.pow(cell.x - this.gridSize / 2 - 0.5, 2) +
            Math.pow(cell.y - this.gridSize / 2 - 0.5, 2),
        ),
      );
    });
  }

  getStartCells() {
    return this.cells.filter(
      (cell) =>
        cell.x <= this.gridSize / 2 && // In upper left quadrant
        cell.y <= this.gridSize / 2 &&
        cell.centerOffset < this.gridSize * startSizeRadiusCoefficient && // Within the radius
        cell.north && // Not on the border
        cell.east &&
        cell.south &&
        cell.west &&
        cell.segment === null, // Not already used
    );
  }

  getRandomStartSelection() {
    return this.rand.randomSelection<Cell>(this.getStartCells());
  }

  getRandomConnectedSegmentStartSelection() {
    return this.rand.randomSelection<Cell>(
      this.getStartCells().filter((cell) =>
        cell.getNeighbors().some((n) => n?.segment !== null),
      ),
    );
  }

  getNextRadialSelection(cell: Cell) {
    return this.cells.find(
      (nextCell) =>
        nextCell.y === cell.x && nextCell.x === this.gridSize - cell.y + 1,
    ) as Cell;
  }

  getEquivalentRadialSelectionSet(cell: Cell) {
    const selection: Cell[] = [cell];
    do {
      selection.push(
        this.getNextRadialSelection(selection[selection.length - 1]),
      );
    } while (selection.length < 4);
    return selection;
  }

  getRandomUnsegmentedNeighbor(cell: Cell) {
    const options: Cell[] = cell
      .getNeighbors()
      .filter(
        (cellOption) =>
          cellOption !== null &&
          cellOption.segment === null &&
          !cellOption.getNeighbors().some((n) => n === null),
      ) as Cell[];
    const friendlyOptions = options.filter((celloption) =>
      celloption
        .getNeighbors()
        .some((n) => n?.segment !== null && n?.segment !== cell.segment),
    );
    if (
      friendlyOptions.length &&
      this.rand.range(1, 100) / 100 < friendlySelectionCoefficient
    ) {
      return this.rand.randomSelection<Cell>(friendlyOptions);
    }
    return options.length === 0
      ? null
      : this.rand.randomSelection<Cell>(options);
  }

  getRandomSegmentLength() {
    return this.rand.range(
      Math.ceil(this.gridSize * minSegmentLengthCoefficient),
      Math.ceil(this.gridSize * maxSegmentLengthCoefficient),
    );
  }

  kaleido() {
    let segmentIteration = 0;
    let selection: Cell | null = null;

    do {
      let segmentLength = this.getRandomSegmentLength();
      let cellIteration = 0;
      do {
        if (selection) {
          if (cellIteration < segmentLength) {
            selection = this.getRandomUnsegmentedNeighbor(selection);
          } else {
            selection = null;
          }
        } else {
          if (segmentIteration === 0) {
            selection = this.getRandomStartSelection();
          } else {
            selection = this.getRandomConnectedSegmentStartSelection();
          }
        }
        if (selection) {
          const selectionSet = this.getEquivalentRadialSelectionSet(selection);
          selectionSet.forEach((cell) => {
            cell.segment = segmentIteration;
            cell.iteration = cellIteration;
          });
          cellIteration++;
        }
      } while (selection);
      segmentIteration++;
      if (segmentIteration === 5) {
        segmentIteration = 0;
      }
      selection = null;
    } while (this.getStartCells().length);
  }
}

export const kaleidoGen = // memoize(
  (seed: string, size: number) => {
    console.log('Generating kalido data...');
    const grid = new Grid(seed, size);
    grid.kaleido();
    return grid.cells;
  };
//);
