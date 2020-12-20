import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AlertDialogComponent } from './alert-dialog/presenters/alert-dialog/alert-dialog.component';
import { IconComponent } from './presenters/icon/icon.component';

@NgModule({
  declarations: [AlertDialogComponent, IconComponent],
  imports: [CommonModule],
  exports: [AlertDialogComponent, IconComponent],
})
export class SharedModule {}
