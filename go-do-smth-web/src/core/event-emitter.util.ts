export class EventEmitter {
  constructor(private eventName: string, private context: any) {}

  emit(data?: any) {
    const event = new CustomEvent(this.eventName, data);
    const onAttr = this.context.getAttribute(`on${this.eventName}`);
    if (onAttr) new Function('event', onAttr)(event);
    this.context.dispatchEvent(event);
  }
}
