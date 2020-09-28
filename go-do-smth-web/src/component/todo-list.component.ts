import { CustomElement } from '../core/custom-element.decorator';
import { RouterService } from '../service/router.service';
import { TodoService } from '../service/todo.service';

@CustomElement({
  selector: 'app-todo-list',
  template: `
        Loading ...
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
        <ul>
            ${listStr.join('')}
        </ul>
    `;
  }

  listClick(id: string) {
    RouterService.navigate('main', 'app-todo-view', id);
  }
}
