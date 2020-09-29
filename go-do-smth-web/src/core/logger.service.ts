export const LoggerService = new (class {
  private dev = false;
  debug(context: string, ...args: any[]) {
    if (this.dev) console.log(`[${context}]`, ...args);
  }

  setDevMode() {
    this.dev = true;
  }
})();
