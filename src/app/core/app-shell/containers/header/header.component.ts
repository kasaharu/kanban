import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AppInitializerService } from '../../../../app-initializer.service';
import { ProfileIconComponent } from '../../components/profile-icon/profile-icon.component';
import { NgIf, AsyncPipe } from '@angular/common';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [
        RouterLink,
        NgIf,
        ProfileIconComponent,
        AsyncPipe,
    ],
})
export class HeaderComponent {
  constructor(private readonly _router: Router, private readonly _appInitializerService: AppInitializerService) {}

  applicationName = 'kanban';
  loggedIn$ = this._appInitializerService.loggedIn$;

  async logout(): Promise<void> {
    await this._appInitializerService.logout();
    this._router.navigateByUrl('/home');
  }
}
