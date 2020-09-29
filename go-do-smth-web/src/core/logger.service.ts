export const LoggerService = new (class {
  constructor() {
    (window as any).log = [];
  }

  private dev = false;
  debug(context: string, ...args: any[]) {
    if (this.dev) return console.log(`[${context}]`, ...args);
    this.addToLog(context, args);
  }

  error(context: string, ...args: any[]) {
    if (this.dev) return console.log(`[${context}]`, ...args);
    this.addToLog(context, args);
  }

  private addToLog(context: string, ...args: any[]) {
    (window as any).log.push([`[${context}]`, ...args]);
  }

  setDevMode() {
    this.dev = true;
  }
})();
