import { useParams } from '@remix-run/react';
import { kalidoGen } from '~/lib/kalidoGen';
import CellElement from '~/components/CellElement';
import { useCellSize } from '~/lib/useCellSize';

export default function SeedRoute() {
  const { seed: seedParam } = useParams();
  const cellSize = useCellSize();
  const seed = seedParam || '';

  const cells = kalidoGen(seed);

  return (
    <>
      {cells.map((cell) => (
        <CellElement key={`cell-${cell.id}`} data={cell} size={cellSize} />
      ))}
    </>
  );
}
