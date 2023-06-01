import { ProfileHeader } from 'entitites/profile';
import { AddUserButton } from 'features/user';
import React from 'react';
import { TUserData } from 'shared/types/user';

type ViewerHeaderProps = {
  userId: TUserData['id'];
};

const UserHeader: React.FC<ViewerHeaderProps> = ({ userId }) => {
  //useGetUser(userId)
  return (
    <ProfileHeader
      avatar={{ filename: '', url: 'https://static.1tv.ru/uploads/photo/image/2/huge/4062_huge_876c41f50e.jpg' }}
      background={'https://cdn.futura-sciences.com/sources/images/dossier/773/01-intro-773.jpg'}
      status={'Olololo'}
      username={'Yoda'}
      backgroundActions={[]}
      profileActions={[<AddUserButton />]}
    />
  );
};

export { UserHeader };
