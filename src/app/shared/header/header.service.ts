import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class HeaderService {
	private search$ = new Subject();
	private itemsCart$ = new Subject();

	constructor() {
	}

	public setSearch(text: string) {
		this.search$.next(text);
	}

	public getSearch() {
		return this.search$.asObservable();
	}

	public setItemsCart(quantity: number) {
		this.itemsCart$.next(quantity);
	}

	public getItemsCart() {
		return this.itemsCart$.asObservable();
	}
}
