interface IFileService {
  addText(text: string): void;
  getDownloadLink(): string;
  revokeDownloadLink(): void;
  getFilename(): string;
}

class FileService implements IFileService {
  private fileBlob: Blob;
  private downloadURL: string | null;
  private filename: string;

  constructor(blob: Blob, filename: string) {
    if (blob.type !== 'text/plain') {
      throw 'Неправильный тип файла. Требуется text/plain';
    }
    this.fileBlob = blob;
    this.downloadURL = null;
    this.filename = filename;
  }

  private async getBlobContent(): Promise<string> {
    const text = await this.fileBlob.text();
    return text;
  }

  public addText(text: string): void {
    const updatedContent = this.getBlobContent() + text + '\n';
    this.fileBlob = new Blob([updatedContent], { type: 'text/plain' });
  }

  public getDownloadLink(): string {
    if (!this.downloadURL) {
      this.downloadURL = URL.createObjectURL(this.fileBlob);
    }
    return this.downloadURL;
  }

  public revokeDownloadLink(): void {
    if (this.downloadURL) {
      URL.revokeObjectURL(this.downloadURL);
      this.downloadURL = null;
    }
  }

  public getFilename(): string {
    return this.filename;
  }
}

export { FileService };
export type { IFileService };
