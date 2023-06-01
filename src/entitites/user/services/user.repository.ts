import { collection } from 'firebase/firestore';
import { db } from 'shared/config/firebase-config';
import { ILogger } from 'shared/services/logger';
import { Repository } from 'shared/services/repository';
import { TUserData } from 'shared/types/user';

class UserRepository extends Repository<TUserData> {
  constructor(logger: ILogger) {
    const userCollection = collection(db, 'users');
    super(userCollection, logger);
  }
}

export { UserRepository };
