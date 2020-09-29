export function bindData(_this: any) {
  const bindEl = _this.querySelectorAll('[bind]');
  bindEl.forEach((el: any) => {
    var bind = el.getAttribute('bind').split(':');
    var domAttr = bind[0].trim(); // the attribute on the DOM element
    var itemAttr = bind[1].trim(); // the attribute the object
    var onAttribute = bind.length === 3 ? bind[2].trim() === 'true' : false; // the attribute the object
    let val = _this[itemAttr] || '';
    Object.defineProperty(_this, itemAttr, {
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
}
