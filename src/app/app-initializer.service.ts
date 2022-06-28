import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { User } from './domain/user/user';

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
  constructor() {
    super(initialState);
  }

  readonly readyApp$ = this.select((state) => state.readyApp);
  readonly loggedIn$ = this.select((state) => (state.loggedInUser ? true : false));

  readonly activate = this.updater((state, loggedInUser: User | null) => ({ ...state, loggedInUser, readyApp: true }));
  readonly login = this.updater((state, loggedInUser: User | null) => ({ ...state, loggedInUser }));
}
