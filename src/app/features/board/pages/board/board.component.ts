import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  template: `<app-sections></app-sections>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BoardPageComponent {}
