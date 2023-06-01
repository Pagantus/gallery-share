import { Col, Pagination, Row } from 'antd';
import { ImageFilterByTheme, ImageLike } from 'features/image';
import React from 'react';
import { ImageTheme, TImageData } from 'shared/types/image';
import { useImageFilters } from 'entitites/image';
import { ImageCard } from 'entitites/image';
import { EntityListContainer } from 'shared/components';
import { useGetImageList } from 'entitites/image/api';
import { DATE_SORTS } from 'shared/constants/sort';
import { useSort } from 'shared/lib/hooks/useSort';
import { usePagination } from 'shared/lib/hooks/usePagination';
import { SortByTime } from 'shared/components';

const ImageGallery: React.FC = () => {
  const { currentPage, pageSize, setCurrentPage, setPageSize } = usePagination();
  const { theme } = useImageFilters();
  const { sort } = useSort();

  const { data } = useGetImageList(DATE_SORTS[sort], { theme: theme as ImageTheme }, { currentPage, pageSize });

  const onPagination = (page: number, pageSize: number) => {
    setCurrentPage(page);
    setPageSize(pageSize);
  };

  return (
    <EntityListContainer
      filters={[<ImageFilterByTheme />, <SortByTime />]}
      list={
        <Row gutter={[16, 16]}>
          {data?.data.map((image) => (
            <Col
              span={8}
              key={image.id}>
              <ImageCard
                name={image.name}
                url={image.url}
                actions={[<ImageLike image={image} />]}
              />
            </Col>
          ))}
        </Row>
      }
      pagination={
        <Pagination
          onChange={onPagination}
          current={currentPage}
          pageSize={pageSize}
          total={data?.total}
        />
      }
    />
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
  },
  {
    id: '5',
    name: 'culpa odio esse rerum omnis laboriosam voluptate repudiandae',
    url: 'https://via.placeholder.com/600/d32776',
    createdAt: {} as any,
    user: {} as any,
    theme: 'people',
    likes: { count: 1, userIds: ['1'] }
  },
  {
    id: '6',
    name: 'culpa odio esse rerum omnis laboriosam voluptate repudiandae',
    url: 'https://via.placeholder.com/600/d32776',
    createdAt: {} as any,
    user: {} as any,
    theme: 'people',
    likes: { count: 1, userIds: ['1'] }
  },
  {
    id: '7',
    name: 'culpa odio esse rerum omnis laboriosam voluptate repudiandae',
    url: 'https://via.placeholder.com/600/d32776',
    createdAt: {} as any,
    user: {} as any,
    theme: 'animals',
    likes: { count: 1, userIds: ['1'] }
  }
];
export { ImageGallery };
