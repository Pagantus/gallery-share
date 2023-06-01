import { useServiceContext } from 'app/context/service';
import { useCreate, useDelete, useGet, useGetList, useUpdate } from 'shared/lib/hooks/reactQuery';
import { TPostCreationData, TPostData, TPostDbData, TPostUpdateData } from 'shared/types/post';
import { TPagination, TResponse, TSort } from 'shared/types/server';

const queryKey = 'posts';

const useGetPost = (id: TPostData['id']) => {
  const { postService } = useServiceContext();
  return useGet<TPostData>(queryKey, id, () => postService.getPostById(id));
};

const useGetPostList = (sort?: TSort, filters?: Partial<TPostDbData>, pagination?: TPagination) => {
  const { postService } = useServiceContext();
  return useGetList<TResponse<TPostData[]>>(queryKey, pagination!, () =>
    postService.getPostList(sort, filters, pagination)
  );
};

const useCreatePost = () => {
  const { postService } = useServiceContext();
  return useCreate<TPostCreationData, TPostData['id']>(queryKey, (postData) => postService.createPost(postData));
};

const useUpdatePost = (id: TPostData['id']) => {
  const { postService } = useServiceContext();
  return useUpdate<TPostUpdateData, TPostData>(queryKey, (postData) => postService.updatePost(id, postData));
};

const useDeletePost = () => {
  const { postService } = useServiceContext();
  return useDelete<TPostData['id']>(queryKey, (id) => postService.deletePost(id));
};

export { useGetPost, useGetPostList, useCreatePost, useUpdatePost, useDeletePost };
