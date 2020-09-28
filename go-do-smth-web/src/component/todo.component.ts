import { CustomElement } from '../core/custom-element.decorator';
import { getRouterData, RouterService } from '../service/router.service';

@CustomElement({
  selector: 'app-todo',
  template: `
        <div class="center-box">
          <div class="card">
            <h1 bind="innerText:todoName"></h1>
            <p bind="innerText:todoDesc"></p>
            <div class="action">
              <button class="nok" onclick="§§.nok()"><span class="material-icons">close</span></button>
              <button class="ok" onclick="§§.ok()"><span class="material-icons">done</span></button>
          </div>
          </div>
          <app-stamp bind="type:stamped"></app-stamp>
        <div>
    `,
})
export class TodoComponent extends HTMLElement {
  todoName!: string;
  todoDesc!: string;
  stamped = '';

  connectedCallback() {
    this.todoName = getRouterData(this, 'name');
    this.todoDesc = getRouterData(this, 'description');
    if (!this.todoDesc) RouterService.navigate('main', 'app-main');
  }
  navigateBack() {
    window.history.back();
  }

  ok() {
    this.stamped = 'ok';
    setTimeout(() => {
      window.history.back();
    }, 1000);
  }

  nok() {
    this.stamped = 'nok';
    setTimeout(() => {
      window.history.back();
    }, 1000);
  }
}
