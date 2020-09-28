type RouterFunction = (comp: string, data?: any) => void;

export const getRouterData = (_this: any, prop?: string) => {
  const data = (_this as any)['_routerData'];
  if (prop && data) return data[prop];
  return data;
};

export const RouterService = new (class {
  private callbacks: { [key: string]: RouterFunction[] } = {};
  private state: { [key: string]: { comp: string; data?: any } } = {};

  constructor() {
    window.onpopstate = this.handlePopState.bind(this);
    this.handlePopState();
  }

  handlePopState() {
    const url = window.location.pathname;
    const outletState = url.split('/');
    outletState.shift();
    Object.keys(this.state).forEach((key) => {
      const cbs = this.callbacks[key];
      if (cbs) cbs.forEach((cb) => cb('', null));
    });
    for (let i = 0; i < outletState.length; i += 2) {
      if (!outletState[i].length) continue;
      this.navigate(outletState[i], outletState[i + 1], null, true);
    }
  }

  events(name: string, fn: RouterFunction) {
    const routerCb = this.callbacks[name] || [];
    routerCb.push(fn);
    this.callbacks[name] = routerCb;
    if (this.state[name]) fn(this.state[name].comp, this.state[name].data);
  }

  navigate(name: string, comp: string, data?: any, surpressHistory = false) {
    console.log(
      '[Router]',
      `RouterComponent ${name} navigate to ${comp}`,
      data
    );
    const cbs = this.callbacks[name] || [];
    this.state[name] = { comp, data };
    cbs.forEach((cb) => cb(comp, data));
    if (!surpressHistory) this.pushHistroyState();
  }

  private pushHistroyState() {
    const url = Object.keys(this.state)
      .map((key) => ({ key, value: this.state[key].comp }))
      .map((stateObj) => `${stateObj.key}/${stateObj.value}`)
      .join('/');
    window.history.pushState(null, url, '/' + url);
  }
})();
