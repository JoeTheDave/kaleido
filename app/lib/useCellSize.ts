import { min } from 'lodash';
import { useWindowSize } from '@react-hook/window-size';
import { gridWidth, gridHeight } from '~/lib/kalidoGen';

export const useCellSize = () => {
  const [width, height] = useWindowSize();

  const cellSize: number =
    min([
      Math.floor((width - 100) / gridWidth),
      Math.floor((height - 100) / gridHeight),
    ]) || 0;

  return cellSize;
};
