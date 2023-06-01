import { TAvatar } from './avatar';
import { TSettings } from './settings';
import { TUserData } from './user';

type TProfileDbData = {
  id: string;
  avatar: Nullable<TAvatar>;
  background: Nullable<string>;
  status: Nullable<string>;
  userId: TUserData['id'];
  settings: TSettings;
};

type TProfileData = {
  id: string;
  avatar: Nullable<TAvatar>;
  background: Nullable<string>;
  status: Nullable<string>;
  user: Nullable<TUserData>;
  settings: TSettings;
};

type TProfileCreationData = {
  userId: TUserData['id'];
};

type TProfileUpdateData = Partial<{
  avatar: Nullable<TAvatar>;
  background: Nullable<string>;
  status: string;
  settings: TSettings;
}>;

export type { TProfileDbData, TProfileData, TProfileCreationData, TProfileUpdateData };
