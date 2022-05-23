import type { DataCell } from '~/lib/kaleidoGen';
import type { FC } from 'react';

interface CellElementProps {
  data: DataCell;
  size: number;
  palette: string[];
}

const borderWidth = 1;

const determineBorderColor = (
  cell: DataCell,
  compSegment: number | null,
  palette: string[],
) => {
  if (cell.segment === null && compSegment === null) {
    return '#FFFFFF';
  } else if (cell.segment === null || compSegment === null) {
    return '#000000';
  } else if (
    (cell.segment || 0) % palette.length ===
    (compSegment || 0) % palette.length
  ) {
    return palette[(cell.segment as number) % palette.length];
  } else {
    return '#000000';
  }
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
      data.northSegment,
      palette,
    )}`,
    borderRight: `solid ${borderWidth}px ${determineBorderColor(
      data,
      data.eastSegment,
      palette,
    )}`,
    borderBottom: `solid ${borderWidth}px ${determineBorderColor(
      data,
      data.southSegment,
      palette,
    )}`,
    borderLeft: `solid ${borderWidth}px ${determineBorderColor(
      data,
      data.westSegment,
      palette,
    )}`,
  };

  return <div className="cell" style={cellStyle}></div>;
};

export default CellElement;
