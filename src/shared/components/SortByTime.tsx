import { Select, Typography } from 'antd';
import React from 'react';
import { DATE_SORTS } from 'shared/constants/sort';
import { useSort } from 'shared/lib/hooks/useSort';
import { filterOption } from 'shared/lib/utils/filter';

const options = DATE_SORTS.map((sort, index) => ({ label: sort.name, value: String(index) }));

const SortByTime: React.FC = () => {
  const { sort, setSort } = useSort();

  const onSelect = (sort: string) => {
    setSort(Number(sort));
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
      <Typography.Text strong>Сортировка</Typography.Text>
      <Select
        filterOption={filterOption}
        showSearch
        value={String(sort)}
        options={options}
        onChange={onSelect}
      />
    </div>
  );
};

export { SortByTime };
