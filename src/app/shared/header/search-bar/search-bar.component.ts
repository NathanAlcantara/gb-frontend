import { Component, EventEmitter, Output } from '@angular/core';

@Component({
	selector: 'search-bar',
	templateUrl: './search-bar.component.html',
	styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent {

	@Output()
	onSearch: EventEmitter<any> = new EventEmitter();

	constructor() {
	}
}
