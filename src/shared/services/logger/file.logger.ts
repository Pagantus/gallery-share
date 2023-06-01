import { IFileService } from '../file.service';
import { ILogger } from './logger';

class FileLogger implements ILogger {
  constructor(private fileService: IFileService) {}

  log(message: string): void {
    this.fileService.addText(`[LOG]: ${message}`);
  }

  error(message: string): void {
    this.fileService.addText(`[ERROR]: ${message}`);
  }
}

export { FileLogger };
