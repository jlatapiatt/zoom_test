import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

// import { ZoomMtg } from 'https://source.zoom.us/zoom-meeting-1.7.10.min.js';

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
  
// ZoomMtg.preLoadWasm();
// ZoomMtg.prepareJssdk();
