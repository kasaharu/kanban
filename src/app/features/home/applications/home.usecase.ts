import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { extractUserInfo } from '../../../domain/user/user';
import { Authenticator } from '../../../infrastructures/adapters/authenticator';
import { actions } from '../../../shared/app-shell/store/app-shell.store';

@Injectable({
  providedIn: 'root',
})
export class HomeUsecase {
  constructor(private store: Store<{}>, private authenticator: Authenticator) {}

  user$ = this.authenticator.loggedInUser$;

  async login() {
    try {
      const userCredential = await this.authenticator.login();
      const user = extractUserInfo(userCredential.user);
      this.store.dispatch(actions.login({ loggedInUser: user }));
    } catch (error) {
      console.error(error);
    }
  }

  async logout() {
    await this.authenticator.logout();
    this.store.dispatch(actions.logout());
  }
}
