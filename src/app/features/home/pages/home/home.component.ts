import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { HomeUsecase } from '../../applications/home.usecase';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomePageComponent implements OnInit {
  constructor(private homeUsecase: HomeUsecase) {}

  user$ = this.homeUsecase.user$;

  ngOnInit(): void {}

  login() {
    this.homeUsecase.login();
  }

  logout() {
    this.homeUsecase.logout();
  }
}
