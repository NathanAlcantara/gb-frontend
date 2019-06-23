import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { EnumValues } from 'enum-values';
import { ProductDto } from '~core/entities/product/Product';
import { PaymentType } from '~core/enums/parcel_type';
import { ProductType } from '~core/enums/product_type';
import { isValid } from '~core/utils/helpers';
import { SizeType } from '~core/enums/size_type';
import { ColorHex } from '~core/enums/color';

@Component({
	selector: 'publishment-card',
	templateUrl: './publishment-card.component.html',
	styleUrls: ['./publishment-card.component.scss'],
	encapsulation: ViewEncapsulation.None
})
export class PublishmentCardComponent implements OnInit {

	@Input()
	product: ProductDto;

	constructor() {
	}

	ngOnInit() {
		this.product = {
			id: '1234',
			code: 23,
			name: 'Anuncio',
			productType: ProductType.DRESS,
			photosURL: ['./assets/images/empty-placeholder.png'],
			actualPrice: 49.90,
			exPrice: 89.90,
			paymentType: [PaymentType.FREE_INTEREST],
			numberOfParcels: 3,
			colors: [EnumValues.getNameFromValue(ColorHex, ColorHex.WHITE)],
			sizes: [SizeType.M, SizeType.G],
			valueOfParcel: 16.63,
		};
	}

	converterCurrency(value: number | boolean) {
		if (value) {
			value = Number(value);
			return value.toLocaleString('pt-BR', { minimumFractionDigits: 2, style: 'currency', currency: 'BRL' });
		}
	}

	getValueOfParcels() {
		return isValid(this.product.actualPrice) && this.product.numberOfParcels !== 0 ? this.product.actualPrice / this.product.numberOfParcels : false;
	}
}
