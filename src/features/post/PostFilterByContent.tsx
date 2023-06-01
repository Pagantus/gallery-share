import { Input, Typography } from 'antd';
import { usePostFilters } from 'entitites/post';
import React from 'react';

const PostFilterByContent: React.FC = () => {
  const { contentFilter, setContentFilter } = usePostFilters();

  const onSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.value) {
      setContentFilter(null);
      return;
    }
    setContentFilter(e.target.value);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
      <Typography.Text strong>Поиск</Typography.Text>
      <Input
        value={contentFilter!}
        onChange={onSearch}
      />
    </div>
  );
};

export { PostFilterByContent };
