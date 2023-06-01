import { useMutation } from '@tanstack/react-query';
import { useQueryClient } from '@tanstack/react-query';
import { useQuery } from '@tanstack/react-query';

const useGet = <T>(key: string, id: string, func: () => Promise<Nullable<T>>) => {
  return useQuery([key, id], func);
};

const useGetList = <T>(key: string, params: object, func: () => Promise<T>) => {
  return useQuery([key, 'list', params], func);
};

const useCreate = <T, S>(key: string, func: (data: T) => Promise<S>) => {
  return useConfiguredMutation<T, S>(key, func);
};

const useUpdate = <T, S>(key: string, func: (data: T) => Promise<S>) => {
  return useConfiguredMutation<T, S>(key, func);
};

const useDelete = <T>(key: string, func: (id: T, ...args: any) => Promise<void>) => {
  return useConfiguredMutation<T, void>(key, func);
};

const useConfiguredMutation = <T, S>(key: string, func: (data: T, ...args: any) => Promise<S>) => {
  const queryClient = useQueryClient();
  return useMutation<S, Error, T>(func, {
    onSettled: () => {
      queryClient.invalidateQueries([key]);
    }
  });
};

export { useGet, useGetList, useCreate, useUpdate, useDelete, useConfiguredMutation };
