import { AsyncPipe, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IconComponent } from '../../../../shared/presenters/icon/icon.component';
import { HomeUsecase } from '../../applications/home.usecase';

@Component({
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [NgIf, RouterLink, IconComponent, AsyncPipe],
})
export class HomePageComponent {
  constructor(private homeUsecase: HomeUsecase) {}
  $user = computed(() => this.homeUsecase.$user());

  login() {
    this.homeUsecase.login();
  }
}
