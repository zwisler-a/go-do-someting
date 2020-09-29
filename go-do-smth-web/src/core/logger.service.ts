export const LoggerService = new (class {
  private dev = true;
  constructor() {
    (window as any).log = [];
    (window as any).printLog = this.pringLog.bind(this);
  }

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

  private pringLog() {
    const log: any[][] = (window as any).log;
    log.forEach((entry) => console.log(...entry));
  }

  setProdMode() {
    this.dev = false;
  }
})();
