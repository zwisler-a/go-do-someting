import { CustomElement } from '../../core/custom-element.decorator';
import { TodoService } from '../todo.service';

@CustomElement({
  selector: 'app-random-todo',
  template: `
        <div bind="class:cardClass:true" class="fullscreen-card-wrapper">
          <app-card class="fullscreen-card">
            <h1 class="fadein" bind="innerText:todoName"></h1>
            <p class="fadein" bind="innerText:todoDesc"></p>
            <div class="action fadein">
              <button class="nok" onclick="§§.nok()"><app-icon icon="close" /></button>
              <button class="ok" onclick="§§.ok()"><app-icon icon="done" /></button>
            </div>
          </app-card>
        </div>
        <div bind="class:loadingClass:true"><app-loading></app-loading></div>
        <app-stamp bind="type:stamped"></app-stamp>
    `,
})
export class RandomTodoComponent extends HTMLElement {
  todoName!: string;
  todoDesc!: string;
  stamped = '';
  cardClass = ``;
  loadingClass = ``;
  todo: any;

  private setLoading(loading: boolean) {
    this.cardClass = `${loading ? 'hidden' : 'fadein fullscreen-card-wrapper'}`;
    this.loadingClass = `${loading ? '' : 'hidden'}`;
  }

  async connectedCallback() {
    this.setLoading(true);
    this.todo = await TodoService.fetchRandomTodo();
    this.setLoading(false);
    this.todoName = this.todo.name;
    this.todoDesc = this.todo.description;
  }
  navigateBack() {
    window.history.back();
  }

  ok() {
    this.stamped = 'ok';
    TodoService.recordDecision(this.todo.id, true);
    setTimeout(() => {
      window.history.back();
    }, 1000);
  }

  nok() {
    this.stamped = 'nok';
    TodoService.recordDecision(this.todo.id, false);
    setTimeout(() => {
      window.history.back();
    }, 1000);
  }
}
