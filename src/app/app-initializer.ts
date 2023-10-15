import { Injectable, computed, inject, signal } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { User, extractUserInfo } from './domain/user/user';
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
export class AppInitializer {
  readonly #authenticator = inject(Authenticator);

  readonly $state = signal<State>(initialState);

  readonly $readyApp = computed(() => this.$state().readyApp);
  readonly $loggedIn = computed(() => (this.$state().loggedInUser ? true : false));
  readonly $loggedInUser = computed(() => this.$state().loggedInUser);

  async initialize() {
    const loggedInUser = await firstValueFrom(this.#authenticator.loggedInUser$);
    this.$state.set({ ...this.$state(), loggedInUser, readyApp: true });
  }

  async login() {
    const userCredential = await this.#authenticator.login();
    const user = extractUserInfo(userCredential.user);
    this.$state.set({ ...this.$state(), loggedInUser: user });
  }

  async logout(): Promise<void> {
    await this.#authenticator.logout();
    this.$state.set({ ...this.$state(), loggedInUser: null });
  }
}
