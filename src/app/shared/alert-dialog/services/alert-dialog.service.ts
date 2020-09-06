import { Overlay } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { Injectable, Injector } from '@angular/core';
import { AlertDialogComponent, AlertDialogData, OVERLAY_DATA, OVERLAY_REF } from '../presenters/alert-dialog/alert-dialog.component';

@Injectable({
  providedIn: 'root',
})
export class AlertDialogService {
  constructor(private readonly overlay: Overlay) {}

  show(title: string, message: string) {
    const overlayRef = this.overlay.create({
      positionStrategy: this.overlay.position().global().centerHorizontally().centerVertically(),
      hasBackdrop: true,
      scrollStrategy: this.overlay.scrollStrategies.block(),
    });

    const componentPortal = new ComponentPortal(
      AlertDialogComponent,
      null,
      Injector.create([
        { provide: OVERLAY_REF, useValue: overlayRef },
        { provide: OVERLAY_DATA, useValue: { title, message } as AlertDialogData },
      ]),
    );

    overlayRef.attach(componentPortal);
  }
}
