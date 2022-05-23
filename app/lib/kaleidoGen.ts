import { flatten } from 'lodash';
import { Random } from '~/lib/random';

const friendlySelectionCoefficient = 0.75;
class SmartCell {
  id: number;
  x: number;
  y: number;
  centerOffset: number;
  segment: number | null;
  iteration: number | null;
  north: SmartCell | null;
  east: SmartCell | null;
  south: SmartCell | null;
  west: SmartCell | null;

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

  getNeighbors(withCorners: boolean = false) {
    const neighbors = [this.north, this.east, this.south, this.west];
    if (withCorners) {
      const cornerNeighbors = [
        this.north?.east,
        this.east?.south,
        this.south?.west,
        this.west?.north,
      ];
      return flatten([neighbors, cornerNeighbors]) as (SmartCell | null)[];
    }
    return neighbors;
  }
}

export class DataCell {
  id: number;
  x: number;
  y: number;
  centerOffset: number;
  segment: number | null;
  iteration: number | null;
  northSegment: number | null;
  eastSegment: number | null;
  southSegment: number | null;
  westSegment: number | null;

  constructor(cell: SmartCell) {
    this.id = cell.id;
    this.x = cell.x;
    this.y = cell.y;
    this.centerOffset = cell.centerOffset;
    this.segment = cell.segment;
    this.iteration = cell.iteration;
    this.northSegment = cell.north === null ? null : cell.north.segment;
    this.eastSegment = cell.east === null ? null : cell.east.segment;
    this.southSegment = cell.south === null ? null : cell.south.segment;
    this.westSegment = cell.west === null ? null : cell.west.segment;
  }
}

export class Grid {
  cells: SmartCell[];
  rand: Random;
  gridSize: number;
  radiusCoefficient: number;
  segmentLengthRange: number[];

  constructor(
    seed: string,
    size: number,
    radiusCoefficient: number,
    segmentLengthRange: number[],
  ) {
    this.rand = new Random(seed);
    this.gridSize = size;
    this.radiusCoefficient = radiusCoefficient;
    this.segmentLengthRange = segmentLengthRange;
    this.cells = [];
    for (let y = 1; y <= this.gridSize; y++) {
      for (let x = 1; x <= this.gridSize; x++) {
        this.cells.push(new SmartCell(x, y, x + (y - 1) * this.gridSize));
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
        cell.centerOffset < this.gridSize * this.radiusCoefficient && // Within the radius
        cell.north && // Not on the border
        cell.east &&
        cell.south &&
        cell.west &&
        cell.segment === null, // Not already used
    );
  }

  getRandomStartSelection() {
    return this.rand.randomSelection<SmartCell>(this.getStartCells());
  }

  getRandomConnectedSegmentStartSelection() {
    return this.rand.randomSelection<SmartCell>(
      this.getStartCells().filter((cell) =>
        cell.getNeighbors().some((n) => n?.segment !== null),
      ),
    );
  }

  getNextRadialSelection(cell: SmartCell) {
    return this.cells.find(
      (nextCell) =>
        nextCell.y === cell.x && nextCell.x === this.gridSize - cell.y + 1,
    ) as SmartCell;
  }

  getEquivalentRadialSelectionSet(cell: SmartCell) {
    const selection: SmartCell[] = [cell];
    do {
      selection.push(
        this.getNextRadialSelection(selection[selection.length - 1]),
      );
    } while (selection.length < 4);
    return selection;
  }

  getRandomUnsegmentedNeighbor(cell: SmartCell) {
    const options: SmartCell[] = cell
      .getNeighbors()
      .filter(
        (cellOption) =>
          cellOption !== null &&
          cellOption.segment === null &&
          !cellOption.getNeighbors().some((n) => n === null),
      ) as SmartCell[];
    const friendlyOptions = options.filter((celloption) =>
      celloption
        .getNeighbors(true)
        .some((n) => n?.segment !== null && n?.segment !== cell.segment),
    );
    if (
      friendlyOptions.length &&
      this.rand.range(1, 100) / 100 < friendlySelectionCoefficient
    ) {
      return this.rand.randomSelection<SmartCell>(friendlyOptions);
    }
    return options.length === 0
      ? null
      : this.rand.randomSelection<SmartCell>(options);
  }

  getRandomSegmentLength() {
    return this.rand.range(
      Math.ceil(this.gridSize * this.segmentLengthRange[0]),
      Math.ceil(this.gridSize * this.segmentLengthRange[1]),
    );
  }

  kaleido() {
    let segmentIteration = 0;
    let selection: SmartCell | null = null;

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
      selection = null;
    } while (this.getStartCells().length);
  }
}

let kaleidoResult: DataCell[] = [];
let kaleidoKey: string = '';

export const kaleidoGen = (
  seed: string,
  size: number,
  radiusCoefficient: number,
  segmentLengthRange: number[],
) => {
  const key = JSON.stringify({
    seed,
    size,
    radiusCoefficient,
    segmentLengthRange,
  });
  if (key !== kaleidoKey) {
    console.log('Generating kalido data...');
    const grid = new Grid(seed, size, radiusCoefficient, segmentLengthRange);
    grid.kaleido();
    kaleidoResult = grid.cells.map((gridCell) => new DataCell(gridCell));
    kaleidoKey = key;
  }
  return kaleidoResult;
};
