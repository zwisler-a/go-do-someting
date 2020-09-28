import { textChangeRangeIsUnchanged } from 'typescript';
import { CustomElement } from '../core/custom-element.decorator';
import { RouterService } from '../service/router.service';

@CustomElement({
  selector: 'app-header',
  template: `
    <nav>
      <button onclick="§§.navigateBack()">
        <span class="material-icons">arrow_back</span>
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
    console.log(this.up);
    if (this.up) return RouterService.navigate('main', this.up);
    window.history.back();
  }
}
