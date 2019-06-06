import { NgModule } from '@angular/core';

import { SharedModule } from '~shared/shared.module';
import { ProductsListComponent } from '~layout/views/product/list/list.component';
import { ProductsCrudComponent } from '~layout/views/product/crud/crud.component';

@NgModule({
	declarations: [ProductsListComponent, ProductsCrudComponent],
	imports: [SharedModule]
})
export class ViewsModule {
}
