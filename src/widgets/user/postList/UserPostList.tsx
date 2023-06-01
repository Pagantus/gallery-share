import { List } from 'antd';
import { PostItem } from 'entitites/post';
import { PostDeleteButton, PostEditButton, PostLike } from 'features/post';
import React from 'react';
import { usePagination } from 'shared/lib/hooks/usePagination';
import { TPostData } from 'shared/types/post';
import { TUserData } from 'shared/types/user';

type PostListProps = {
  posts: TPostData[];
  viewerId: TUserData['id'];
};

const UserPostList: React.FC<PostListProps> = ({ posts, viewerId }) => {
  const { currentPage, pageSize, setCurrentPage, setPageSize } = usePagination();

  const onPagination = (page: number, pageSize: number) => {
    setCurrentPage(page);
    setPageSize(pageSize);
  };

  return (
    <List
      rowKey={(item) => item.id}
      itemLayout='vertical'
      size='large'
      pagination={{
        current: currentPage,
        onChange: onPagination,
        pageSize
      }}
      dataSource={posts}
      renderItem={(post) => {
        const actions = [<PostLike post={post} />];

        if (viewerId === post.creator?.id) {
          actions.push(<PostEditButton />, <PostDeleteButton />);
        }

        return (
          <PostItem
            {...post}
            actions={actions}
          />
        );
      }}
    />
  );
};

export { UserPostList };
