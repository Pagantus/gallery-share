import { useServiceContext } from 'app/context/service';
import { useConfiguredMutation, useDelete, useGet, useGetList } from 'shared/lib/hooks/reactQuery';
import { TImageData, TImageDbData } from 'shared/types/image';
import { TPagination, TResponse, TSort } from 'shared/types/server';
import { TUserData } from 'shared/types/user';

const queryKey = 'images';

const useGetImage = (id: TImageData['id']) => {
  const { imageService } = useServiceContext();
  return useGet<TImageData>(queryKey, id, () => imageService.getImageById(id));
};

const useGetImageList = (sort?: TSort, filters?: Partial<TImageDbData>, pagination?: TPagination) => {
  const { imageService } = useServiceContext();
  return useGetList<TResponse<TImageData[]>>(queryKey, { sort, filters, pagination }, () =>
    imageService.getImageList(sort, filters, pagination)
  );
};

const useCreateImage = () => {
  const { imageService } = useServiceContext();
  return useConfiguredMutation<File, TImageData['id']>(queryKey, (file: File, userId: TUserData['id']) =>
    imageService.createImage(file, userId)
  );
};

const useDeleteImage = () => {
  const { imageService } = useServiceContext();
  return useDelete<TImageData['id']>(queryKey, (id: TImageData['id'], filename: TImageData['name']) =>
    imageService.deleteImage(id, filename)
  );
};

export { useGetImage, useGetImageList, useCreateImage, useDeleteImage };
