import { CustomElement } from '../core/custom-element.decorator';
import { getRouterData, RouterService } from '../service/router.service';
import { TodoService } from '../service/todo.service';

@CustomElement({
  selector: 'app-main',
  template: `
        <main class="main-page">
          <button class="main-button" onclick="§§.fetchRandomTodo()">Go get me somthing to do!</button>
          <button class="action icon noborder" onclick="§§.navigateToSettings()">
            <span class="material-icons">settings</span>
          </button>
        </main>
    `,
})
export class MainComponent extends HTMLElement {
  connectedCallback() {}

  fetchRandomTodo() {
    setTimeout(() => {
      RouterService.navigate('main', 'app-todo');
    }, 500);
  }

  navigateToSettings() {
    RouterService.navigate('main', 'app-settings');
  }
}
