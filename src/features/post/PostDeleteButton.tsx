import { Button } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import React from 'react';

const PostDeleteButton: React.FC = () => {
  return (
    <Button
      type='ghost'
      icon={<DeleteOutlined />}
    />
  );
};

export { PostDeleteButton };
