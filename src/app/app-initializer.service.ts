import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import firebase from 'firebase/compat/app';
import { firstValueFrom } from 'rxjs';
import { take } from 'rxjs/operators';
import { extractUserInfo, User } from './domain/user/user';
import { Authenticator } from './infrastructures/adapters/authenticator';

interface State {
  loggedInUser: User | null;
  readyApp: boolean;
}

const initialState: State = {
  loggedInUser: null,
  readyApp: false,
};

@Injectable({
  providedIn: 'root',
})
export class AppInitializerService extends ComponentStore<State> {
  constructor(private authenticator: Authenticator) {
    super(initialState);
  }

  readonly readyApp$ = this.select((state) => state.readyApp);
  readonly loggedIn$ = this.select((state) => (state.loggedInUser ? true : false));

  readonly activate = this.updater((state, loggedInUser: User | null) => ({ ...state, loggedInUser, readyApp: true }));
  readonly login = this.updater((state, loggedInUser: User | null) => ({ ...state, loggedInUser }));
  readonly _logout = this.updater((state) => ({ ...state, loggedInUser: null }));

  async initialize() {
    const user: firebase.User | null = await firstValueFrom(this.authenticator.loggedInUser$.pipe(take(1)));
    const loggedInUser = extractUserInfo(user);
    this.activate(loggedInUser);
  }

  async logout(): Promise<void> {
    await this.authenticator.logout();
    this._logout();
  }
}
