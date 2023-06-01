type TResponse<T> = {
  data: T;
  total: number;
};

type TSort = {
  type: 'desc' | 'asc';
  field: string;
};

type TPagination = {
  currentPage: number;
  pageSize: number;
};

export type { TResponse, TSort, TPagination };
