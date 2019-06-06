import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { BaseComponent } from '~shared/bases/base.component';

@Component({
	selector: 'base-form',
	template: ``
})
export class BaseFormComponent extends BaseComponent {

	constructor(protected formBuilder: FormBuilder) {
		super();
	}

	getErrorMessage = (validation: string, number?: number): any => {
		const errorMessages = {
			required: 'Campo obrigatório.',
			email: 'Tem que ser um e-mail',
			min: `Não é permitido números abaixo de ${ number }`,
			minLength: `Aqui vai no minímo ${ number } caracteres`,
			maxLength: `Aqui vai no máximo ${ number } caracteres`,
			imageRequired: 'Imagem obrigatória',
			actualSize: `Tamanho atual do arquivo: ${ number }`,
			maxSize: `Tamanho máximo permitido: ${ number }`,
		};

		return errorMessages[validation];
	};

	public createForm(controls: any) {
		return this.formBuilder.group(controls);
	}
}
