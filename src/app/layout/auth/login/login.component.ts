import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BaseFormComponent } from '~shared/bases/form.component';
import { Router } from '@angular/router';

@Component({
	selector: 'login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.scss']
})
export class LoginComponent extends BaseFormComponent implements OnInit {

	public formLogin: FormGroup;

	hide = true;

	constructor(
		protected _formBuilder: FormBuilder,
		private router: Router
	) {
		super(_formBuilder);
	}

	ngOnInit() {
		this.formLogin = this.createForm({
			email: [{ value: undefined, disabled: false }, Validators.compose([Validators.required, Validators.email])],
			password: [{ value: undefined, disabled: false }, Validators.compose([Validators.required])]
		});
	}

	submitForm() {
		if (this.formLogin.valid) {
			const values = this.formLogin.value;
			if (values.email == 'mariana@admin.com' && values.password == 'admin') {
				this.router.navigate(['list/products']);
			}
		}
	}
}
