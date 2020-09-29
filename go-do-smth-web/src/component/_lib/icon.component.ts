import { CustomElement } from '../../core/custom-element.decorator';

@CustomElement({
  selector: 'app-icon',
  template: `
        <span bind="innerText:icon" class="material-icons"></span>
    `,
})
export class AppComponent extends HTMLElement {
  icon!: string;
  connectedCallback() {
    this.icon = this.getAttribute('icon') || '';
  }
}
