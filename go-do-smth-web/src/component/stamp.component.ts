import { CustomElement } from '../core/custom-element.decorator';

@CustomElement({
  selector: 'app-stamp',
  template: ``,
})
export class StampComponent extends HTMLElement {
  set type(value: string) {
    if (value === 'ok') this.showOk();
    if (value === 'nok') this.showNok();
  }

  showNok() {
    this.innerHTML = `<span class="stamp is-nope">Abgelehnt</span>`;
  }

  showOk() {
    this.innerHTML = `<span class="stamp is-approved">Erledigt</span>`;
  }
}
