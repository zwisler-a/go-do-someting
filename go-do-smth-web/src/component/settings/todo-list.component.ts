import { CustomElement } from '../../core/custom-element.decorator';
import { RouterService } from '../../core/router/router.service';
import { TodoService } from '../todo.service';

@CustomElement({
  selector: 'app-todo-list',
  template: `
        <app-loading></app-loading>
    `,
})
export class TodoListComponent extends HTMLElement {
  async connectedCallback() {
    const todos = await TodoService.fetchTodoList();
    this.renderTodos(todos);
  }

  private renderTodos(todos: any[]) {
    const listStr = todos.map(
      (todo) =>
        `<li onclick="${this.getAttribute('id')}.listClick('${todo.id}')">${
          todo.name
        }</li>`
    );
    this.innerHTML = `
        <ul class="fadein">
            ${listStr.join('')}
        </ul>
    `;
  }

  listClick(id: string) {
    RouterService.navigate('main', 'app-todo-view', id);
  }
}
