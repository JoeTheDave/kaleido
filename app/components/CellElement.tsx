import type { Cell } from '~/lib/kaleidoGen';
import type { FC } from 'react';

interface CellElementProps {
  data: Cell;
  size: number;
  palette: string[];
}

const borderWidth = 2;

const determineBorderColor = (
  cell: Cell,
  compCell: Cell | null,
  palette: string[],
) => {
  if (compCell !== null) {
    if (cell.segment === null && compCell.segment === null) {
      return '#FFFFFF';
    } else if (cell.segment === null || compCell.segment === null) {
      return '#000000';
    } else if (
      (cell.segment || 0) % palette.length ===
      (compCell.segment || 0) % palette.length
    ) {
      return palette[(cell.segment as number) % palette.length];
    } else {
      return '#000000';
    }
  }
  return '#F6F6F6';
};

const CellElement: FC<CellElementProps> = ({ data, size, palette }) => {
  const cellStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: 'black',
    width: size,
    height: size,
    backgroundColor:
      data.segment === null
        ? '#FFFFFF'
        : palette[data.segment % palette.length],

    borderTop: `solid ${borderWidth}px ${determineBorderColor(
      data,
      data.north,
      palette,
    )}`,
    borderRight: `solid ${borderWidth}px ${determineBorderColor(
      data,
      data.east,
      palette,
    )}`,
    borderBottom: `solid ${borderWidth}px ${determineBorderColor(
      data,
      data.south,
      palette,
    )}`,
    borderLeft: `solid ${borderWidth}px ${determineBorderColor(
      data,
      data.west,
      palette,
    )}`,
  };

  return <div className="cell" style={cellStyle}></div>;
};

export default CellElement;
