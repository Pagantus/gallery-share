import { StringParam, useQueryParam, withDefault } from 'use-query-params';

const usePostFilters = () => {
  const [contentFilter, setContentFilter] = useQueryParam('content', StringParam);
  const [creatorFilter, setCreatorFilter] = useQueryParam('creator', withDefault(StringParam, 'all'));

  return { contentFilter, creatorFilter, setContentFilter, setCreatorFilter };
};

export { usePostFilters };
