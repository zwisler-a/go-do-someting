import { generateComponentUUID } from './component-uuid.util';
import { bindData } from './databind.util';
import { LoggerService } from './logger.service';
import { processHtml } from './process-html.util';

export interface CustomElementConfig {
  selector: string;
  template: string;
}

export function CustomElement(config: CustomElementConfig) {
  return function classDecorator(constructor: any) {
    const connectedCallback =
      constructor.prototype.connectedCallback || function () {};
    constructor.prototype.connectedCallback = function () {
      const id = generateComponentUUID();
      this.setAttribute('id', id);

      const templateConfig = { id };
      this.content = processHtml(this.innerHTML, templateConfig);
      this.innerHTML = processHtml(config.template, templateConfig);

      bindData(this);

      connectedCallback.call(this);
    };

    customElements.define(config.selector, constructor);
    LoggerService.debug('Core', `Registered Component ${config.selector}`);
  };
}
