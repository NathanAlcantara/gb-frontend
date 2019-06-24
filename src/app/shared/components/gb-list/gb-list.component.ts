import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

export interface GridColumns {
	field: string;
	label: string;
	sorted?: boolean;
	converter?: (any) => void;
}

export interface Action {
	label: string;
	action: (any?) => void;
}

@Component({
	selector: 'gb-list',
	templateUrl: './gb-list.component.html',
	styleUrls: ['./gb-list.component.scss']
})
export class GbListComponent implements OnInit {

	@Input() isLoading: boolean;
	@Input() hasError: boolean;
	@Input() gridColumns: GridColumns[];
	@Input() gridData: any[];
	@Input() totalResults: number;
	@Input() primaryAction?: Action;
	@Input() listAction?: Action;

	@Output() onSearch = new EventEmitter();
	@Output() onChangeSort = new EventEmitter();
	@Output() onChangePagination = new EventEmitter();

	columnsLabel: string[];

	constructor() {
	}

	ngOnInit() {
		this.columnsLabel = this.gridColumns.map((column) => column.field);
		if (this.listAction) this.columnsLabel.push('actions');
	}
}
