import { ProfileHeader } from 'entitites/profile';
import { EditBackgroundButton, EditProfileButton, EditSettingsButton } from 'features/viewer';
import React from 'react';
import { TUserData } from 'shared/types/user';

type ViewerHeaderProps = {
  userId: TUserData['id'];
};

const ViewerHeader: React.FC<ViewerHeaderProps> = ({ userId }) => {
  //useGetUser(userId)
  return (
    <ProfileHeader
      avatar={{ filename: '', url: 'https://static.1tv.ru/uploads/photo/image/2/huge/4062_huge_876c41f50e.jpg' }}
      background={'https://cdn.futura-sciences.com/sources/images/dossier/773/01-intro-773.jpg'}
      status={'Good Morning'}
      username={'Kopatych'}
      backgroundActions={[<EditBackgroundButton key='background' />]}
      profileActions={[<EditProfileButton key='profile' />, <EditSettingsButton key='settings' />]}
    />
  );
};

export { ViewerHeader };
