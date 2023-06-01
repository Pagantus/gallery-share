import React from 'react';
import { DownOutlined, UserOutlined } from '@ant-design/icons';
import { Avatar, MenuProps } from 'antd';
import { Dropdown, Space } from 'antd';
import styles from './styles.module.css';

const items: MenuProps['items'] = [
  {
    key: '1',
    label: (
      <a
        target='_blank'
        rel='noopener noreferrer'
        href='https://www.antgroup.com'>
        1st menu item
      </a>
    )
  },
  {
    key: '2',
    label: (
      <a
        target='_blank'
        rel='noopener noreferrer'
        href='https://www.aliyun.com'>
        2nd menu item
      </a>
    )
  },
  {
    key: '3',
    label: (
      <a
        target='_blank'
        rel='noopener noreferrer'
        href='https://www.luohanacademy.com'>
        3rd menu item
      </a>
    )
  }
];

const ViewerDropdown: React.FC = () => {
  return (
    <Dropdown
      trigger={['click']}
      menu={{ items: items }}
      overlayStyle={{ width: 256 }}
      placement='bottomLeft'>
      <div className={styles.dropdown}>
        <Avatar
          style={{ backgroundColor: 'rgb(45 62 79)' }}
          shape='circle'
          size={48}
          icon={<UserOutlined />}
        />
      </div>
    </Dropdown>
  );
};

export { ViewerDropdown };
