import { ProfileAPI } from 'entitites/profile';
import { UserAPI } from 'entitites/user';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, User } from 'firebase/auth';
import { auth } from 'shared/config/firebase-config';
import { ILogger } from 'shared/services/logger';
import { TSocial } from 'shared/types/auth';
import { SocialAuthService } from './social-auth.service';

interface AuthAPI {
  register(email: string, password: string): Promise<void>;
  loginWithEmailAndPassword(email: string, password: string): Promise<void>;
  authWithSocial(social: TSocial): Promise<void>;
  logout(): Promise<void>;
  getUser(): Nullable<User>;
  deleteAccount(): Promise<void>;
}

class AuthService implements AuthAPI {
  constructor(private logger: ILogger, private userService: UserAPI, private profileService: ProfileAPI) {}

  private async createUserWithProfile(user: User, email?: string): Promise<void> {
    const userId = await this.userService.createUser(
      {
        email: email ?? user.email,
        username: user.displayName ?? `Пользователь #${user.uid}`
      },
      user.uid
    );
    await this.profileService.createProfile({ userId });
  }

  public async register(email: string, password: string): Promise<void> {
    try {
      const result = await createUserWithEmailAndPassword(auth, email, password);
      const { user } = result;
      this.createUserWithProfile(user, email);
    } catch (e) {
      this.logger.error(`Ошибка при регистрации: ${e}`);
      throw e;
    }
  }

  public async loginWithEmailAndPassword(email: string, password: string): Promise<void> {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (e) {
      this.logger.error(`Ошибка при авторизации: ${e}`);
      throw e;
    }
  }

  public async authWithSocial(social: TSocial): Promise<void> {
    try {
      const authSocialService = new SocialAuthService(social);
      const user = await authSocialService.login();
      const isUserExists = !!this.userService.getUserById(user.uid);
      if (!isUserExists) {
        await this.createUserWithProfile(user);
      }
    } catch (e) {
      this.logger.error(`Ошибка при авторизации через ${social}: ${e}`);
      throw e;
    }
  }

  public async logout(): Promise<void> {
    try {
      await signOut(auth);
    } catch (e) {
      this.logger.error(`Ошибка при выходе из аккаунта: ${e}`);
      throw e;
    }
  }

  public getUser(): Nullable<User> {
    try {
      const user = auth.currentUser;
      return user;
    } catch (e) {
      this.logger.error(`Ошибка при получении текущего пользователя: ${e}`);
      throw e;
    }
  }

  public async deleteAccount(): Promise<void> {}
}

export type { AuthAPI };
export { AuthService };
