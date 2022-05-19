import colors from '~/lib/colors';

import type { Cell } from '~/lib/kaleidoGen';
import type { FC } from 'react';

interface CellProps {
  data: Cell;
  size: number;
}

const borderWidth = 1;

const CellElement: FC<CellProps> = ({ data, size }) => {
  const cellStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: 'white',
    width: size,
    height: size,
    backgroundColor: data.segment !== null ? colors[0][data.segment] : '',

    borderTop:
      data.north !== null
        ? `solid ${borderWidth}px ${
            data.north && data.north.segment === data.segment
              ? data.segment !== null
                ? colors[0][data.segment]
                : ''
              : 'black'
          }`
        : 'solid 2px #F6F6F6',
    borderRight:
      data.east !== null
        ? `solid ${borderWidth}px ${
            data.east && data.east.segment === data.segment
              ? data.segment !== null
                ? colors[0][data.segment]
                : ''
              : 'black'
          }`
        : 'solid 2px #F6F6F6',
    borderBottom:
      data.south !== null
        ? `solid ${borderWidth}px ${
            data.south && data.south.segment === data.segment
              ? data.segment !== null
                ? colors[0][data.segment]
                : ''
              : 'black'
          }`
        : 'solid 2px #F6F6F6',
    borderLeft:
      data.west !== null
        ? `solid ${borderWidth}px ${
            data.west && data.west.segment === data.segment
              ? data.segment !== null
                ? colors[0][data.segment]
                : ''
              : 'black'
          }`
        : 'solid 2px #F6F6F6',
  };

  return <div className="cell" style={cellStyle}></div>;
};

export default CellElement;
