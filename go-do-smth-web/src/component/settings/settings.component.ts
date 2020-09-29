import { CustomElement } from '../../core/custom-element.decorator';
import { RouterService } from '../../core/router/router.service';

@CustomElement({
  selector: 'app-settings',
  template: `

        <app-header up="app-main" title="Settings"></app-header>
        
        <app-card>
          <app-todo-list></app-todo-list>
        </app-card>
        <button class="action icon" onclick="§§.naviagteAddTodo()">
          <app-icon icon="post_add" />
        </button>
        
    `,
})
export class SettingsComponent extends HTMLElement {
  naviagteAddTodo() {
    RouterService.navigate('main', 'app-add-todo');
  }
}
