import { LoggerService } from './logger.service';

type Listener = {
  register: (cb: (value: any) => void) => void;
  value: any;
  clear: () => void;
};

const bindings: { [key: string]: Listener } = {};

function createChangeListener(_this: any, property: string, id: string) {
  const callbacks: Function[] = [];
  const listener: Listener = {
    register: (cb) => callbacks.push(cb),
    value: _this[property] || '',
    clear: () => {
      callbacks.length = 0;
    },
  };
  Object.defineProperty(_this, property, {
    get: () => listener.value,
    set: (newVal) => {
      LoggerService.debug(
        'DataBind',
        `Change ${_this.tagName}[${id}].${property}: "${listener.value}" => "${newVal}"`
      );
      listener.value = newVal;
      callbacks.forEach((callback) => callback(newVal));
    },
  });
  return listener;
}

function parseBindings(bindings: string) {
  const bind = bindings.split(';');
  return bind.map((binding) => {
    const [domAttr, itemAttr] = binding.split(':');
    return { domAttr, itemAttr };
  });
}

export function bindData(_this: any, id: string) {
  const bindPropEl = _this.querySelectorAll('[bind]');
  bindPropEl.forEach((el: any) => {
    parseBindings(el.getAttribute('bind')).forEach(({ domAttr, itemAttr }) => {
      let listener =
        bindings[id + itemAttr] || createChangeListener(_this, itemAttr, id);
      listener.register((newVal: any) => {
        el[domAttr] = newVal;
      });
      bindings[id + itemAttr] = listener;

      el[domAttr] = listener.value;
      el.setAttribute('bound', el.getAttribute('bind'));
      el.removeAttribute('bind');
    });
  });

  const bindAttrEl = _this.querySelectorAll('[bindAttribute]');
  bindAttrEl.forEach((el: any) => {
    parseBindings(el.getAttribute('bindAttribute')).forEach(
      ({ domAttr, itemAttr }) => {
        let listener =
          bindings[id + itemAttr] || createChangeListener(_this, itemAttr, id);
        listener.register((newVal: any) => {
          el.setAttribute(domAttr, newVal);
        });
        bindings[id + itemAttr] = listener;

        el.setAttribute(domAttr, listener.value);
        el.setAttribute('boundAttribute', el.getAttribute('bindAttribute'));
        el.removeAttribute('bindAttribute');
      }
    );
  });
}
