import { Component } from '@angular/core';
import { BaseComponent } from './base.component';
import { Action, GridColumns } from "~shared/components/gb-list/gb-list.component";

export interface ListParams {
	search?: string;
	page: number;
	size: number;
	sort: number;
	order: string;
}

@Component({
	selector: 'list-component',
	template: ``
})
export class BaseListComponent extends BaseComponent {

	gridColumns: GridColumns[];
	gridData: any[];
	totalResults: number;
	actions: Action[];
	listParams: ListParams = {
		page: 0,
		size: 10,
		sort: -1,
		order: 'index'
	};

	constructor() {
		super();
	}

	protected updateGrid() {

	}

	protected resetGrid() {
		this.listParams = {
			...this.listParams,
			page: 0,
		};

		this.updateGrid();
	}
}
