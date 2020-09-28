import { CustomElement } from '../core/custom-element.decorator';

@CustomElement({
  selector: 'app-loading',
  template: `
<svg class="fadein delayed" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" style="margin: auto; background: none; display: block; shape-rendering: auto;" width="207px" height="207px" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid">
<circle cx="50" cy="20" r="10" fill="#e15b64">
  <animate attributeName="cy" dur="1s" repeatCount="indefinite" calcMode="spline" keySplines="0.45 0 0.9 0.55;0 0.45 0.55 0.9" keyTimes="0;0.5;1" values="20;80;20"></animate>
</circle></svg>
    `,
})
export class LoadingComponent extends HTMLElement {}
