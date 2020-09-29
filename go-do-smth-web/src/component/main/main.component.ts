import { CustomElement } from '../../core/custom-element.decorator';
import { RouterService } from '../../core/router/router.service';
import { TodoService } from '../todo.service';

@CustomElement({
  selector: 'app-main',
  template: `
        <main class="main-page">
          <app-main-button class="fadein" onclick="§§.fetchRandomTodo()" text="Go get me somthing to do!"></app-main-button>
          <button class="action icon noborder" onclick="§§.navigateToSettings()">
            <app-icon icon="settings" />
          </button>
        </main>
    `,
})
export class MainComponent extends HTMLElement {
  mainButtonDisabled = false;

  connectedCallback() {}

  fetchRandomTodo() {
    if (this.mainButtonDisabled) return;
    this.mainButtonDisabled = true;
    const todoPromise = TodoService.fetchRandomTodo();
    setTimeout(() => {
      RouterService.navigate('main', 'app-random-todo', todoPromise);
    }, 500);
  }

  navigateToSettings() {
    RouterService.navigate('main', 'app-settings');
  }
}
