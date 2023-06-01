import { collection } from 'firebase/firestore';
import { db } from 'shared/config/firebase-config';
import { ILogger } from 'shared/services/logger';
import { Repository } from 'shared/services/repository';
import { TImageDbData } from 'shared/types/image';

class ImageRepository extends Repository<TImageDbData> {
  constructor(logger: ILogger) {
    const imageCollection = collection(db, 'images');
    super(imageCollection, logger);
  }
}

export { ImageRepository };
