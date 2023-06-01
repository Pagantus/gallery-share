import { Image as AntImage } from 'antd';
import { EyeOutlined } from '@ant-design/icons';
import React from 'react';
import fallback from '../assets/fallback.png';

type ImageProps = {
  src: string;
};

const Image: React.FC<ImageProps> = ({ src }) => {
  return (
    <AntImage
      style={{ aspectRatio: 1, objectFit: 'cover' }}
      src={src}
      fallback={fallback}
      preview={{
        mask: (
          <>
            <EyeOutlined />
            &nbsp;Просмотр
          </>
        )
      }}
    />
  );
};

export { Image };
