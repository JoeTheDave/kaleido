import { min } from 'lodash';
import { useWindowSize } from '@react-hook/window-size';
import { kalidoGen } from '~/lib/kalidoGen';
import Container from '~/components/Container';
import CellElement from '~/components/CellElement';

import type { FC } from 'react';

interface KalidoProps {
  seed: string;
}

const Kalido: FC<KalidoProps> = ({ seed }) => {
  const gridWidth = 50;
  const gridHeight = 50;

  const [width, height] = useWindowSize();

  const cellSize: number =
    min([
      Math.floor((width - 100) / gridWidth),
      Math.floor((height - 100) / gridHeight),
    ]) || 0;

  const cells = kalidoGen(gridWidth, gridHeight, seed);

  return (
    <Container width={gridWidth * cellSize}>
      {cells.map((cell) => (
        <CellElement key={`cell-${cell.id}`} data={cell} size={cellSize} />
      ))}
    </Container>
  );
};

export default Kalido;
