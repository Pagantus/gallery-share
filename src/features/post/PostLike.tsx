import React from 'react';
import { HeartFilled, HeartOutlined } from '@ant-design/icons';
import { TPostData } from 'shared/types/post';
import { Button } from 'antd';

type PostLikeProps = {
  post: TPostData;
};

const PostLike: React.FC<PostLikeProps> = ({ post }) => {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  const userId = '1';
  const isLiked = post.likes.userIds.includes(userId);
  const likesCount = post.likes.count;

  const onLike = () => {};
  const onUnlike = () => {};

  return (
    <Button
      loading={isLoading}
      style={{ fontWeight: 600 }}
      onClick={isLiked ? onUnlike : onLike}
      type='ghost'
      icon={isLiked ? <HeartFilled /> : <HeartOutlined />}>
      {' '}
      {likesCount}
    </Button>
  );
};

export { PostLike };
