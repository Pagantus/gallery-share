import { UserAPI } from 'entitites/user';
import { ILogger } from 'shared/services/logger';
import { TProfileDbData, TProfileData, TProfileCreationData, TProfileUpdateData } from 'shared/types/profile';
import { TPagination, TResponse, TSort } from 'shared/types/server';
import { TUserData } from 'shared/types/user';
import { ProfileRepository } from './profile.repository';

interface ProfileAPI {
  getProfileById(profileId: TProfileData['id']): Promise<Nullable<TProfileData>>;
  getProfileByUserId(profileId: TProfileData['id']): Promise<Nullable<TProfileData>>;
  getProfileList(
    sort?: TSort,
    filters?: Partial<TProfileData>,
    pagination?: TPagination
  ): Promise<TResponse<TProfileData[]>>;
  createProfile(profileData: TProfileCreationData, id?: Nullable<TProfileData['id']>): Promise<TProfileData['id']>;
  updateProfile(profileId: TProfileData['id'], profileData: TProfileUpdateData): Promise<TProfileData>;
  deleteProfile(profileId: TProfileData['id']): Promise<void>;
}

class ProfileService implements ProfileAPI {
  private profileRepository;
  private userService;

  constructor(logger: ILogger, userService: UserAPI) {
    this.profileRepository = new ProfileRepository(logger);
    this.userService = userService;
  }

  private async getProfileWithUser(profileData: Nullable<TProfileDbData>): Promise<Nullable<TProfileData>> {
    if (!profileData) {
      return profileData;
    }
    const user = await this.userService.getUserById(profileData.userId);
    return { ...profileData, user };
  }

  public async getProfileById(profileId: TProfileData['id']): Promise<Nullable<TProfileData>> {
    const profileData = await this.profileRepository.getEntityById(profileId);
    const profileWithUser = await this.getProfileWithUser(profileData);
    return profileWithUser;
  }

  public async getProfileByUserId(userId: TUserData['id']): Promise<Nullable<TProfileData>> {
    const profileData = await this.profileRepository.getEntityByFilter('userId', userId);
    const profileWithUser = await this.getProfileWithUser(profileData);
    return profileWithUser;
  }

  public async getProfileList(
    sort?: TSort,
    filters?: Partial<TProfileData>,
    pagination?: TPagination
  ): Promise<TResponse<TProfileData[]>> {
    const { data, total } = await this.profileRepository.getEntityList(sort, filters, pagination);
    const imageListWithUser: TProfileData[] = [];
    for (const profileData of data) {
      const profileWithUser = await this.getProfileWithUser(profileData);
      imageListWithUser.push(profileWithUser!);
    }

    return { data: imageListWithUser, total };
  }

  public async createProfile(
    profileData: TProfileCreationData,
    id: Nullable<TProfileData['id']> = null
  ): Promise<TProfileData['id']> {
    const profileId = await this.profileRepository.createEntity(
      {
        avatar: null,
        background: null,
        status: null,
        settings: { loggers: ['console', 'file'], theme: 'light' },
        ...profileData
      },
      id
    );
    return profileId;
  }

  public async updateProfile(profileId: TProfileData['id'], profileData: TProfileUpdateData): Promise<TProfileData> {
    const profileUpdatedData = await this.profileRepository.updateEntity(profileId, profileData);
    const profileWithUser = await this.getProfileWithUser(profileUpdatedData);
    return profileWithUser!;
  }

  public async deleteProfile(profileId: TProfileData['id']): Promise<void> {
    await this.profileRepository.deleteEntity(profileId);
  }
}

export { ProfileService };
export type { ProfileAPI };
