import { Button } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import React from 'react';

const PostEditButton: React.FC = () => {
  return (
    <Button
      type='ghost'
      icon={<EditOutlined />}
    />
  );
};

export { PostEditButton };
