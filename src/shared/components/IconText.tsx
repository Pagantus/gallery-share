import React from 'react';
import { Space } from 'antd';

type IconTextType = { icon: React.FC; text: string };

const IconText: React.FC<IconTextType> = ({ icon, text }) => (
  <Space>
    {React.createElement(icon)}
    {text}
  </Space>
);

export { IconText };
