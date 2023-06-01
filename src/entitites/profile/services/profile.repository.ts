import { collection } from 'firebase/firestore';
import { db } from 'shared/config/firebase-config';
import { ILogger } from 'shared/services/logger';
import { Repository } from 'shared/services/repository';
import { TProfileDbData } from 'shared/types/profile';

class ProfileRepository extends Repository<TProfileDbData> {
  constructor(logger: ILogger) {
    const profileCollection = collection(db, 'profiles');
    super(profileCollection, logger);
  }
}

export { ProfileRepository };
