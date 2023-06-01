import { ref } from 'firebase/storage';
import { storage } from 'shared/config/firebase-config';
import { ILogger } from 'shared/services/logger';
import { Storage } from 'shared/services/storage';

class ImageStorage extends Storage {
  constructor(logger: ILogger) {
    const imageStorageRef = ref(storage, 'images');
    super(imageStorageRef, logger);
  }
}

export { ImageStorage };
