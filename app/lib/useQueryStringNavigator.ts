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

  const setSizeValue = (val: string) => {
    setValue('size', val === '40' ? '' : val);
  };

  return {
    getValue,
    getValues,
    setValue,
    toggleValue,
    getSizeValue,
    setSizeValue,
  };
};
