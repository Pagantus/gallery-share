import {
  addDoc,
  CollectionReference,
  deleteDoc,
  doc,
  DocumentData,
  getDoc,
  getDocs,
  limit,
  orderBy,
  query,
  setDoc,
  getCountFromServer,
  updateDoc,
  where,
  QueryDocumentSnapshot,
  startAfter
} from 'firebase/firestore';
import { createQueryFilters } from 'shared/lib/utils/createQueryFilters';
import { TPagination, TResponse, TSort } from 'shared/types/server';
import { ILogger } from './logger';

interface IRepository<T extends { id: string }> {
  getEntityById(id: T['id']): Promise<Nullable<T>>;
  getEntityByFilter(filterName: string, filterValue: any): Promise<Nullable<T>>;
  getEntityList(sort?: TSort, filters?: Partial<T>, pagination?: TPagination): Promise<TResponse<T[]>>;
  createEntity(data: Omit<T, 'id'>, id: Nullable<T['id']>): Promise<T['id']>;
  updateEntity(id: T['id'], data: Partial<T>): Promise<T>;
  deleteEntity(id: T['id']): Promise<void>;
}

class Repository<T extends { id: string }> implements IRepository<T> {
  constructor(private collection: CollectionReference<DocumentData>, private logger: ILogger) {
    this.lastVisibleDoc = null;
  }

  protected lastVisibleDoc: QueryDocumentSnapshot<DocumentData> | null;

  public async getEntityById(id: T['id']): Promise<Nullable<T>> {
    try {
      const entityCollection = doc(this.collection, id);
      const entityDoc = await getDoc(entityCollection);
      if (entityDoc.exists()) {
        const data = entityDoc.data();
        return { id: entityDoc.id, ...data } as T;
      } else {
        return null;
      }
    } catch (e) {
      this.logger.error(`Произошла ошибка при получении сущности коллекции ${this.collection.id}: ${e}`);
      throw e;
    }
  }

  public async getEntityByFilter(filterName: string, filterValue: any): Promise<T | null> {
    try {
      const q = query(this.collection, where(filterName, '==', filterValue));
      const querySnapshot = await getDocs(q);
      if (!querySnapshot.empty) {
        const entityDoc = querySnapshot.docs[0];
        const data = entityDoc.data();
        return { id: entityDoc.id, ...data } as T;
      } else {
        return null;
      }
    } catch (e) {
      this.logger.error(`Произошла ошибка при получении сущности коллекции ${this.collection.id}: ${e}`);
      throw e;
    }
  }

  public async getEntityList(sort?: TSort, filters?: Partial<T>, pagination?: TPagination): Promise<TResponse<T[]>> {
    try {
      const { field, type } = sort ? sort : ({ field: 'createdAt', type: 'desc' } as const);
      const { currentPage, pageSize } = pagination ? pagination : { pageSize: 10, currentPage: 1 };

      console.log(this.lastVisibleDoc);

      const total = (await getCountFromServer(this.collection)).data().count;

      let postQuery = query(this.collection);

      if (filters) {
        const queryFilters = createQueryFilters<Partial<T>>(filters);
        postQuery = query(postQuery, ...queryFilters);
      }

      postQuery = query(postQuery, orderBy(field, type));

      const offset = (currentPage - 1) * pageSize;

      if (offset > 0) {
        postQuery = query(postQuery, limit(pageSize), startAfter(this.lastVisibleDoc));
      } else {
        postQuery = query(postQuery, limit(pageSize));
      }

      const snapshot = await getDocs(postQuery);

      const lastVisibleDoc = snapshot.docs.at(-1);

      if (!!lastVisibleDoc) {
        this.lastVisibleDoc = lastVisibleDoc;
      }

      const datas = snapshot.docs.map<T>((doc) => {
        const data = doc.data();
        return {
          id: doc.id,
          ...data
        } as T;
      });

      return { data: datas, total };
    } catch (e) {
      this.logger.error(`Произошла ошибка при получении списка коллекции ${this.collection.id}: ${e}`);
      throw e;
    }
  }

  public async createEntity(data: Omit<T, 'id'>, id: Nullable<T['id']> = null): Promise<T['id']> {
    try {
      if (id) {
        await setDoc(doc(this.collection, id), data);
        return id;
      } else {
        const entityDoc = await addDoc(this.collection, data);
        return entityDoc.id;
      }
    } catch (e) {
      this.logger.error(`Произошла ошибка при создании сущности коллекции ${this.collection.id}: ${e}`);
      throw e;
    }
  }

  public async updateEntity(id: T['id'], data: Partial<T>): Promise<T> {
    try {
      const entityCollection = doc(this.collection, id);
      await updateDoc(entityCollection, data as DocumentData);
      const entity = await this.getEntityById(id);
      return entity!;
    } catch (e) {
      this.logger.error(`Произошла ошибка при обновлении сущности коллекции ${this.collection.id}: ${e}`);
      throw e;
    }
  }

  public async deleteEntity(id: T['id']): Promise<void> {
    try {
      const entityCollection = doc(this.collection, id);
      await deleteDoc(entityCollection);
    } catch (e) {
      this.logger.error(`Произошла ошибка при удалении сущности коллекции ${this.collection.id}: ${e}`);
      throw e;
    }
  }
}

export { Repository };
