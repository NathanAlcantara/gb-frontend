import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { map, takeUntil } from 'rxjs/operators';

import { BaseListComponent } from '~shared/bases/list.component';
import { Product, ProductDto } from '~core/entities/product/product';
import { defaultCatch } from '~core/utils/helpers';

@Component({
	selector: 'products-list',
	templateUrl: './list.component.html',
	styleUrls: ['./list.component.scss']
})
export class ProductsListComponent extends BaseListComponent implements OnInit {

	displayedColumns = [
		'code',
		'name',
		'productType',
		'actualPrice',
		'paymentType',
		'numberOfParcels',
		'valueOfParcel',
		'actions'
	];
	isLoading: boolean;
	hasError: boolean;

	constructor(private router: Router,
				private route: ActivatedRoute,
				private translate: TranslateService) {
		super();
	}

	ngOnInit() {
		this.isLoading = true;

		this.route.data
			.pipe(takeUntil(this.ngUnsubscribe))
			.subscribe((data: any) => this.onRouteDataChange(data));

		this.updateGrid();
	}

	applyFilter(filterValue: string) {
		this.gridData.filter = filterValue.trim().toLowerCase();

		if (this.gridData.paginator) {
			this.gridData.paginator.firstPage();
		}
	}

	converterCurrency(value: number) {
		if (value) {
			value = Number(value);
			return value.toLocaleString('pt-BR', { minimumFractionDigits: 2, style: 'currency', currency: 'BRL' });
		}
	}

	addProduct() {
		this.router.navigate(['add/product']);
	}

	editProduct(id: any) {
		this.router.navigate(['edit/product/' + id]);
	}

	private updateGrid() {
		this.query.valueChanges
			.pipe(
				takeUntil(this.ngUnsubscribe),
				map((result: any) => result.data.allProducts),
				defaultCatch()
			).subscribe(
			(resp: any) => {
				this.gridData = resp.map((product: ProductDto) => Product.fromDto(product, this.translate));
				this.hasError = false;
				this.isLoading = false;
			},
			() => {
				this.hasError = true;
				this.isLoading = false;
			}
		);
	}

	private onRouteDataChange(data: any) {
		this.query = data.request;
	}
}
