import { ChangeDetectionStrategy, Component } from '@angular/core';
import { HomeUsecase } from '../../applications/home.usecase';
import { IconComponent } from '../../../../shared/presenters/icon/icon.component';
import { RouterLink } from '@angular/router';
import { NgIf, AsyncPipe } from '@angular/common';

@Component({
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [NgIf, RouterLink, IconComponent, AsyncPipe],
})
export class HomePageComponent {
  constructor(private homeUsecase: HomeUsecase) {}
  user$ = this.homeUsecase.user$;

  login() {
    this.homeUsecase.login();
  }
}
