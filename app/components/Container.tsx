import { useState } from 'react';
import { IconButton, Button, ButtonGroup } from '@material-ui/core';
import { Refresh, Settings } from '@material-ui/icons';
import { useNavigate } from '@remix-run/react';
import cc from 'classcat';
import { useCellSize } from '~/lib/useCellSize';
import { useQueryStringNavigator } from '~/lib/useQueryStringNavigator';

import type { FC } from 'react';

interface SizeSettingsButtonProps {
  size: number;
}

interface ContainerProps {}

const SizeSettingsButton: FC<SizeSettingsButtonProps> = ({ size }) => {
  const queryStringNavigator = useQueryStringNavigator();

  const selectedSize = queryStringNavigator.getSizeValue();

  return (
    <Button
      onClick={() => queryStringNavigator.setValue('size', `${size}`)}
      variant={selectedSize === size ? 'contained' : 'outlined'}
      color={selectedSize === size ? 'primary' : 'default'}
    >
      {size}
    </Button>
  );
};

const Container: FC<ContainerProps> = ({ children }) => {
  const navigate = useNavigate();
  const cellSize = useCellSize();
  const queryStringNavigator = useQueryStringNavigator();
  const [showModal, setShowModal] = useState<boolean>();

  const gridSize = queryStringNavigator.getSizeValue();

  return (
    <div className="root">
      <div className="hover-zone">
        <IconButton size="medium" onClick={() => navigate('/')}>
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
            <SizeSettingsButton size={20} />
            <SizeSettingsButton size={40} />
            <SizeSettingsButton size={60} />
            <SizeSettingsButton size={80} />
            <SizeSettingsButton size={100} />
            <SizeSettingsButton size={150} />
            <SizeSettingsButton size={200} />
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
