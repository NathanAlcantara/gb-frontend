import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { BaseFormComponent } from '../../../bases/form.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FileValidator } from 'ngx-material-file-input';
import { ImageCroppedEvent } from 'ngx-image-cropper';

@Component({
	selector: 'n-upload-image',
	templateUrl: './upload-image.component.html',
	styleUrls: ['./upload-image.component.scss']
})
export class UploadImageComponent extends BaseFormComponent implements OnInit {

	@Input()
	data: any;

	@Output()
	onAddPhoto = new EventEmitter();
	@Output()
	onCancel = new EventEmitter();

	formImageUpload: FormGroup;
	imageChangedEvent: any;

	constructor(private _formBuilder: FormBuilder) {
		super(_formBuilder);
	}

	ngOnInit() {
		this.formImageUpload = this.createForm({
			image: [{ value: undefined, disabled: false }, Validators.compose([Validators.required, FileValidator.maxContentSize(512000)])]
		});
	}

	fileChangeEvent(event: any): void {
		this.imageChangedEvent = event;
	}

	imageCropped(event: ImageCroppedEvent) {
		this.data.image = event.base64;
		this.data.file = event.file;
	}

	addPhoto(): void {
		if (this.formImageUpload.valid) {
			this.onAddPhoto.emit(this.data);
		}
	}
}
