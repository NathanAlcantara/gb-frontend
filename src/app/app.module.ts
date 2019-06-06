import { BrowserModule } from '@angular/platform-browser';
import { APP_INITIALIZER, Injector, NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LayoutModule } from '~layout/layout.module';
import { SharedModule } from '~shared/shared.module';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { LOCATION_INITIALIZED } from '@angular/common';
import { APOLLO_OPTIONS, ApolloModule } from 'apollo-angular';
import { HttpLink, HttpLinkModule } from 'apollo-angular-link-http';
import { EntityModule } from '~core/entities/entities.module';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { PreloadAllModules, RouterModule } from '@angular/router';
import { BASE_URL } from './core/utils/constants';

export function createTranslateLoader(http: HttpClient) {
	return new TranslateHttpLoader(http, './assets/locale/', '.json');
}

export function appInitializerFactory(translate: TranslateService, injector: Injector) {
	return () => new Promise<any>((resolve: any) => {
		const locationInitialized = injector.get(LOCATION_INITIALIZED, Promise.resolve(null));
		locationInitialized.then(() => {
			const langToSet = 'pt-BR';
			translate.setDefaultLang('pt-BR');
			translate.use(langToSet).subscribe(() => {
				console.info(`Successfully initialized '${langToSet}' language.'`);
			}, () => {
				console.error(`Problem with '${langToSet}' language initialization.'`);
			}, () => {
				resolve(null);
			});
		});
	});
}

@NgModule({
	imports: [
		BrowserModule,
		BrowserAnimationsModule,
		RouterModule.forRoot([], {
			onSameUrlNavigation: 'reload',
			paramsInheritanceStrategy: 'always',
			preloadingStrategy: PreloadAllModules,
			useHash: true
		}),
		HttpClientModule,
		HttpLinkModule,
		ApolloModule,
		TranslateModule.forRoot({
			loader: {
				provide: TranslateLoader,
				useFactory: (createTranslateLoader),
				deps: [HttpClient]
			}
		}),
		SharedModule,
		EntityModule,
		LayoutModule,
	],
	providers: [
		{
			provide: APP_INITIALIZER,
			useFactory: appInitializerFactory,
			deps: [TranslateService, Injector],
			multi: true
		},
		{
			provide: APOLLO_OPTIONS,
			useFactory: (httpLink: HttpLink) => {
				return {
					link: httpLink.create({
						uri: `${BASE_URL}/graphql`
					}),
					cache: new InMemoryCache()
				};
			},
			deps: [HttpLink]
		}
	],
	declarations: [AppComponent],
	bootstrap: [AppComponent]
})
export class AppModule {
}
