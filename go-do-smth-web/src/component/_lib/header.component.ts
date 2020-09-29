import { CustomElement } from '../../core/custom-element.decorator';
import { RouterService } from '../../core/router/router.service';

@CustomElement({
  selector: 'app-header',
  template: `
    <nav>
      <button onclick="§§.navigateBack()">
        <app-icon icon="arrow_back"></app-icon>
      </button>
      <h1 bind="innerText:title"></h1>
    </nav>`,
})
export class HeaderComponent extends HTMLElement {
  title = '';
  up = '';

  connectedCallback() {}

  attributeChangedCallback(name: any, oldValue: any, newValue: any) {
    if (name === 'title') this.title = newValue;
    if (name === 'up') this.up = newValue;
  }

  static get observedAttributes() {
    return ['title', 'up'];
  }

  navigateBack() {
    if (this.up) return RouterService.navigate('main', this.up);
    window.history.back();
  }
}
