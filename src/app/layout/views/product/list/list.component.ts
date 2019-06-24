import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { map, takeUntil } from 'rxjs/operators';

import { BaseListComponent } from '~shared/bases/list.component';
import { Product, ProductDto } from '~core/entities/product/product';
import { defaultCatch } from '~core/utils/helpers';
import { ProductService } from "~core/entities/product/product.service";

@Component({
	selector: 'products-list',
	templateUrl: './list.component.html',
	styleUrls: ['./list.component.scss']
})
export class ProductsListComponent extends BaseListComponent implements OnInit {

	constructor(private router: Router,
				private route: ActivatedRoute,
				private translate: TranslateService,
				private productService: ProductService) {
		super();
	}

	isLoading: boolean;
	hasError: boolean;

	static converterCurrency(value: number) {
		if (value) {
			value = Number(value);
			return value.toLocaleString('pt-BR', { minimumFractionDigits: 2, style: 'currency', currency: 'BRL' });
		}
	}

	ngOnInit() {
		this.initGridColumns();
		this.initActions();
		this.updateGrid();
	}

	onSearch(search: string) {
		this.listParams.search = search;
		this.resetGrid();
	}

	onChangeSort(event) {
		let direction = event.direction;
		let field = event.active;

		switch (direction) {
			case "asc":
				direction = 1;
				break;
			case "desc":
				direction = -1;
				break;
			default:
				direction = -1;
		}

		switch (field) {
			case "code":
			case "name":
				field = "index";
				break;
		}

		this.listParams.sort = direction;
		this.listParams.order = field;
		this.resetGrid();
	}

	onChangePagination(event) {
		this.listParams.page = event.pageIndex;
		this.listParams.size = event.pageSize;
		this.updateGrid();
	}

	addProduct() {
		this.router.navigate(['add/product']);
	}

	editProduct(id: string) {
		this.router.navigate(['edit/product/' + id]);
	}

	protected updateGrid() {
		this.gridData = [];
		this.isLoading = true;

		this.productService.findAllPaginate(this.listParams).valueChanges
			.pipe(
				takeUntil(this.ngUnsubscribe),
				map((result: any) => result.data),
				defaultCatch()
			).subscribe(
			(resp: any) => {
				this.gridData = resp.allProducts.map((product: ProductDto) => Product.fromDto(product, this.translate));
				this.totalResults = resp.countAllProducts;
				this.hasError = false;
				this.isLoading = false;
			},
			() => {
				this.hasError = true;
				this.isLoading = false;
			}
		);
	}

	private initActions() {
		this.actions = [
			{
				label: "Adicionar",
				action: () => this.addProduct()
			},
			{
				label: "Editar",
				action: (id: string) => this.editProduct(id)
			}
		];
	}

	private initGridColumns() {
		this.gridColumns = [
			{
				field: 'code',
				label: "Código",
				sorted: true
			},
			{
				field: 'name',
				label: "Nome",
				sorted: true
			},
			{
				field: 'productType',
				label: "Tipo do produto",
				sorted: true
			},
			{
				field: 'actualPrice',
				label: "Preço",
				sorted: true,
				converter: (money) => ProductsListComponent.converterCurrency(money)
			},
			{
				field: 'paymentType',
				label: "Tipos de pagamentos"
			},
			{
				field: 'numberOfParcels',
				label: "Número de parcelas",
				sorted: true
			},
			{
				field: 'valueOfParcel',
				label: "Valor da parcela",
				sorted: true,
				converter: (money) => ProductsListComponent.converterCurrency(money)
			},
		];
	}
}
