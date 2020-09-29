import { CustomElement } from '../core/custom-element.decorator';

@CustomElement({
  selector: 'app-root',
  template: `
        <app-background></app-background>
        <app-router defaultsTo="app-main" name="main"></app-router>
    `,
})
export class AppComponent extends HTMLElement {
  connectedCallback() {
    // RouterService.navigate('main', 'app-main');
  }
}
