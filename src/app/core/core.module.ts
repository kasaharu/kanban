import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NgWorkboxComponentsModule } from '@kasaharu/ng-workbox/components';
import { StoreModule } from '@ngrx/store';
import { SharedModule } from '../shared/shared.module';
import { ProfileIconComponent } from './app-shell/components/profile-icon/profile-icon.component';
import { HeaderComponent } from './app-shell/containers/header/header.component';
import { appShellFeature } from './app-shell/store/app-shell.store';

@NgModule({
  declarations: [HeaderComponent, ProfileIconComponent],
  imports: [CommonModule, StoreModule.forFeature(appShellFeature), NgWorkboxComponentsModule, RouterModule, SharedModule],
  exports: [HeaderComponent],
})
export class CoreModule {}
