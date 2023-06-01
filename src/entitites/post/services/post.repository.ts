import { collection } from 'firebase/firestore';
import { db } from 'shared/config/firebase-config';
import { ILogger } from 'shared/services/logger';
import { Repository } from 'shared/services/repository';
import { TPostDbData } from 'shared/types/post';

class PostRepository extends Repository<TPostDbData> {
  constructor(logger: ILogger) {
    const postCollection = collection(db, 'posts');
    super(postCollection, logger);
  }
}

export { PostRepository };
