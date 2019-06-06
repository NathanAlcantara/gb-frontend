import { NgModule } from '@angular/core';
import { LayoutRoutingModule } from './layout.routing';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './auth/login/login.component';
import { HomeComponent } from './home/home.component';
import { CartComponent } from './cart/cart.component';
import { UserComponent } from './user/user.component';
import { AdminComponent } from './user/admin/admin.component';
import { ViewsModule } from '~layout/views/views.module';
import { SharedModule } from '~shared/shared.module';

@NgModule({
	exports: [
		LayoutRoutingModule,
		ViewsModule
	],
	imports: [
		SharedModule,
		LayoutRoutingModule,
	],
	declarations: [DashboardComponent, LoginComponent, HomeComponent, CartComponent, UserComponent, AdminComponent]
})
export class LayoutModule {
}
