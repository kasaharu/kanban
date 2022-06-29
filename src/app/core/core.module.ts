import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { ProfileIconComponent } from './app-shell/components/profile-icon/profile-icon.component';
import { HeaderComponent } from './app-shell/containers/header/header.component';

@NgModule({
  declarations: [HeaderComponent, ProfileIconComponent],
  imports: [CommonModule, RouterModule, SharedModule],
  exports: [HeaderComponent],
})
export class CoreModule {}
