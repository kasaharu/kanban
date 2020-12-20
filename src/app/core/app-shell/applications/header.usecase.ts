import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Authenticator } from '../../../infrastructures/adapters/authenticator';
import { actions } from '../store/app-shell.store';

@Injectable({
  providedIn: 'root',
})
export class HeaderUsecase {
  constructor(private readonly _store: Store<[]>, private readonly _authenticator: Authenticator) {}

  async logout(): Promise<void> {
    await this._authenticator.logout();
    this._store.dispatch(actions.logout());
  }
}
