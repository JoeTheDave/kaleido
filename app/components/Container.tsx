import { useState } from 'react';
import {
  Button,
  ButtonGroup,
  FormControlLabel,
  IconButton,
  Radio,
  RadioGroup,
  Slider,
} from '@material-ui/core';
import { Refresh, Settings } from '@material-ui/icons';
import { useNavigate } from '@remix-run/react';
import cc from 'classcat';
import { v4 as uuidv4 } from 'uuid';
import { useCellSize } from '~/lib/useCellSize';
import { useQueryStringNavigator } from '~/lib/useQueryStringNavigator';
import colors from '~/lib/colors';

import type { FC } from 'react';

interface ContainerProps {}

const Container: FC<ContainerProps> = ({ children }) => {
  const navigate = useNavigate();
  const cellSize = useCellSize();
  const queryStringNavigator = useQueryStringNavigator();
  const gridSize = queryStringNavigator.getSizeValue();
  const [showModal, setShowModal] = useState<boolean>(false);
  const [kaleidoSize, setKaleidoSize] = useState<number>(gridSize);
  const [paletteIndex, setPaletteIndex] = useState<number>(
    queryStringNavigator.getPaletteValue(),
  );
  const [radiusCoefficient, setRadiusCoefficient] = useState<number>(
    queryStringNavigator.getRadiusCoefficientValue(),
  );
  const [segmentLengthRange, setSegmentLengthRange] = useState<number[]>(
    queryStringNavigator.getSegmentLengthCoefficientRangeValue(),
  );
  const [symmetry, setSymmetry] = useState<'radial' | 'mirror'>(
    queryStringNavigator.getSymmetryTypeValue(),
  );

  return (
    <div className="root">
      <div className="hover-zone">
        <IconButton
          size="medium"
          onClick={() => navigate(`/${uuidv4()}/${location.search}`)}
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
          <div className="modal-settings-header">Grid Size</div>
          <ButtonGroup variant="outlined">
            {[20, 40, 60, 80, 100, 150, 200].map((size) => (
              <Button
                key={`size-button-${size}`}
                onClick={() => setKaleidoSize(size)}
                variant={kaleidoSize === size ? 'contained' : 'outlined'}
                color={kaleidoSize === size ? 'primary' : 'default'}
              >
                {size}
              </Button>
            ))}
          </ButtonGroup>
          <div className="modal-settings-header">Color Palette</div>
          <div className="color-palette-selection-grid">
            {colors.map((palette, p) => (
              <Button
                key={`palette-${p}`}
                size="large"
                onClick={() => setPaletteIndex(p)}
              >
                <div
                  className={cc({
                    palette: true,
                    selected: p === paletteIndex,
                  })}
                >
                  {palette.map((color, i) => (
                    <div
                      key={`color-${p}-${i}`}
                      style={{ backgroundColor: color }}
                      className="palette-color"
                    ></div>
                  ))}
                </div>
              </Button>
            ))}
          </div>
          <div className="modal-settings-header">Radius Coefficient</div>
          <Slider
            value={radiusCoefficient}
            valueLabelDisplay="auto"
            step={0.05}
            marks
            min={0.1}
            max={0.7}
            onChange={(e, val) => {
              const radius = val as number;
              setRadiusCoefficient(radius);
            }}
          />
          <div className="modal-settings-header">
            Segment Length Coefficient Range
          </div>
          <Slider
            value={segmentLengthRange}
            valueLabelDisplay="auto"
            step={0.05}
            marks
            min={0.05}
            max={1.25}
            onChange={(e, val) => {
              const range = val as number[];
              setSegmentLengthRange(range);
            }}
          />
          <div className="modal-settings-header">symmetry</div>
          <RadioGroup row name="symmetry-selection">
            <FormControlLabel
              value="radial"
              control={
                <Radio checked={symmetry === 'radial'} color="primary" />
              }
              label="Radial"
              onClick={() => setSymmetry('radial')}
            />
            <FormControlLabel
              value="mirror"
              control={
                <Radio checked={symmetry === 'mirror'} color="primary" />
              }
              label="Mirror"
              onClick={() => setSymmetry('mirror')}
            />
          </RadioGroup>
          <div className="modal-button-row">
            <Button
              variant="contained"
              color="default"
              onClick={() => setShowModal(false)}
            >
              Close
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={() => {
                setShowModal(false);
                queryStringNavigator.setConfigValues({
                  size: kaleidoSize,
                  palette: paletteIndex,
                  radius: radiusCoefficient,
                  segmentLength: segmentLengthRange,
                  symmetry,
                });
              }}
            >
              Apply
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Container;
