import { StringParam, useQueryParam, withDefault } from 'use-query-params';

const useImageFilters = () => {
  const [theme, setTheme] = useQueryParam('theme', withDefault(StringParam, 'all'));
  return { theme, setTheme } as const;
};

export { useImageFilters };
