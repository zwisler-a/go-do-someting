import { CustomElement } from '../core/custom-element.decorator';
import { getRouterData, RouterService } from '../service/router.service';
import { TodoService } from '../service/todo.service';

@CustomElement({
  selector: 'app-todo',
  template: `
        <div class="center-box">
          <div bind="class:cardClass:true">
            <h1 class="fadein" bind="innerText:todoName"></h1>
            <p class="fadein" bind="innerText:todoDesc"></p>
            <div class="action fadein">
              <button class="nok" onclick="§§.nok()"><span class="material-icons">close</span></button>
              <button class="ok" onclick="§§.ok()"><span class="material-icons">done</span></button>
            </div>
          </div>
          <div bind="class:loadingClass:true"><app-loading></app-loading></div>
          <app-stamp bind="type:stamped"></app-stamp>
        <div>
    `,
})
export class TodoComponent extends HTMLElement {
  todoName!: string;
  todoDesc!: string;
  stamped = '';
  cardClass = ``;
  loadingClass = ``;

  private setLoading(loading: boolean) {
    this.cardClass = `card ${loading ? 'hidden' : ''}`;
    this.loadingClass = `card ${loading ? '' : 'hidden'}`;
  }

  async connectedCallback() {
    this.setLoading(true);
    const todo = await TodoService.fetchRandomTodo();
    this.setLoading(false);
    this.todoName = todo.name;
    this.todoDesc = todo.description;
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
