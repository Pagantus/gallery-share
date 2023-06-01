import { Radio, RadioChangeEvent } from 'antd';
import { usePostFilters } from 'entitites/post';
import React from 'react';

const options = [
  { label: 'Все посты', value: 'all' },
  { label: 'Мои посты', value: 'my' }
];

const PostFilterByCreatorId: React.FC = () => {
  const { creatorFilter, setCreatorFilter } = usePostFilters();

  const onChange = (e: RadioChangeEvent) => {
    setCreatorFilter(e.target.value);
  };

  return (
    <Radio.Group
      options={options}
      onChange={onChange}
      value={creatorFilter}
      optionType='button'
      buttonStyle='solid'
    />
  );
};

export { PostFilterByCreatorId };
