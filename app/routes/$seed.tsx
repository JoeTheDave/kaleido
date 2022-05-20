import { useParams } from '@remix-run/react';
import { kaleidoGen } from '~/lib/kaleidoGen';
import CellElement from '~/components/CellElement';
import { useCellSize } from '~/lib/useCellSize';
import { useQueryStringNavigator } from '~/lib/useQueryStringNavigator';
import colors from '~/lib/colors';

export default function SeedRoute() {
  const { seed: seedParam } = useParams();
  const cellSize = useCellSize();
  const queryStringNavigator = useQueryStringNavigator();
  const seed = seedParam || '';

  const size = queryStringNavigator.getSizeValue();
  const paletteIndex = queryStringNavigator.getPaletteValue();
  const colorPalette = colors[paletteIndex];
  const radiusCoefficient = queryStringNavigator.getRadiusCoefficientValue();
  const segmentLengthRange =
    queryStringNavigator.getSegmentLengthCoefficientRangeValue();

  const cells = kaleidoGen(seed, size, radiusCoefficient, segmentLengthRange);

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
