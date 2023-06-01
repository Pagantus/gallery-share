interface ILogger {
  log(message: string): void;
  error(message: string): void;
}

class Logger implements ILogger {
  private outputs;

  constructor(outputs: ILogger[]) {
    this.outputs = outputs;
  }

  addOutput(instance: ILogger): void {
    this.outputs.push(instance);
  }

  removeOutput(instance: ILogger): void {
    const index = this.outputs.indexOf(instance);
    if (index !== -1) {
      this.outputs.splice(index, 1);
    }
  }

  log(message: string): void {
    this.outputs.forEach((instance) => {
      instance.log(message);
    });
  }

  error(message: string): void {
    this.outputs.forEach((instance) => {
      instance.error(message);
    });
  }
}

export { Logger };
export type { ILogger };
