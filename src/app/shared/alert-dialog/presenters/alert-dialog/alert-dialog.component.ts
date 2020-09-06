import { OverlayRef } from '@angular/cdk/overlay';
import { ChangeDetectionStrategy, Component, Inject, InjectionToken } from '@angular/core';

export type AlertDialogData = {
  title: string;
  message: string;
};

export const OVERLAY_REF = new InjectionToken<OverlayRef>('OVERLAY_REF');
export const OVERLAY_DATA = new InjectionToken<AlertDialogData>('OVERLAY_DATA');

@Component({
  selector: 'app-alert-dialog',
  templateUrl: './alert-dialog.component.html',
  styleUrls: ['./alert-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AlertDialogComponent {
  constructor(
    @Inject(OVERLAY_REF) private readonly overlayRef: OverlayRef,
    @Inject(OVERLAY_DATA) private readonly alertDialogData: AlertDialogData,
  ) {}

  get title(): string {
    return this.alertDialogData.title;
  }

  get message(): string {
    return this.alertDialogData.message;
  }

  close() {
    this.overlayRef.dispose();
  }
}
