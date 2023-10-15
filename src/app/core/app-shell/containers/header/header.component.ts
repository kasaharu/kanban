import { NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed } from '@angular/core';
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
  constructor(private readonly _router: Router, private readonly _appInitializerService: AppInitializer) {}

  applicationName = 'kanban';
  $loggedIn = computed(() => this._appInitializerService.$loggedIn());

  async logout(): Promise<void> {
    await this._appInitializerService.logout();
    this._router.navigateByUrl('/home');
  }
}
