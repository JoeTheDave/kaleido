import { min } from 'lodash';
import { useWindowSize } from '@react-hook/window-size';
import { useQueryStringNavigator } from '~/lib/useQueryStringNavigator';

export const useCellSize = () => {
  const [width, height] = useWindowSize();
  const queryStringNavigator = useQueryStringNavigator();

  const gridSize = queryStringNavigator.getSizeValue();
  const cellSize: number =
    min([
      Math.floor((width - 100) / gridSize),
      Math.floor((height - 100) / gridSize),
    ]) || 0;

  return cellSize;
};
