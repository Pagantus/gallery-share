import { AuthProvider, GoogleAuthProvider, signInWithPopup, User } from 'firebase/auth';
import { auth } from 'shared/config/firebase-config';
import { TSocial } from 'shared/types/auth';

interface ISocialAuthService {
  login(): Promise<User>;
}

class AuthProviderFactory {
  static createProvider(social: string): AuthProvider {
    if (social === 'google') {
      return new GoogleAuthProvider();
    } else {
      throw `Неизвестный провайдер авторизации: ${social}`;
    }
  }
}

class SocialAuthService implements ISocialAuthService {
  private provider;
  constructor(social: TSocial) {
    this.provider = AuthProviderFactory.createProvider(social);
  }
  public async login(): Promise<User> {
    const result = await signInWithPopup(auth, this.provider);
    const { user } = result;
    return user;
  }
}

export { SocialAuthService };
