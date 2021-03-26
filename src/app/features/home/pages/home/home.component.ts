import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  template: `<app-home></app-home>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomePageComponent {}
