import { AsyncPipe, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IconComponent } from '../../../../shared/presenters/icon/icon.component';
import { HomeUsecase } from './home.usecase';

@Component({
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [NgIf, RouterLink, IconComponent, AsyncPipe],
  providers: [HomeUsecase],
})
export class HomeComponent {
  readonly #homeUsecase = inject(HomeUsecase);

  $user = computed(() => this.#homeUsecase.$user());

  login() {
    this.#homeUsecase.login();
  }
}
