import { Card, Col, Row, Typography } from 'antd';
import React from 'react';
import { Image } from 'shared/components';
import { TImageData } from 'shared/types/image';

type ProfileGalleryProps = {
  // images: TImageData[];
};

const ProfileGallery: React.FC<ProfileGalleryProps> = () => {
  return (
    <Card title='Фотографии'>
      <Row gutter={[8, 0]}>
        {images.map((image) => (
          <Col
            key={image.id}
            span={6}>
            <Image src={image.url} />
          </Col>
        ))}
      </Row>
    </Card>
  );
};

const images: TImageData[] = [
  {
    id: '1',
    name: 'accusamus beatae ad facilis cum similique qui sunt',
    url: 'https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg',
    createdAt: {} as any,
    user: {} as any,
    theme: 'people',
    likes: { count: 1, userIds: ['1'] }
  },
  {
    id: '2',
    name: 'reprehenderit est deserunt velit ipsam',
    url: 'https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8aHVtYW58ZW58MHx8MHx8&w=1000&q=80',
    createdAt: {} as any,
    user: {} as any,
    theme: 'people',
    likes: { count: 1, userIds: ['1'] }
  },
  {
    id: '3',
    name: 'officia porro iure quia iusto qui ipsa ut modi',
    url: 'https://images.pexels.com/photos/268533/pexels-photo-268533.jpeg?cs=srgb&dl=pexels-pixabay-268533.jpg&fm=jpg',
    createdAt: {} as any,
    user: {} as any,
    theme: 'people',
    likes: { count: 1, userIds: ['1'] }
  },
  {
    id: '4',
    name: 'culpa odio esse rerum omnis laboriosam voluptate repudiandae',
    url: 'https://via.placeholder.com/600/d32776',
    createdAt: {} as any,
    user: {} as any,
    theme: 'people',
    likes: { count: 1, userIds: ['1'] }
  }
];
export { ProfileGallery };
