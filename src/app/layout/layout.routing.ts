import { Component, Injectable, NgModule } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './auth/login/login.component';
import { HomeComponent } from './home/home.component';
import { CartComponent } from './cart/cart.component';
import { UserComponent } from './user/user.component';
import { AdminComponent } from '~layout/user/admin/admin.component';
import { ProductsCrudComponent } from '~layout/views/product/crud/crud.component';
import { ProductsListComponent } from '~layout/views/product/list/list.component';
import { ProductService } from '~core/entities/product/product.service';

@Injectable()
export class LayoutRoutingProductResolver implements Resolve<any> {
	constructor(private router: Router) {
	}

	public resolve() {
		this.router.navigate(['home']);
	}
}

@Injectable()
export class LayoutRoutingEntityResolver implements Resolve<any> {
	constructor() {
	}

	public resolve(): any[] {
		return [];
	}
}

@Injectable()
export class EditProductRequest implements Resolve<any> {
	constructor(private productService: ProductService) {
	}

	public resolve(route: ActivatedRouteSnapshot) {
		return this.productService.findOne(route.params.id);
	}
}

@Component({
	template: `
        <router-outlet></router-outlet>
	`
})
export class EmptyComponent {
}

export const routes: Routes = [
	{
		path: '',
		redirectTo: 'list/products',
		pathMatch: 'full'
	},
	{
		path: '',
		children: [
			{
				path: 'news',
				component: HomeComponent
			},
			{
				path: 'sales',
				component: DashboardComponent
			},
			{
				path: 'dress',
				component: DashboardComponent
			},
			{
				path: 'set',
				component: DashboardComponent
			},
			{
				path: 'shirt',
				component: DashboardComponent
			},
			{
				path: 'pant',
				component: DashboardComponent
			},
			{
				path: 'short',
				component: DashboardComponent
			},
		]
	},
	{
		path: 'add',
		children: [
			{
				path: 'product',
				component: ProductsCrudComponent
			},
		]
	},
	{
		path: 'edit',
		children: [
			{
				path: 'product/:id',
				component: ProductsCrudComponent,
				resolve: {
					request: EditProductRequest
				}
			},
		]
	},
	{
		path: 'list',
		children: [
			{
				path: 'products',
				component: ProductsListComponent
			}
		]
	},
	{
		path: 'login',
		component: LoginComponent
	},
	{
		path: 'user',
		children: [
			{
				path: '',
				component: UserComponent
			},
			{
				path: 'admin',
				component: AdminComponent
			}
		]
	},
	{
		path: 'cart',
		component: CartComponent
	},
	{ path: '**', redirectTo: '/news', pathMatch: 'full' }
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
	providers: [
		EditProductRequest,
	],
	declarations: [EmptyComponent]
})
export class LayoutRoutingModule {
}
