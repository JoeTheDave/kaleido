import { useParams } from '@remix-run/react';
import { kaleidoGen } from '~/lib/kaleidoGen';
import CellElement from '~/components/CellElement';
import { useCellSize } from '~/lib/useCellSize';
import { useQueryStringNavigator } from '~/lib/useQueryStringNavigator';

export default function SeedRoute() {
  const { seed: seedParam } = useParams();
  const cellSize = useCellSize();
  const queryStringNavigator = useQueryStringNavigator();
  const seed = seedParam || '';

  const size = queryStringNavigator.getSizeValue();

  const cells = kaleidoGen(seed, size);

  return (
    <>
      {cells.map((cell) => (
        <CellElement key={`cell-${cell.id}`} data={cell} size={cellSize} />
      ))}
    </>
  );
}
