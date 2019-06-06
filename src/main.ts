import 'hammerjs';
import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { PROD } from './app/core/utils/constants';

if (PROD) {
	enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
	.catch(err => console.error(err));
