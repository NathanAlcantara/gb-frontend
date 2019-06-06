import { Component, OnInit } from '@angular/core';
import { UserComponent } from '~layout/user/user.component';

@Component({
	selector: 'admin',
	templateUrl: './admin.component.html',
	styleUrls: ['./admin.component.scss']
})
export class AdminComponent extends UserComponent implements OnInit {

	constructor() {
		super();
	}

	ngOnInit() {
	}
}
