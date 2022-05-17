import { IconButton } from '@material-ui/core';
import { Refresh } from '@material-ui/icons';
import { useNavigate } from '@remix-run/react';
import { gridSize } from '~/lib/kalidoGen';
import { useCellSize } from '~/lib/useCellSize';

import type { FC } from 'react';

interface ContainerProps {}

const Container: FC<ContainerProps> = ({ children }) => {
  const navigate = useNavigate();
  const cellSize = useCellSize();

  return (
    <div className="root">
      <div className="hover-zone">
        <IconButton size="medium" onClick={() => navigate('/')}>
          <Refresh />
        </IconButton>
      </div>
      <div className="container" style={{ width: gridSize * cellSize }}>
        {children}
      </div>
    </div>
  );
};

export default Container;
