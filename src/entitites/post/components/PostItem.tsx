import { Avatar, List, Typography } from 'antd';
import React from 'react';
import { UserOutlined } from '@ant-design/icons';
import { TPostData } from 'shared/types/post';

type PostItemProps = {
  content: TPostData['content'];
  creator: TPostData['creator'];
  avatar: TPostData['avatar'];
  actions: React.ReactNode[];
};

const PostItem: React.FC<PostItemProps> = ({ creator, avatar, content, actions }) => {
  return (
    <List.Item
      actions={actions}
      style={{ backgroundColor: '#fff', border: '1px solid #d9d9d9' }}>
      <List.Item.Meta
        avatar={
          <Avatar
            src={avatar?.url}
            icon={<UserOutlined />}
          />
        }
        title={creator ? creator.username : 'Неизвестный пользователь'}
      />
      {/* <Typography.Paragraph editable>{content}</Typography.Paragraph> */}
      {content}
    </List.Item>
  );
};

export { PostItem };
