import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { map, takeUntil } from 'rxjs/operators';
import { MatDialog } from '@angular/material';

import { BaseFormComponent } from '~shared/bases/form.component';
import { ImageModalComponent } from '~shared/components/image-modal/image-modal.component';
import { ToastService } from '~core/utils/toast.service';
import { ProductService } from '~core/entities/product/product.service';
import { defaultCatch, isValid } from '~core/utils/helpers';

import { Product } from '~core/entities/product/product';
import { PaymentType } from '~core/enums/parcel_type';
import { ProductType } from '~core/enums/product_type';
import { EnumValues } from 'enum-values';
import { ColorHex } from '~core/enums/color';
import { SizeType } from '~core/enums/size_type';
import { AWS_BUCKET_PHOTOS } from '~core/utils/constants';

@Component({
	selector: 'products-crud',
	templateUrl: './crud.component.html',
	styleUrls: ['./crud.component.scss']
})
export class ProductsCrudComponent extends BaseFormComponent implements OnInit {

	formCRUD: FormGroup;
	optionsPaymentType = Object.values(PaymentType);
	optionsProductType = Object.values(ProductType);
	optionsColorType = EnumValues.getNames(ColorHex);
	optionsSizeType = Object.values(SizeType);
	isLoading: boolean;

	path: string;

	private files: Blob[] = [];
	private images: string[] = [];
	private imagesToDelete: string[] = [];

	constructor(
		private router: Router,
		private route: ActivatedRoute,
		private _formBuilder: FormBuilder,
		private toast: ToastService,
		private dialog: MatDialog,
		private productService: ProductService) {
		super(_formBuilder);
	}

	ngOnInit() {
		this.route.data
			.pipe(takeUntil(this.ngUnsubscribe))
			.subscribe((data: any) => this.onRouteDataChange(data));

		this.formCRUD = this.createForm({
			code: [{ value: undefined, disabled: false }, Validators.compose([Validators.required])],
			name: [{ value: undefined, disabled: false }, Validators.compose([Validators.required])],
			productType: [{ value: undefined, disabled: false }, Validators.compose([Validators.required])],
			photosURL: [{ value: undefined, disabled: false }, Validators.compose([Validators.required])],
			actualPrice: [{ value: undefined, disabled: false }, Validators.compose([Validators.required])],
			exPrice: [{ value: undefined, disabled: false }],
			paymentType: [{ value: undefined, disabled: false }, Validators.compose([Validators.required])],
			numberOfParcels: [{ value: 1, disabled: false }, Validators.compose([Validators.min(1), Validators.max(99)])],
			colors: [{ value: undefined, disabled: false }, Validators.compose([Validators.required])],
			sizes: [{ value: undefined, disabled: false }],
			valueOfParcel: [{ value: undefined, disabled: false }],
		});

		this.path = this.route.snapshot.parent.routeConfig.path;

		if (this.path === 'edit') {
			this.query.valueChanges
				.pipe(
					takeUntil(this.ngUnsubscribe),
					map((result: any) => result.data.oneProduct),
					defaultCatch()
				).subscribe(
				(data: any) => {
					this.formCRUD.patchValue(data);
					this.images = data.photosURL.filter((link: string) => link.includes(AWS_BUCKET_PHOTOS));
					this.isLoading = false;
				},
				() => {
					this.isLoading = false;
				}
			);
		}
	}

	openDialog(): void {
		const dialogRef = this.dialog.open(ImageModalComponent, {
			maxWidth: '70%',
			maxHeight: '70%',
			data: { images: this.images },
		});

		dialogRef.afterClosed().subscribe(result => {
			if (isValid(result)) {
				if (isValid(result.image)) {
					this.files.push(result.file);
					this.images.push(result.image);
				}
				if (isValid(result.indexDeletedImages)) {
					const totalElementsSalved = this.images.filter((item: any) => item.includes(AWS_BUCKET_PHOTOS)).length;
					result.indexDeletedImages.forEach((index: number) => {
						this.files.splice(totalElementsSalved - index, 1);
					});
				}
				this.imagesToDelete = result.deletedImages;
				this.formCRUD.get('photosURL').patchValue(this.images);
			}
		});
	}

	async submitForm() {
		if (this.formCRUD.valid) {
			this.isLoading = true;
			const id = this.route.snapshot.params.id;
			const value = this.formCRUD.value;
			const variables = Product.toDto(value);

			await this.productService.addPhotos(this.files).toPromise()
				.then(response => {
					variables.photosURL = [...variables.photosURL, ...response['imagesUrl']];
				});

			if (isValid(this.imagesToDelete)) {
				this.productService.deletePhotos(this.imagesToDelete).toPromise().then();
			}

			let service: any;
			if (id) {
				service = this.productService.update(id, variables);
			} else {
				service = this.productService.insert(variables);
			}

			service.pipe(takeUntil(this.ngUnsubscribe))
				.subscribe(
					() => {
						this.toast.success(id ? 'message.success.edit_product' : 'message.success.create_product');
						this.isLoading = false;
						this.goBack();
					},
					(error: any) => {
						this.toast.error(id ? 'message.error.edit_product' : 'message.error.create_product');
						console.error('Deu um pau a enviar o produto', error);
						this.isLoading = false;
					}
				);
		}
	}

	goBack() {
		this.router.navigate(['list/products']);
	}

	deleteProduct() {
		this.isLoading = true;
		const productId = this.route.snapshot.params.id;

		this.productService.deletePhotos(this.images).toPromise().then();

		this.productService.delete(productId)
			.subscribe(() => {
				this.toast.success('message.success.delete_product');
				this.isLoading = false;
			}, (error) => {
				this.toast.error('message.error.delete_product');
				console.error('Deu um pau ao deletar esse produto', error);
				this.isLoading = false;
			});

		this.goBack();
	}

	private onRouteDataChange(data: any) {
		this.query = data.request;
	}
}
