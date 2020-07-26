import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { take } from 'rxjs/operators';
import { User } from 'src/app/domain/models';
import { Authenticator } from '../../../infrastructures/adapters/authenticator';
import { actions } from '../store/app-shell.store';

@Injectable({
  providedIn: 'root',
})
export class AppInitializeUsecase {
  constructor(private store: Store<[]>, private authenticator: Authenticator) {}

  async initialize() {
    const user: firebase.User | null = await this.authenticator.loggedInUser$.pipe(take(1)).toPromise();
    const loggedInUser: User | null = user
      ? {
          displayName: user.displayName,
          email: user.email,
          phoneNumber: user.phoneNumber,
          photoURL: user.photoURL,
          providerId: user.providerId,
          uid: user.uid,
        }
      : null;
    this.store.dispatch(actions.initialize({ loggedInUser }));
  }
}
