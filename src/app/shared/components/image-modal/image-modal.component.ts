import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { BaseComponent } from '../../bases/base.component';

@Component({
	selector: 'n-image-modal',
	templateUrl: './image-modal.component.html',
	styleUrls: ['./image-modal.component.scss']
})
export class ImageModalComponent extends BaseComponent implements OnInit {

	hasAnyImage: boolean;

	constructor(
		@Inject(MAT_DIALOG_DATA) public data: any,
		public dialogRef: MatDialogRef<any>,
	) {
		super();
	}

	ngOnInit() {
		this.hasAnyImage = this.isValid(this.data.images);
	}

	cancel(): void {
		this.dialogRef.close();
	}

	confirm(event: any): void {
		if (this.isValid(event)) {
			this.dialogRef.close(event);
		}
	}
}
