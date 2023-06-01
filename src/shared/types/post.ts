import { Timestamp } from 'firebase/firestore';
import { TLikes } from './likes';
import { TProfileData } from './profile';
import { TUserData } from './user';

type TPostDbData = {
  id: string;
  content: string;
  creatorId: TUserData['id'];
  recipientId: TUserData['id'];
  likes: TLikes;
  createdAt: Timestamp;
};

type TPostData = {
  id: string;
  content: string;
  avatar: TProfileData['avatar'];
  creator: Nullable<TUserData>;
  recipientId: TUserData['id'];
  likes: TLikes;
  createdAt: Timestamp;
};

type TPostCreationData = {
  content: string;
  creatorId: TUserData['id'];
  recipientId: TUserData['id'];
};

type TPostUpdateData = Partial<{
  content: string;
  likes: TLikes;
}>;

export type { TPostDbData, TPostData, TPostCreationData, TPostUpdateData };
