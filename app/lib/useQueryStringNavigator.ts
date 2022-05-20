import { useSearchParams } from '@remix-run/react';

export const useQueryStringNavigator = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const getValue = (term: string) => {
    return (searchParams.get(term) || '').toLowerCase();
  };

  const getValues = (term: string) => {
    const value = getValue(term);
    return value ? value.split('|') : [];
  };

  const setValue = (term: string, value: string) => {
    if (value) {
      searchParams.set(term, value);
    } else {
      searchParams.delete(term);
    }
    setSearchParams(searchParams);
  };

  const toggleValue = (term: string, value: string) => {
    const values = getValues(term);
    const newValue = (
      values.includes(value)
        ? values.filter((v) => v !== value)
        : [...values, value]
    ).join('|');
    if (newValue) {
      searchParams.set(term, newValue);
    } else {
      searchParams.delete(term);
    }
    setSearchParams(searchParams);
  };

  const getSizeValue = () => {
    try {
      return parseInt(getValue('size') || '40');
    } catch {
      return 40;
    }
  };

  const setSizeValue = (val: number) => {
    setValue('size', val === 40 ? '' : val.toString());
  };

  const getPaletteValue = () => {
    try {
      return parseInt(getValue('palette') || '0');
    } catch {
      return 0;
    }
  };

  const setPaletteValue = (val: number) => {
    setValue('palette', val === 0 ? '' : val.toString());
  };

  const getRadiusCoefficientValue = () => {
    try {
      return parseFloat(getValue('radius') || '0.4');
    } catch {
      return 0.4;
    }
  };

  const setRadiusCoefficientValue = (val: number) => {
    setValue('radius', val === 0.4 ? '' : val.toString());
  };

  const getSegmentLengthCoefficientRangeValue = () => {
    try {
      return (getValue('seg-length') || '0.25|0.4')
        .split('|')
        .map((v) => parseFloat(v));
    } catch {
      return [0.25, 0.4];
    }
  };

  const setSegmentLengthCoefficientRangeValue = (val: number[]) => {
    const queryVal = `${val[0]}|${val[1]}`;
    setValue('seg-length', queryVal === '0.25|0.4' ? '' : queryVal);
  };

  return {
    getValue,
    getValues,
    setValue,
    toggleValue,
    getSizeValue,
    setSizeValue,
    getPaletteValue,
    setPaletteValue,
    getRadiusCoefficientValue,
    setRadiusCoefficientValue,
    getSegmentLengthCoefficientRangeValue,
    setSegmentLengthCoefficientRangeValue,
  };
};
