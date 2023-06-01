import { useServiceContext } from 'app/context/service';
import { useCreate, useDelete, useGet, useGetList, useUpdate } from 'shared/lib/hooks/reactQuery';
import { TResponse } from 'shared/types/server';
import { TUserData, TUserUpdateData } from 'shared/types/user';

const queryKey = 'users';

const useGetUser = (id: TUserData['id']) => {
  const { userService } = useServiceContext();
  return useGet<TUserData>(queryKey, id, () => userService.getUserById(id));
};

const useGetUserList = (params: object) => {
  const { userService } = useServiceContext();
  return useGetList<TResponse<TUserData[]>>(queryKey, params, () => userService.getUserList());
};

const useCreateUser = () => {
  const { userService } = useServiceContext();
  return useCreate<TUserData, TUserData['id']>(queryKey, (userData) => userService.createUser(userData));
};

const useUpdateUser = (id: TUserData['id']) => {
  const { userService } = useServiceContext();
  return useUpdate<TUserUpdateData, TUserData>(queryKey, (userData) => userService.updateUser(id, userData));
};

const useDeleteUser = () => {
  const { userService } = useServiceContext();
  return useDelete<TUserData['id']>(queryKey, (id) => userService.deleteUser(id));
};

export { useGetUser, useGetUserList, useCreateUser, useUpdateUser, useDeleteUser };
