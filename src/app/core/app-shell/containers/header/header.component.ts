import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Router } from '@angular/router';
import { AppShellQuery } from '../../applications/app-shell.query';
import { HeaderUsecase } from '../../applications/header.usecase';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  constructor(private readonly _router: Router, private readonly _query: AppShellQuery, private readonly _usecase: HeaderUsecase) {}

  applicationName = 'kanban';
  loggedIn$ = this._query.loggedIn$;

  async logout(): Promise<void> {
    await this._usecase.logout();
    this._router.navigateByUrl('/home');
  }
}
