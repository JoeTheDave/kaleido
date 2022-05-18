import colors from '~/lib/colors';

import type { Cell } from '~/lib/kaleidoGen';
import type { FC } from 'react';

interface CellProps {
  data: Cell;
  size: number;
}

const CellElement: FC<CellProps> = ({ data, size }) => {
  const cellStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: 'white',
    width: size,
    height: size,
    backgroundColor: data.segment !== null ? colors[0][data.segment] : '',

    borderTop: `solid 1px ${
      data.north && data.north.segment === data.segment
        ? colors[0][data.segment as number]
        : 'black'
    }`,
    borderRight: `solid 1px ${
      data.east && data.east.segment === data.segment
        ? colors[0][data.segment as number]
        : 'black'
    }`,
    borderBottom: `solid 1px ${
      data.south && data.south.segment === data.segment
        ? colors[0][data.segment as number]
        : 'black'
    }`,
    borderLeft: `solid 1px ${
      data.west && data.west.segment === data.segment
        ? colors[0][data.segment as number]
        : 'black'
    }`,
  };

  return <div className="cell" style={cellStyle}></div>;
};

export default CellElement;
