import { deleteObject, getDownloadURL, ref, StorageReference, uploadBytes } from 'firebase/storage';
import { v4 as uuid } from 'uuid';
import { ILogger } from './logger';

interface IStorage {
  getFileUrl(filename: string): Promise<string>;
  uploadFile(file: File): Promise<{ filename: string; downloadURL: string }>;
  deleteFile(filename: string): Promise<void>;
}

class Storage implements IStorage {
  constructor(private storageRef: StorageReference, private logger: ILogger) {}

  public async getFileUrl(filename: string): Promise<string> {
    try {
      const fileRef = ref(this.storageRef, filename);
      const url = await getDownloadURL(fileRef);
      return url;
    } catch (e) {
      this.logger.error(`Произошла ошибка при получения файла: ${e}`);
      throw e;
    }
  }

  public async uploadFile(file: File): Promise<{ filename: string; downloadURL: string }> {
    try {
      const filename = `${file.name}${uuid()}`;
      const fileRef = ref(this.storageRef, filename);
      await uploadBytes(fileRef, file);

      const downloadURL = await getDownloadURL(fileRef);
      return { filename, downloadURL };
    } catch (e) {
      this.logger.error(`Произошла ошибка при загрузке файла: ${e}`);
      throw e;
    }
  }

  public async deleteFile(filename: string): Promise<void> {
    try {
      const fileRef = ref(this.storageRef, filename);
      await deleteObject(fileRef);
    } catch (e) {
      this.logger.error(`Произошла ошибка при удалении файла: ${e}`);
      throw e;
    }
  }
}

export { Storage };
