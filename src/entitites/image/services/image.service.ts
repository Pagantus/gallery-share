import { UserAPI } from 'entitites/user';
import { Timestamp } from 'firebase/firestore';
import { ILogger } from 'shared/services/logger';
import { TImageDbData, TImageData } from 'shared/types/image';
import { TPagination, TResponse, TSort } from 'shared/types/server';
import { TUserData } from 'shared/types/user';
import { ImageRepository } from './image.repository';
import { ImageStorage } from './image.storage';

interface ImageAPI {
  getImageById(imageId: TImageData['id']): Promise<Nullable<TImageData>>;
  getImageList(sort?: TSort, filters?: Partial<TImageData>, pagination?: TPagination): Promise<TResponse<TImageData[]>>;
  createImage(image: File, userId: TUserData['id']): Promise<TImageData['id']>;
  deleteImage(imageId: TImageData['id'], filename: TImageData['name']): Promise<void>;
}

class ImageService implements ImageAPI {
  private imageRepository;
  private imageStorage;
  private userService;

  constructor(logger: ILogger, userService: UserAPI) {
    this.imageRepository = new ImageRepository(logger);
    this.imageStorage = new ImageStorage(logger);
    this.userService = userService;
  }

  private async getImageWithUser(imageData: Nullable<TImageDbData>): Promise<Nullable<TImageData>> {
    if (!imageData) {
      return imageData;
    }
    const user = await this.userService.getUserById(imageData.userId);
    return { ...imageData, user };
  }

  public async getImageById(imageId: TImageData['id']): Promise<Nullable<TImageData>> {
    const imageData = await this.imageRepository.getEntityById(imageId);
    const imageWithUser = await this.getImageWithUser(imageData);
    return imageWithUser;
  }

  public async getImageList(
    sort?: TSort,
    filters?: Partial<TImageData>,
    pagination?: TPagination
  ): Promise<TResponse<TImageData[]>> {
    const { data, total } = await this.imageRepository.getEntityList(sort, filters, pagination);
    const imageListWithUser: TImageData[] = [];
    for (const imageData of data) {
      const imageWithUser = await this.getImageWithUser(imageData);
      imageListWithUser.push(imageWithUser!);
    }

    return { data: imageListWithUser, total };
  }

  public async createImage(image: File, userId: TUserData['id']): Promise<TImageData['id']> {
    const { filename, downloadURL } = await this.imageStorage.uploadFile(image);
    const imageId = await this.imageRepository.createEntity({
      createdAt: Timestamp.now(),
      name: filename,
      url: downloadURL,
      userId,
      theme: 'other',
      likes: {
        count: 0,
        userIds: []
      }
    });
    return imageId;
  }

  public async deleteImage(imageId: TImageData['id'], filename: string): Promise<void> {
    await this.imageStorage.deleteFile(filename);
    await this.imageRepository.deleteEntity(imageId);
  }
}

export { ImageService };
export type { ImageAPI };
