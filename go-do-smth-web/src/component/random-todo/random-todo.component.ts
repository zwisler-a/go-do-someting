import { CustomElement } from '../../core/custom-element.decorator';
import { getRouterData } from '../../core/router/router.service';
import { TodoService } from '../todo.service';

@CustomElement({
  selector: 'app-random-todo',
  template: `
        <app-header uo="app-main"></app-header>
        <div bindAttribute="class:cardClass">
          <app-card class="fullscreen-card">
            <h1 class="fadein" bind="innerText:todoName"></h1>
            <p class="fadein" bind="innerText:todoDesc"></p>
            <div class="action fadein">
              <button class="nok" onclick="§§.nok()"><app-icon icon="close" /></button>
              <button class="ok" onclick="§§.ok()"><app-icon icon="done" /></button>
            </div>
          </app-card>
        </div>
        <div bindAttribute="class:loadingClass"><app-loading></app-loading></div>
        <app-stamp bind="type:stamped"></app-stamp>
    `,
})
export class RandomTodoComponent extends HTMLElement {
  todoName!: string;
  todoDesc!: string;
  stamped = '';
  cardClass = ``;
  loadingClass = ``;
  loading = false;
  todo: any;

  private setLoading(loading: boolean) {
    this.cardClass = `${loading ? 'hidden' : 'fadein fullscreen-card-wrapper'}`;
    this.loadingClass = `${loading ? '' : 'hidden'}`;
  }

  connectedCallback() {
    this.loadTodo(false, getRouterData(this));
  }

  private async loadTodo(showLoading = true, preloadedTodo?: Promise<any>) {
    if (showLoading) this.setLoading(true);
    this.todo = preloadedTodo
      ? await preloadedTodo
      : await TodoService.fetchRandomTodo();
    this.setLoading(false);
    this.stamped = ``;
    this.todoName = this.todo.name;
    this.todoDesc = this.todo.description;
  }

  private showNewTodo() {
    this.loading = true;
    const todoPromise = TodoService.fetchRandomTodo();
    setTimeout(() => {
      this.loadTodo(false, todoPromise);
      this.loading = false;
    }, 1000);
  }

  ok() {
    if (this.loading) return;
    this.stamped = 'ok';
    TodoService.recordDecision(this.todo.id, true);
    this.showNewTodo();
  }

  nok() {
    if (this.loading) return;
    this.stamped = 'nok';
    TodoService.recordDecision(this.todo.id, false);
    this.showNewTodo();
  }
}
