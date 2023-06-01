import { ref } from 'firebase/storage';
import { storage } from 'shared/config/firebase-config';
import { ILogger } from 'shared/services/logger';
import { Storage } from 'shared/services/storage';

class AvatarStorage extends Storage {
  constructor(logger: ILogger) {
    const avatarStorageRef = ref(storage, 'avatars');
    super(avatarStorageRef, logger);
  }
}

export { AvatarStorage };
