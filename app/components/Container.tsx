import { useState } from 'react';
import { IconButton, Button, ButtonGroup } from '@material-ui/core';
import { Refresh, Settings } from '@material-ui/icons';
import { useNavigate } from '@remix-run/react';
import cc from 'classcat';
import { useCellSize } from '~/lib/useCellSize';
import { useQueryStringNavigator } from '~/lib/useQueryStringNavigator';

import type { FC } from 'react';

interface ContainerProps {}

const Container: FC<ContainerProps> = ({ children }) => {
  const navigate = useNavigate();
  const cellSize = useCellSize();
  const queryStringNavigator = useQueryStringNavigator();
  const [showModal, setShowModal] = useState<boolean>();

  const gridSize = queryStringNavigator.getSizeValue();

  //

  return (
    <div className="root">
      <div className="hover-zone">
        <IconButton
          size="medium"
          onClick={() => navigate(`/${location.search}`)}
        >
          <Refresh />
        </IconButton>
        <IconButton size="medium" onClick={() => setShowModal(true)}>
          <Settings />
        </IconButton>
      </div>
      <div className="container" style={{ width: gridSize * cellSize }}>
        {children}
      </div>
      <div className="logo">Kaleido</div>
      <div className={cc({ 'modal-container': true, show: showModal })}>
        <div className="modal">
          <div className="modal-header">Kaleido Config</div>
          <div className="modal-settings-header">Size</div>

          <ButtonGroup variant="outlined">
            {[20, 40, 60, 80, 100, 150, 200].map((size) => (
              <Button
                key={`size-button-${size}`}
                onClick={() => queryStringNavigator.setValue('size', `${size}`)}
                variant={gridSize === size ? 'contained' : 'outlined'}
                color={gridSize === size ? 'primary' : 'default'}
              >
                {size}
              </Button>
            ))}
          </ButtonGroup>

          <div className="modal-button-row">
            <Button
              variant="contained"
              color="primary"
              onClick={() => setShowModal(false)}
            >
              Close
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Container;
