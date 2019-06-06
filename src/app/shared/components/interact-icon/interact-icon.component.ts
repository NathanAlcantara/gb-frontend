import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
	selector: 'interact-icon',
	templateUrl: './interact-icon.component.html',
	styleUrls: ['./interact-icon.component.scss']
})
export class InteractIconComponent implements OnInit {

	@Input()
	icon: string;
	@Input()
	number: number;

	@Output()
	onClick: EventEmitter<any> = new EventEmitter();

	constructor() {
	}

	ngOnInit() {
	}

}
