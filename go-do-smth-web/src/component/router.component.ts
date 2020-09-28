import { CustomElement } from '../core/custom-element.decorator';
import { RouterService } from '../service/router.service';

@CustomElement({
  selector: 'app-router',
  template: `
        <main></main>
    `,
})
export class RouterComponent extends HTMLElement {
  connectedCallback() {
    const name = this.getAttribute('name');
    const defaults = this.getAttribute('defaultsTo');

    if (!name) throw Error('Router Component needs a name!');
    if (defaults) this.displayComponent(defaults, null);

    RouterService.events(name, (comp, data) => {
      if (!comp.length && defaults)
        return this.displayComponent(defaults, null);
      this.displayComponent(comp, data);
    });
  }

  private displayComponent(name: string, data?: any) {
    const component = document.createElement(name);
    this.innerHTML = ``;
    Object.defineProperty(component, '_routerData', { get: () => data });
    this.appendChild(component);
  }
}
