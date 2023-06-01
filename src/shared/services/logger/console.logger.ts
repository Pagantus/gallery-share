import { ILogger } from './logger';

class ConsoleLogger implements ILogger {
  log(message: string): void {
    console.log(`[LOG]: ${message}`);
  }

  error(message: string): void {
    console.error(`[ERROR]: ${message}`);
  }
}

export { ConsoleLogger };
