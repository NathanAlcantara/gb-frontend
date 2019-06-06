import { Component, Input, OnInit } from '@angular/core';

@Component({
	selector: 'n-empty-state',
	templateUrl: './empty-state.component.html',
	styleUrls: ['./empty-state.component.scss']
})
export class EmptyStateComponent implements OnInit {

	@Input()
	isError: boolean;
	@Input()
	firstTitleError: string;
	@Input()
	secondTitleError: string;
	@Input()
	isEmpty: boolean;
	@Input()
	firstTitleEmpty: string;
	@Input()
	secondTitleEmpty: string;

	constructor() {
	}

	ngOnInit() {
	}

}
