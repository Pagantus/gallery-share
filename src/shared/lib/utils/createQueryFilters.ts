import { or, orderBy, QueryFieldFilterConstraint, QueryOrderByConstraint, where } from 'firebase/firestore';

const createQueryFilters = <T extends object>(filters: T) => {
  const query = Object.entries(filters).reduce<(QueryFieldFilterConstraint | QueryOrderByConstraint)[]>(
    (acc, [name, value]) => {
      const isIdField = name.toLowerCase().includes('id');
      if (isIdField) {
        acc.push(where(name, '==', value));
      } else {
        if (typeof value === 'string') {
          acc.push(where(name, '>=', value), where(name, '<=', value + '~'), orderBy(name));
        }
      }

      return acc;
    },
    []
  );

  return query;
};

export { createQueryFilters };
