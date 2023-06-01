type TUserData = {
  id: string;
  username: string;
  email: Nullable<string>;
};

type TUserUpdateData = Partial<{
  username: string;
  email: Nullable<string>;
}>;

export type { TUserData, TUserUpdateData };
