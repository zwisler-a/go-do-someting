console.log('Application Startup');

import('./component/app.component');
import('./component/stamp.component');
import('./component/router.component');
import('./component/main.component');
import('./component/todo-list.component');
import('./component/header.component');
import('./component/todo-view.component');
import('./component/add-todo.component');
import('./component/loading.component');
import('./component/settings.component');
import('./component/todo.component');

if (
  'serviceWorker' in navigator &&
  !window.location.origin.includes('localhost')
) {
  window.addEventListener('load', function () {
    navigator.serviceWorker.register('/sw.js').then(
      function (registration) {
        // Registration was successful
        console.log(
          'ServiceWorker registration successful with scope: ',
          registration.scope
        );
      },
      function (err) {
        // registration failed :(
        console.log('ServiceWorker registration failed: ', err);
      }
    );
  });
}
