import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MaterialModule } from '~shared/bases/material.module';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { TranslateModule } from '@ngx-translate/core';
import { MaterialFileInputModule } from 'ngx-material-file-input';
import { ImageCropperModule } from 'ngx-image-cropper';
import { CarouselModule, WavesModule } from 'angular-bootstrap-md';

import { BaseComponent } from '~shared/bases/base.component';
import { BaseFormComponent } from '~shared/bases/form.component';
import { BaseListComponent } from './bases/list.component';
import { EmptyStateComponent } from './components/empty-state/empty-state.component';
import { FooterComponent } from './footer/footer.component';
import { GbListComponent } from './components/gb-list/gb-list.component';
import { HeaderComponent } from './header/header.component';
import { ImageModalComponent } from './components/image-modal/image-modal.component';
import { InteractIconComponent } from './components/interact-icon/interact-icon.component';
import { PublishmentCardComponent } from './components/publishment-card/publishment-card.component';
import { SearchBarComponent } from './header/search-bar/search-bar.component';
import { UploadImageComponent } from './components/image-modal/upload-image/upload-image.component';
import { ViewImagesComponent } from './components/image-modal/view-images/view-images.component';

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		ReactiveFormsModule,
		TranslateModule,
		MaterialModule,
		MaterialFileInputModule,
		// MDBBootstrapModule.forRoot(),
		SweetAlert2Module.forRoot(),
		ImageCropperModule,
		CarouselModule,
		WavesModule,
	],
	exports: [
		CommonModule,
		EmptyStateComponent,
		FormsModule,
		FooterComponent,
		GbListComponent,
		HeaderComponent,
		ImageModalComponent,
		MaterialModule,
		PublishmentCardComponent,
		ReactiveFormsModule,
		TranslateModule,
		SweetAlert2Module
	],
	declarations: [
		BaseComponent,
		BaseFormComponent,
		BaseListComponent,
		EmptyStateComponent,
		FooterComponent,
		GbListComponent,
		HeaderComponent,
		ImageModalComponent,
		InteractIconComponent,
		SearchBarComponent,
		PublishmentCardComponent,
		UploadImageComponent,
		ViewImagesComponent,
	],
	entryComponents: [ImageModalComponent]
})
export class SharedModule {
}
