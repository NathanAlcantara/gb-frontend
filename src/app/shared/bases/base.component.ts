import { Component, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { QueryRef } from 'apollo-angular';
import { isValid } from '../../core/utils/helpers';

@Component({
	selector: 'base-component',
	template: ``
})
export class BaseComponent implements OnDestroy {

	query: QueryRef<any>;

	ngUnsubscribe = new Subject();

	ngOnDestroy(): void {
		this.ngUnsubscribe.next();
		this.ngUnsubscribe.complete();
		this.ngUnsubscribe.unsubscribe();
	}

	isValid = (value: any) => isValid(value);
}
