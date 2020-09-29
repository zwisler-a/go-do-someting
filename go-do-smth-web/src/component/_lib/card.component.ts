import { CustomElement } from '../../core/custom-element.decorator';

@CustomElement({
  selector: 'app-card',
  template: ``,
})
export class AppComponent extends HTMLElement {
  content!: string;
  connectedCallback() {
    this.innerHTML = this.content;
  }
}
