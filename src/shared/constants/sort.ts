const DATE_SORTS = [
  { name: 'Сначала новые', field: 'createdAt', type: 'desc' },
  { name: 'Сначала старые', field: 'createdAt', type: 'asc' }
] as const;

export { DATE_SORTS };
