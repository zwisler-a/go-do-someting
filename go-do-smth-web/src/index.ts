import { LoggerService } from './core/logger.service';

const devMode = window.location.origin.includes('localhost');

if(devMode) LoggerService.setDevMode();

LoggerService.debug('Index', 'Application Startup');

import('./component/app.component');
import('./core/router/router.component');
import('./component/_lib/_module');
import('./component/module');

if ('serviceWorker' in navigator && !devMode) {
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
        console.log('ServiceWorker registration failed: ', err);
      }
    );
  });
}
