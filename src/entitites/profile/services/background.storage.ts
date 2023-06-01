import { ref } from 'firebase/storage';
import { storage } from 'shared/config/firebase-config';
import { ILogger } from 'shared/services/logger';
import { Storage } from 'shared/services/storage';

class BackgroundStorage extends Storage {
  constructor(logger: ILogger) {
    const backgroundStorageRef = ref(storage, 'backgrounds');
    super(backgroundStorageRef, logger);
  }
}

export { BackgroundStorage };
