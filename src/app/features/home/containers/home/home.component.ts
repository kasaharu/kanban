import { ChangeDetectionStrategy, Component } from '@angular/core';
import { HomeUsecase } from '../../applications/home.usecase';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {
  constructor(private homeUsecase: HomeUsecase) {}
  user$ = this.homeUsecase.user$;

  login() {
    this.homeUsecase.login();
  }

  logout() {
    this.homeUsecase.logout();
  }
}
