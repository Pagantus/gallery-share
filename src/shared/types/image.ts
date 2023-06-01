import { FieldValue, Timestamp } from 'firebase/firestore';
import { TLikes } from './likes';
import { TUserData } from './user';

type ImageTheme = 'nature' | 'animals' | 'people' | 'cities' | 'food' | 'tech' | 'science' | 'art' | 'sport' | 'other';

type TImageDbData = {
  id: string;
  name: string;
  url: string;
  createdAt: Timestamp;
  userId: TUserData['id'];
  theme: ImageTheme;
  likes: TLikes;
};

type TImageData = {
  id: string;
  name: string;
  url: string;
  createdAt: Timestamp;
  user: Nullable<TUserData>;
  theme: ImageTheme;
  likes: TLikes;
};

type TImageCreationData = {
  name: string;
  userId: TUserData['id'];
  theme: ImageTheme;
};

type TImageUpdateData = Partial<{
  name: string;
  theme: ImageTheme;
  likes: TLikes;
}>;

export type { TImageDbData, TImageData, TImageCreationData, TImageUpdateData, ImageTheme };
