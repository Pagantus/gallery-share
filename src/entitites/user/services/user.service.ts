import { ProfileAPI } from 'entitites/profile';
import { ILogger } from 'shared/services/logger';
import { TPagination, TResponse, TSort } from 'shared/types/server';
import { TUserData, TUserUpdateData } from 'shared/types/user';
import { UserRepository } from './user.repository';

interface UserAPI {
  getUserById(userId: TUserData['id']): Promise<TUserData | null>;
  getUserList(sort?: TSort, filters?: Partial<TUserData>, pagination?: TPagination): Promise<TResponse<TUserData[]>>;
  createUser(userData: Omit<TUserData, 'id'>, id?: Nullable<TUserData['id']>): Promise<TUserData['id']>;
  updateUser(userId: TUserData['id'], userData: TUserUpdateData): Promise<TUserData>;
  deleteUser(userId: TUserData['id']): Promise<void>;
}

class UserService implements UserAPI {
  private userRepository;

  constructor(logger: ILogger) {
    this.userRepository = new UserRepository(logger);
  }

  public async getUserById(userId: TUserData['id']): Promise<TUserData | null> {
    const userData = await this.userRepository.getEntityById(userId);
    return userData;
  }

  public async getUserList(
    sort?: TSort,
    filters?: Partial<TUserData>,
    pagination?: TPagination
  ): Promise<TResponse<TUserData[]>> {
    const { data, total } = await this.userRepository.getEntityList(sort, filters, pagination);
    return { data, total };
  }

  public async createUser(userData: Omit<TUserData, 'id'>, id: Nullable<TUserData['id']> = null): Promise<string> {
    const userId = await this.userRepository.createEntity(userData, id);
    return userId;
  }

  public async updateUser(userId: TUserData['id'], userData: TUserUpdateData): Promise<TUserData> {
    const userUpdatedData = await this.userRepository.updateEntity(userId, userData);
    return userUpdatedData;
  }

  public async deleteUser(userId: TUserData['id']): Promise<void> {
    await this.userRepository.deleteEntity(userId);
  }
}

export { UserService };
export type { UserAPI };
