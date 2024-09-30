import { NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AppInitializer } from '../../../../app-initializer';
import { ProfileIconComponent } from '../../components/profile-icon/profile-icon.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [RouterLink, NgIf, ProfileIconComponent],
})
export class HeaderComponent {
  private readonly appInitializer = inject(AppInitializer);
  constructor(private readonly _router: Router) {}

  applicationName = 'kanban';
  $loggedIn = computed(() => this.appInitializer.loggedIn());

  async logout(): Promise<void> {
    await this.appInitializer.logout();
    this._router.navigateByUrl('/home');
  }
}
