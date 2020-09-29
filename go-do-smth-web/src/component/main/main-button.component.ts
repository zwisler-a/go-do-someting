import { CustomElement } from '../../core/custom-element.decorator';

@CustomElement({
  selector: 'app-main-button',
  template: `
          <button class="main-button" bind="innerText:text"></button>
    `,
})
export class MainComponent extends HTMLElement {
  text!: string;

  connectedCallback() {
    this.text = this.getAttribute('text') || '';
  }
}
