import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NgWorkboxComponentsModule } from '@kasaharu/ng-workbox/components';
import { StoreModule } from '@ngrx/store';
import { SharedModule } from '../shared/shared.module';
import { HeaderComponent } from './app-shell/containers/header/header.component';
import { default as reducer, featureName } from './app-shell/store/app-shell.store';

@NgModule({
  declarations: [HeaderComponent],
  imports: [CommonModule, StoreModule.forFeature(featureName, reducer), NgWorkboxComponentsModule, RouterModule, SharedModule],
  exports: [HeaderComponent],
})
export class CoreModule {}
