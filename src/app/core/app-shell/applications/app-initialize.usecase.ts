import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import firebase from 'firebase/compat/app';
import { take } from 'rxjs/operators';
import { extractUserInfo } from '../../../domain/user/user';
import { Authenticator } from '../../../infrastructures/adapters/authenticator';
import { actions } from '../store/app-shell.store';

@Injectable({
  providedIn: 'root',
})
export class AppInitializer {
  constructor(private store: Store<[]>, private authenticator: Authenticator) {}

  async initialize() {
    const user: firebase.User | null = await this.authenticator.loggedInUser$.pipe(take(1)).toPromise();
    const loggedInUser = extractUserInfo(user);
    this.store.dispatch(actions.initialize({ loggedInUser }));
  }
}
