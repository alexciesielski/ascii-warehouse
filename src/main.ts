import { bootstrap } from '@angular/platform-browser-dynamic';
import { enableProdMode } from '@angular/core';
import { XteamAppComponent, environment } from './app/';
import { HTTP_PROVIDERS } from '@angular/http';
//import { ScrollSpyService } from 'ng2-scrollspy';

if (environment.production) {
  enableProdMode();
}

bootstrap(XteamAppComponent, [
  HTTP_PROVIDERS,
  //ScrollSpyService
]);

