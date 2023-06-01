import React from 'react';
import { Select, Typography } from 'antd';
import { IMAGE_FILTERS } from 'entitites/image';
import { filterOption } from 'shared/lib/utils/filter';
import { ImageTheme } from 'shared/types/image';
import { useImageFilters } from 'entitites/image';

type OptionValue = ImageTheme | 'all';

const options = Object.entries(IMAGE_FILTERS).map(([value, label]) => ({ value, label }));
const allOption = { label: 'Все', value: 'all' };
const optionsWithAll = [allOption, ...options];

const ImageFilterByTheme: React.FC = () => {
  const { theme, setTheme } = useImageFilters();

  const onSelect = (filter: OptionValue) => {
    setTheme(filter);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
      <Typography.Text strong>Фильтрация</Typography.Text>
      <Select
        filterOption={filterOption}
        showSearch
        options={optionsWithAll}
        value={theme as OptionValue}
        onChange={onSelect}
      />
    </div>
  );
};

export { ImageFilterByTheme };
