import { CustomElement } from '../core/custom-element.decorator';
import { getRouterData } from '../service/router.service';
import { TodoService } from '../service/todo.service';

@CustomElement({
  selector: 'app-todo-view',
  template: `
        <app-header bind="title:title"></app-header>
        <form id="form" bind="class:formClass:true">
            <input bind="value:todoName" placeholder="Name" id="name" name="name" />
            <textarea bind="value:todoDesc" placeholder="Description" id="description" name="description"></textarea>
            <button onclick="§§.submit(...arguments)">Speichern</button>
        </form>
        <div bind="class:loadingClass:true">
          <app-loading></app-loading>
        </div>
        <button class="action icon" onclick="§§.delete()">
          <span class="material-icons">delete</span>
        </button>
    `,
})
export class TodoViewComponent extends HTMLElement {
  title!: string;
  todoName!: string;
  todoDesc!: string;
  formEl!: HTMLFormElement;
  todoId!: string;

  formClass = ``;
  loadingClass = ``;

  setLoading(loading: boolean) {
    this.formClass = `card ${loading ? 'hidden' : ''}`;
    this.loadingClass = `card ${loading ? '' : 'hidden'}`;
  }

  async connectedCallback() {
    this.setLoading(true);
    this.todoId = getRouterData(this);
    await this.loadTodo(this.todoId);
    this.setLoading(false);
    const form: HTMLFormElement | null = this.querySelector('[id="form"]');
    if (form) this.formEl = form;
  }

  submit(event: any) {
    const formData = new FormData(this.formEl);
    const name = formData.get('name') as string;
    const description = formData.get('description') as string;
    TodoService.updateTodo({ id: this.todoId, name, description });
    event.preventDefault();
  }

  async loadTodo(id: string) {
    const todo = await TodoService.fetchTodo(id);
    this.title = todo.name;
    this.todoName = todo.name;
    this.todoDesc = todo.description;
  }

  async delete() {
    await TodoService.deleteTodo(this.todoId);
    window.history.back();
  }
}
