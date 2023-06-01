import { ProfileService } from 'entitites/profile';
import { UserAPI } from 'entitites/user';
import { Timestamp } from 'firebase/firestore';
import { ILogger } from 'shared/services/logger';
import { TPostDbData, TPostData, TPostCreationData, TPostUpdateData } from 'shared/types/post';
import { TPagination, TResponse, TSort } from 'shared/types/server';
import { PostRepository } from './post.repository';

interface PostAPI {
  getPostById(postId: TPostData['id']): Promise<TPostData | null>;
  getPostList(sort?: TSort, filters?: Partial<TPostDbData>, pagination?: TPagination): Promise<TResponse<TPostData[]>>;
  createPost(postData: TPostCreationData, id?: Nullable<TPostData['id']>): Promise<TPostData['id']>;
  updatePost(postId: TPostData['id'], postData: TPostUpdateData): Promise<TPostData>;
  deletePost(postId: TPostData['id']): Promise<void>;
}

class PostService implements PostAPI {
  private postRepository;
  private userService;
  private profileService;

  constructor(logger: ILogger, userService: UserAPI, profileService: ProfileService) {
    this.postRepository = new PostRepository(logger);
    this.userService = userService;
    this.profileService = profileService;
  }

  private async getPostWithCreator(postData: Nullable<TPostDbData>): Promise<Nullable<TPostData>> {
    if (!postData) {
      return postData;
    }
    const creator = await this.userService.getUserById(postData.creatorId);
    const profile = creator ? await this.profileService.getProfileByUserId(creator.id) : null;
    const avatar = profile ? profile.avatar : null;
    return { ...postData, creator, avatar };
  }

  public async getPostById(postId: TPostData['id']): Promise<TPostData | null> {
    const postData = await this.postRepository.getEntityById(postId);
    const postWithCreator = await this.getPostWithCreator(postData);
    return postWithCreator;
  }

  public async getPostList(
    sort?: TSort,
    filters?: Partial<TPostDbData>,
    pagination?: TPagination
  ): Promise<TResponse<TPostData[]>> {
    const { data, total } = await this.postRepository.getEntityList(sort, filters, pagination);

    const postListWithUser: TPostData[] = [];
    for (const postData of data) {
      const postWithCreator = await this.getPostWithCreator(postData);
      postListWithUser.push(postWithCreator!);
    }

    return { data: postListWithUser, total };
  }

  public async createPost(postData: TPostCreationData, id: Nullable<TPostData['id']> = null): Promise<string> {
    const postId = await this.postRepository.createEntity(
      { ...postData, likes: { count: 0, userIds: [] }, createdAt: Timestamp.now() },
      id
    );
    return postId;
  }

  public async updatePost(postId: TPostData['id'], postData: TPostUpdateData): Promise<TPostData> {
    const postUpdatedData = await this.postRepository.updateEntity(postId, postData);
    const postWithCreator = await this.getPostWithCreator(postUpdatedData);
    return postWithCreator!;
  }

  public async deletePost(postId: TPostData['id']): Promise<void> {
    await this.postRepository.deleteEntity(postId);
  }
}

export { PostService };
export type { PostAPI };
