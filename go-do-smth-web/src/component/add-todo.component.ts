import { CustomElement } from '../core/custom-element.decorator';
import { RouterService } from '../service/router.service';
import { TodoService } from '../service/todo.service';

@CustomElement({
  selector: 'app-add-todo',
  template: `
        <app-header title="Todo Hinzufügen"></app-header>
        <form id="form" class="card">
            <input placeholder="Name" id="name" name="name" />
            <textarea placeholder="Description" id="description" name="description"></textarea>
            <button onclick="§§.submit(...arguments)">Add</button>
        </form>
    `,
})
export class AddTodoComponent extends HTMLElement {
  formEl!: HTMLFormElement;
  async connectedCallback() {
    const form: HTMLFormElement | null = this.querySelector('[id="form"]');
    if (form) this.formEl = form;
  }

  submit(event: MouseEvent) {
    event.preventDefault();
    (async () => {
      const formData = new FormData(this.formEl);
      const name = formData.get('name') as string;
      const description = formData.get('description') as string;
      await TodoService.addTodo({ name, description });
      RouterService.navigate('main', 'app-settings');
    })();
  }

  navigateBack() {
    window.history.back();
  }
}
