import { CustomElement } from '../../core/custom-element.decorator';

@CustomElement({
  selector: 'app-background',
  template: `
        <div class="background-image"></div>
    `,
})
export class BackgroundImageComponent extends HTMLElement {}
