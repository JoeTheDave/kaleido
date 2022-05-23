import { useSearchParams } from '@remix-run/react';

export const useQueryStringNavigator = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const getValue = (term: string) => {
    return (searchParams.get(term) || '').toLowerCase();
  };

  const setParam = (term: string, value: string) => {
    if (value) {
      searchParams.set(term, value);
    } else {
      searchParams.delete(term);
    }
  };

  const getSizeValue = () => {
    try {
      return parseInt(getValue('size') || '40');
    } catch {
      return 40;
    }
  };

  const getPaletteValue = () => {
    try {
      return parseInt(getValue('palette') || '0');
    } catch {
      return 0;
    }
  };

  const getRadiusCoefficientValue = () => {
    try {
      return parseFloat(getValue('radius') || '0.35');
    } catch {
      return 0.4;
    }
  };

  const getSegmentLengthCoefficientRangeValue = () => {
    try {
      return (getValue('seg-length') || '0.25|0.5')
        .split('|')
        .map((v) => parseFloat(v));
    } catch {
      return [0.25, 0.4];
    }
  };

  const getSymmetryTypeValue = () => {
    return (getValue('symmetry') || 'radial') as 'radial' | 'mirror';
  };

  interface SetConfigValuesInput {
    size: number;
    palette: number;
    radius: number;
    segmentLength: number[];
    symmetry: 'radial' | 'mirror';
  }

  const setConfigValues = ({
    size,
    palette,
    radius,
    segmentLength,
    symmetry,
  }: SetConfigValuesInput) => {
    const segLength = `${segmentLength[0]}|${segmentLength[1]}`;
    setParam('size', size === 40 ? '' : size.toString());
    setParam('palette', palette === 0 ? '' : palette.toString());
    setParam('radius', radius === 0.35 ? '' : radius.toString());
    setParam('seg-length', segLength === '0.25|0.5' ? '' : segLength);
    setParam('symmetry', symmetry === 'radial' ? '' : symmetry);
    setSearchParams(searchParams);
  };

  return {
    getSizeValue,
    getPaletteValue,
    getRadiusCoefficientValue,
    getSegmentLengthCoefficientRangeValue,
    getSymmetryTypeValue,
    setConfigValues,
  };
};
