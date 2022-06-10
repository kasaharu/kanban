import { ChangeDetectionStrategy, Component } from '@angular/core';
import { HomeUsecase } from '../../applications/home.usecase';

@Component({
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomePageComponent {
  constructor(private homeUsecase: HomeUsecase) {}
  user$ = this.homeUsecase.user$;

  login() {
    this.homeUsecase.login();
  }
}
