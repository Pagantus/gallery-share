import { List, Pagination } from 'antd';
import { useServiceContext } from 'app/context/service';
import { PostItem, usePostFilters } from 'entitites/post';
import { useGetPostList } from 'entitites/post';
import { PostCreateForm, PostDeleteButton, PostEditButton, PostLike, PostFilterByContent } from 'features/post';
import React from 'react';
import { EntityListContainer, SortByTime } from 'shared/components';
import { DATE_SORTS } from 'shared/constants/sort';
import { usePagination } from 'shared/lib/hooks/usePagination';
import { useSort } from 'shared/lib/hooks/useSort';

const ViewerPostList: React.FC = () => {
  const { currentPage, pageSize, setCurrentPage, setPageSize } = usePagination();
  const { sort } = useSort();
  const { contentFilter, creatorFilter } = usePostFilters();
  const { authService } = useServiceContext();
  const viewer = { uid: '0dOd3P4MQfVJBFlEtmGuqGGT3wg1' };

  const { data, isLoading } = useGetPostList(DATE_SORTS[sort], { content: contentFilter! }, { currentPage, pageSize });

  const total = React.useMemo(() => {
    if (!data) {
      return;
    }
    return data.total;
  }, [data?.total]);

  const onPagination = (page: number, pageSize: number) => {
    setCurrentPage(page);
    setPageSize(pageSize);
  };

  return (
    <EntityListContainer
      form={
        <PostCreateForm
          recipientId={viewer!.uid}
          creatorId={viewer!.uid}
        />
      }
      filters={[<PostFilterByContent />, <SortByTime />]}
      list={
        <List
          loading={isLoading}
          rowKey={(item) => item.id}
          itemLayout='vertical'
          size='large'
          pagination={{
            current: currentPage,
            onChange: onPagination,
            pageSize,
            total: total
          }}
          dataSource={data?.data}
          renderItem={(post) => {
            const actions = [<PostLike post={post} />];

            if (viewer!.uid === post.creator?.id) {
              actions.push(<PostEditButton />);
            }

            actions.push(<PostDeleteButton />);

            return (
              <PostItem
                {...post}
                actions={actions}
              />
            );
          }}
        />
      }
    />
  );
};

export { ViewerPostList };
