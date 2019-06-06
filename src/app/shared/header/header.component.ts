import { Component, DoCheck } from '@angular/core';
import { Router } from '@angular/router';
import { HeaderService } from './header.service';

@Component({
	selector: 'header',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements DoCheck {
	cartItems: number;

	constructor(private router: Router,
				private headerService: HeaderService) {
	}

	ngDoCheck() {
		this.headerService
			.getItemsCart()
			.subscribe((quantity: number) => this.cartItems = quantity);
	}

	public search(data: any) {
		data.preventDefault();
		console.error(data);
	}

	public goToUserPage(): void {
		if (false) {
			this.router.navigate(['user']);
		} else {
			this.router.navigate(['login']);
		}
	}

	public goToHomePage(): void {
		this.router.navigate(['']);
	}

	public goToCartPage(): void {
		this.router.navigate(['cart']);
	}
}
