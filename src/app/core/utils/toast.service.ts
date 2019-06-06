import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
	providedIn: 'root'
})
export class ToastService {

	private toast = Swal.mixin({
		toast: true,
		position: 'top-end',
		showConfirmButton: false,
		timer: 3000
	});

	constructor(private translate: TranslateService) {
	}

	success(title_key: string) {
		this.toast.fire({
			type: 'success',
			title: this.translate.instant(title_key),
		});
	}

	error(title_key: string) {
		this.toast.fire({
			type: 'error',
			title: this.translate.instant(title_key),
		});
	}
}
