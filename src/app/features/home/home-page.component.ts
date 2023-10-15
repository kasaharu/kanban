import { ChangeDetectionStrategy, Component } from '@angular/core';
import { HomeComponent } from './containers/home/home.component';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [HomeComponent],
  template: `<app-home></app-home>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class HomePageComponent {}
