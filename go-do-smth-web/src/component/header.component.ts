import { textChangeRangeIsUnchanged } from 'typescript';
import { CustomElement } from '../core/custom-element.decorator';

@CustomElement({
  selector: 'app-header',
  template: `
    <nav>
      <button  onclick="§§.navigateBack()">
        <span class="material-icons">arrow_back</span>
      </button>
      <h1 bind="innerText:title"></h1>
    </nav>`,
})
export class HeaderComponent extends HTMLElement {
  title = '';

  connectedCallback() {}

  attributeChangedCallback(name: any, oldValue: any, newValue: any) {
    if (name === 'title') {
      this.title = newValue;
    }
  }

  static get observedAttributes() {
    return ['title'];
  }

  navigateBack() {
    window.history.back();
  }
}
