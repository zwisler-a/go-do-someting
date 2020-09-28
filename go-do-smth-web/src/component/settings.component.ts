import { CustomElement } from '../core/custom-element.decorator';
import { RouterService } from '../service/router.service';

@CustomElement({
  selector: 'app-settings',
  template: `

        <app-header title="Settings"></app-header>
        
        <div class="card">
          <app-todo-list></app-todo-list>
        </div>
        <button class="action icon" onclick="§§.naviagteAddTodo()">
          <span class="material-icons">post_add</span>
        </button>
        
    `,
})
export class SettingsComponent extends HTMLElement {
  naviagteAddTodo() {
    RouterService.navigate('main', 'app-add-todo');
  }
}
