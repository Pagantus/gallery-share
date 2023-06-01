import { NumberParam, useQueryParam, withDefault } from 'use-query-params';

const useSort = () => {
  const [sort, setSort] = useQueryParam('sort', withDefault(NumberParam, 0));

  return { sort, setSort };
};

export { useSort };
