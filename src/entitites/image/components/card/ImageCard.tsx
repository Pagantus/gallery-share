import React from 'react';
import { ConfigProvider, theme, Card } from 'antd';
import { TImageData } from 'shared/types/image';
import { Image } from 'shared/components';

type ImageCardProps = {
  url: TImageData['url'];
  name: TImageData['name'];
  actions: React.ReactNode[];
};

const ImageCard: React.FC<ImageCardProps> = ({ url, name, actions }) => {
  const { token } = theme.useToken();

  return (
    <ConfigProvider theme={{ token: { colorText: token.colorPrimaryActive } }}>
      <Card
        cover={<Image src={url} />}
        actions={actions}>
        <Card.Meta title={name} />
      </Card>
    </ConfigProvider>
  );
};

export { ImageCard };
