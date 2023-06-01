import { TUserData } from './user';

type TLikes = {
  userIds: TUserData['id'][];
  count: number;
};

export type { TLikes };
