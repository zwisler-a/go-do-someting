import { CustomElement } from '../core/custom-element.decorator';
import { RouterService } from '../service/router.service';

@CustomElement({
  selector: 'app-root',
  template: `
        <div class="background-image"></div>
        <app-router defaultsTo="app-main" name="main"></app-router>
    `,
})
export class AppComponent extends HTMLElement {
  connectedCallback() {
    // RouterService.navigate('main', 'app-main');
  }
}
