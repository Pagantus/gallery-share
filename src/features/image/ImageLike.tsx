import { Button, ConfigProvider } from 'antd';
import { HeartOutlined, HeartFilled } from '@ant-design/icons';
import React from 'react';
import { TImageData } from 'shared/types/image';
import { IconText } from 'shared/components';

type ImageLikeProps = {
  image: TImageData;
};

const ImageLike: React.FC<ImageLikeProps> = ({ image }) => {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  const userId = '1';
  const isLiked = image.likes.userIds.includes(userId);
  const likesCount = image.likes.count;

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

export { ImageLike };
