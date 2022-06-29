import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Router } from '@angular/router';
import { AppInitializerService } from '../../../../app-initializer.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
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
