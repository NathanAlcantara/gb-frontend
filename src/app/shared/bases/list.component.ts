import { Component } from '@angular/core';
import { BaseComponent } from './base.component';

@Component({
	selector: 'list-component',
	template: ``
})
export class BaseListComponent extends BaseComponent {

	gridData: any;

	constructor() {
		super();
	}
}
