import type { Cell } from '~/lib/kalidoGen';
import type { FC } from 'react';

interface CellProps {
  data: Cell;
  size: number;
}

const CellElement: FC<CellProps> = ({ data, size }) => {
  return (
    <div
      className="cell"
      style={{
        width: size,
        height: size,
        backgroundColor: data.segment !== null ? 'yellow' : '',
      }}
    >
      {data.id}
    </div>
  );
};

export default CellElement;
