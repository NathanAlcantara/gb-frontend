import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import Swal from 'sweetalert2';

export function isValid(value: any) {
	if (value === null) {
		return false;
	}
	const typeValue = typeof (value);
	switch (typeValue) {
		case 'object':
			if (Object.prototype.toString.call(value) === '[object Date]') {
				return true;
			}
			return Boolean(Object.entries(value).length);
		case 'string':
			return Boolean(value.trim());
		case 'undefined':
			return false;
		default:
			return true;
	}
}

export function defaultCatch(messageErrorTitle?: string) {
	return catchError((err: any) => {
		if (err) {
			const toast = Swal.mixin({
				toast: true,
				position: 'top-end',
				showConfirmButton: false,
				timer: 3000
			});

			toast.fire({
				type: 'error',
				title: messageErrorTitle ? messageErrorTitle : err
			});
		}

		return throwError(err);
	});
}
