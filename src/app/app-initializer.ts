import { computed, inject } from '@angular/core';
import { patchState, signalStore, withComputed, withMethods, withState } from '@ngrx/signals';
import { firstValueFrom } from 'rxjs';
import { extractUserInfo, User } from './domain/user/user';
import { Authenticator } from './infrastructures/adapters/authenticator';

type AppState = {
  loggedInUser: User | null;
  readyApp: boolean;
};

const initialState: AppState = {
  loggedInUser: null,
  readyApp: false,
};

export const AppInitializer = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withComputed(({ loggedInUser }) => ({ loggedIn: computed(() => loggedInUser() !== null) })),
  withMethods((store, authenticator = inject(Authenticator)) => ({
    async initialize(): Promise<void> {
      const loggedInUser = await firstValueFrom(authenticator.loggedInUser$);
      patchState(store, { loggedInUser, readyApp: true });
    },
    async login(): Promise<void> {
      const userCredential = await authenticator.login();
      const user = extractUserInfo(userCredential.user);
      patchState(store, { loggedInUser: user });
    },
    async logout(): Promise<void> {
      await authenticator.logout();
      patchState(store, { loggedInUser: null });
    },
  })),
);
