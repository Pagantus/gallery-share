import { useServiceContext } from 'app/context/service';
import { useCreate, useDelete, useGet, useGetList, useUpdate } from 'shared/lib/hooks/reactQuery';
import { TProfileCreationData, TProfileData, TProfileUpdateData } from 'shared/types/profile';
import { TResponse } from 'shared/types/server';

const queryKey = 'profiles';

const useGetProfile = (id: TProfileData['id']) => {
  const { profileService } = useServiceContext();
  return useGet<TProfileData>(queryKey, id, () => profileService.getProfileById(id));
};

const useGetProfileList = (params: object) => {
  const { profileService } = useServiceContext();
  return useGetList<TResponse<TProfileData[]>>(queryKey, params, () => profileService.getProfileList());
};

const useCreateProfile = () => {
  const { profileService } = useServiceContext();
  return useCreate<TProfileCreationData, TProfileData['id']>(queryKey, (profileData) =>
    profileService.createProfile(profileData)
  );
};

const useUpdateProfile = (id: TProfileData['id']) => {
  const { profileService } = useServiceContext();
  return useUpdate<TProfileUpdateData, TProfileData>(queryKey, (profileData) =>
    profileService.updateProfile(id, profileData)
  );
};

const useDeleteProfile = () => {
  const { profileService } = useServiceContext();
  return useDelete<TProfileData['id']>(queryKey, (id) => profileService.deleteProfile(id));
};

export { useGetProfile, useGetProfileList, useCreateProfile, useUpdateProfile, useDeleteProfile };
