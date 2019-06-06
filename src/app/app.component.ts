import { Component, OnInit } from '@angular/core';
import { NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router, RouterEvent } from '@angular/router';
import { ProductType } from '~core/enums/product_type';
import { TranslateService } from '@ngx-translate/core';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {

	navLinks: any[] = [];
	pageLoading: boolean;

	constructor(private router: Router, private translate: TranslateService) {

	}

	ngOnInit() {
		this.navLinks = this.router.config[1].children.map((route: any) => {
			if (ProductType[route.path.toUpperCase()]) {
				route.label = this.translate.instant('enum.product_type_' + route.path) + 's';
			} else {
				route.label = route.path;
			}
			return route;
		});

		this.router.events.subscribe((event: RouterEvent) => {
			if (event instanceof NavigationStart) {
				this.pageLoading = true;
			} else if (
				event instanceof NavigationEnd ||
				event instanceof NavigationCancel ||
				event instanceof NavigationError
			) {
				this.pageLoading = false;
			}
		});
	}
}
