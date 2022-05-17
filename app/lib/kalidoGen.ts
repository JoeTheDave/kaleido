import { memoize } from 'lodash';
import { Random } from '~/lib/random';

export const gridSize = 100;
const startSizeRadiusCoefficient = 0.25;
const minSegmentLengthCoefficient = 0.25;
const maxSegmentLengthCoefficient = 0.5;
const friendlySelectionCoefficient = 0.8;
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

  constructor(seed: string) {
    this.rand = new Random(seed);
    this.cells = [];
    for (let y = 1; y <= gridSize; y++) {
      for (let x = 1; x <= gridSize; x++) {
        this.cells.push(new Cell(x, y, x + (y - 1) * gridSize));
      }
    }
    this.cells.forEach((cell) => {
      cell.north =
        cell.id <= gridSize ? null : this.cells[cell.id - gridSize - 1];
      cell.east = cell.id % gridSize === 0 ? null : this.cells[cell.id];
      cell.south =
        cell.id > gridSize * (gridSize - 1)
          ? null
          : this.cells[cell.id + gridSize - 1];
      cell.west = cell.id % gridSize === 1 ? null : this.cells[cell.id - 2];
      cell.centerOffset = Math.floor(
        Math.sqrt(
          Math.pow(cell.x - gridSize / 2 - 0.5, 2) +
            Math.pow(cell.y - gridSize / 2 - 0.5, 2),
        ),
      );
    });
  }

  getStartCells() {
    return this.cells.filter(
      (cell) =>
        cell.x <= gridSize / 2 && // In upper left quadrant
        cell.y <= gridSize / 2 &&
        cell.centerOffset < gridSize * startSizeRadiusCoefficient && // Within the radius
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
        nextCell.y === cell.x && nextCell.x === gridSize - cell.y + 1,
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
      Math.ceil(gridSize * minSegmentLengthCoefficient),
      Math.ceil(gridSize * maxSegmentLengthCoefficient),
    );
  }

  kalido() {
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
    } while (this.getStartCells().length); // TODO: while more vacant cells exist
  }
}

export const kalidoGen = memoize((seed: string) => {
  console.log('Generating kalido data...');
  const grid = new Grid(seed);
  grid.kalido();
  return grid.cells;
});
