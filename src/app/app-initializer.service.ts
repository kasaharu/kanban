import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { firstValueFrom } from 'rxjs';
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
  readonly loggedInUser$ = this.select((state) => state.loggedInUser);

  readonly activate = this.updater((state, loggedInUser: User | null) => ({ ...state, loggedInUser, readyApp: true }));
  readonly _login = this.updater((state, loggedInUser: User | null) => ({ ...state, loggedInUser }));
  readonly _logout = this.updater((state) => ({ ...state, loggedInUser: null }));

  async initialize() {
    const loggedInUser = await firstValueFrom(this.authenticator.loggedInUser$);
    this.activate(loggedInUser);
  }

  async login() {
    const userCredential = await this.authenticator.login();
    const user = extractUserInfo(userCredential.user);
    this._login(user);
  }

  async logout(): Promise<void> {
    await this.authenticator.logout();
    this._logout();
  }
}
