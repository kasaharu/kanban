import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { User } from '../../../domain/models';
import { Authenticator } from '../../../infrastructures/adapters/authenticator';
import { actions } from '../../app-shell/store/app-shell.store';

@Injectable({
  providedIn: 'root',
})
export class HomeUsecase {
  constructor(private store: Store<{}>, private authenticator: Authenticator) {}

  user$ = this.authenticator.loggedInUser$;

  async login() {
    try {
      const userCredential = await this.authenticator.login();
      if (userCredential.user) {
        const { displayName, email, phoneNumber, photoURL, providerId, uid } = userCredential.user;
        const user: User = { displayName, email, phoneNumber, photoURL, providerId, uid };
        this.store.dispatch(actions.login({ loggedInUser: user }));
      }
    } catch (error) {
      console.error(error);
    }
  }

  async logout() {
    await this.authenticator.logout();
    this.store.dispatch(actions.logout());
  }
}
