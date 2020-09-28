import { generateComponentUUID } from './component-uuid.util';

export interface CustomElementConfig {
  selector: string;
  template: string;
}

export function CustomElement(config: CustomElementConfig) {
  console.debug(`Found Component ${config.selector}`);
  return function classDecorator(constructor: any) {
    const connectedCallback =
      constructor.prototype.connectedCallback || function () {};
    constructor.prototype.connectedCallback = function () {
      const id = generateComponentUUID();
      this.setAttribute('id', id);
      this.innerHTML = config.template.replace(/§§/g, id);

      const bindEl = this.querySelectorAll('[bind]');
      bindEl.forEach((el: any) => {
        var bind = el.getAttribute('bind').split(':');
        var domAttr = bind[0].trim(); // the attribute on the DOM element
        var itemAttr = bind[1].trim(); // the attribute the object
        var onAttribute = bind.length === 3 ? bind[2].trim() === 'true' : false; // the attribute the object
        let val = this[itemAttr] || '';
        Object.defineProperty(this, itemAttr, {
          get: () => val,
          set: (newVal) => {
            val = newVal;
            el[domAttr] = val;
            if (onAttribute) el.setAttribute(domAttr, val);
          },
        });
        el[domAttr] = val;
        if (onAttribute) el.setAttribute(domAttr, val);
        el.setAttribute('bound', el.getAttribute('bind'));
        el.removeAttribute('bind');
      });

      connectedCallback.call(this);
    };

    customElements.define(config.selector, constructor);
    console.debug(`Registered Component ${config.selector}`);
  };
}
