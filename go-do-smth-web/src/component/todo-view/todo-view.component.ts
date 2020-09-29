import { CustomElement } from '../../core/custom-element.decorator';
import { getRouterData } from '../../core/router/router.service';
import { TodoService } from '../todo.service';

@CustomElement({
  selector: 'app-todo-view',
  template: `
        <app-header bind="title:todoName"></app-header>
        <app-card bindAttribute="class:formClass">
          <form id="form" >
              <input bind="value:todoName" placeholder="Name" id="name" name="name" />
              <textarea bind="value:todoDesc" placeholder="Description" id="description" name="description"></textarea>
              <button onclick="§§.submit(...arguments)">Speichern</button>
          </form>
        </app-card>
        <app-loading bindAttribute="class:loadingClass"></app-loading>
        <button class="action icon" onclick="§§.delete()">
          <app-icon icon="delete" />
        </button>
    `,
})
export class TodoViewComponent extends HTMLElement {
  todoName!: string;
  todoDesc!: string;
  formEl!: HTMLFormElement;
  todoId!: string;

  formClass = ``;
  loadingClass = ``;

  setLoading(loading: boolean) {
    this.formClass = `${loading ? 'hidden' : 'fadein'}`;
    this.loadingClass = `${loading ? '' : 'hidden'}`;
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
