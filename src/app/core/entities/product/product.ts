import { TranslateService } from '@ngx-translate/core';

import { PaymentType } from '~core/enums/parcel_type';
import { ProductType } from '~core/enums/product_type';

import { isValid } from '~core/utils/helpers';
import { AWS_BUCKET_PHOTOS } from '../../utils/constants';

export interface ProductDto {
	id: any;
	code: number;
	name: string;
	productType: string;
	photosURL?: string[];
	actualPrice: number;
	exPrice?: number;
	paymentType: string[];
	numberOfParcels?: number;
	colors: string[];
	sizes: string[];
	valueOfParcel?: number;
}

export class Product {
	public id: any;
	public code: number;
	public name: string;
	public productType: ProductType;
	public photosURL?: string[];
	public actualPrice: number;
	public exPrice?: number;
	public paymentType?: PaymentType[];
	public numberOfParcels?: number;
	public colors: string[];
	public sizes: string[];
	public valueOfParcel: number;

	public static fromDto(productDto: ProductDto, translate: TranslateService): Product {
		const model = { ...productDto };

		model.paymentType = model.paymentType.map((type: any) => translate.instant('enum.payment_type_' + type.toLowerCase()));
		model.productType = translate.instant('enum.product_type_' + model.productType.toLowerCase());

		return model as Product;
	}

	public static toDto(product: Product): ProductDto {
		const dto = { ...product };

		dto.photosURL = dto.photosURL.filter((link: string) => link.includes(AWS_BUCKET_PHOTOS));

		dto.actualPrice = parseFloat(dto.actualPrice.toString().replace(',', '.'));

		if (isValid(dto.exPrice)) {
			dto.exPrice = parseFloat(dto.exPrice.toString().replace(',', '.'));
		}

		dto.valueOfParcel = parseFloat(Math.abs(dto.actualPrice / dto.numberOfParcels).toFixed(2).replace(',', '.'));

		return dto as ProductDto;
	}
}
