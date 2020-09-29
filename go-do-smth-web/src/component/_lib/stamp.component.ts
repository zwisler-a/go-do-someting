import { CustomElement } from '../../core/custom-element.decorator';
import { EventEmitter } from '../../core/event-emitter.util';

@CustomElement({
  selector: 'app-stamp',
  template: ``,
})
export class StampComponent extends HTMLElement {

  set type(value: string) {
    if (value === 'ok') this.showOk();
    if (value === 'nok') this.showNok();
    if (value === ``) this.innerHTML = ``;
  }

  connectedCallback() {}

  showNok() {
    this.innerHTML = `<span class="stamp is-nope">NOPE</span>`;
  }

  showOk() {
    this.innerHTML = `<span class="stamp is-approved">mach ich!</span>`;
  }
}
