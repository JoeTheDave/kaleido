import { min } from 'lodash';
import { useWindowSize } from '@react-hook/window-size';
import { gridSize } from '~/lib/kalidoGen';

export const useCellSize = () => {
  const [width, height] = useWindowSize();

  const cellSize: number =
    min([
      Math.floor((width - 100) / gridSize),
      Math.floor((height - 100) / gridSize),
    ]) || 0;

  return cellSize;
};
