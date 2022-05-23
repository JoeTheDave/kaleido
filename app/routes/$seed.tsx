import { useLoaderData } from '@remix-run/react';
import { kaleidoGen } from '~/lib/kaleidoGen';
import CellElement from '~/components/CellElement';
import { useCellSize } from '~/lib/useCellSize';
import { useQueryStringNavigator } from '~/lib/useQueryStringNavigator';
import colors from '~/lib/colors';

import type { LoaderFunction } from '@remix-run/server-runtime';
import type { DataCell } from '~/lib/kaleidoGen';

type LoaderData = {
  cells: DataCell[];
};

export const loader: LoaderFunction = async ({ params, request }) => {
  const url = new URL(request.url);
  const seed = params.seed || '';
  const size = parseInt(url.searchParams.get('size') || '40');
  const radiusCoefficient = parseFloat(
    url.searchParams.get('radius') || '0.35',
  );
  const segmentLengthRange = (url.searchParams.get('seg-length') || '0.25|0.5')
    .split('|')
    .map((v) => parseFloat(v));
  const cells = kaleidoGen(seed, size, radiusCoefficient, segmentLengthRange);
  return {
    cells,
  };
};

export default function SeedRoute() {
  const cellSize = useCellSize();
  const queryStringNavigator = useQueryStringNavigator();
  const paletteIndex = queryStringNavigator.getPaletteValue();
  const colorPalette = colors[paletteIndex];
  const { cells } = useLoaderData<LoaderData>();

  return (
    <>
      {cells.map((cell) => (
        <CellElement
          key={`cell-${cell.id}`}
          data={cell}
          size={cellSize}
          palette={colorPalette}
        />
      ))}
    </>
  );
}
