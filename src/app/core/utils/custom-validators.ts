import { FormControl } from '@angular/forms';
import { isValid } from './helpers';

export function requiredTrim(control: FormControl) {
	return isValid(control.value) ? null : {
		required: {
			valid: false
		}
	};
}
