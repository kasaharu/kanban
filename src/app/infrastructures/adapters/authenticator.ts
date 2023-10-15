import { inject, Injectable } from '@angular/core';
import { Auth, GoogleAuthProvider, signInWithPopup, signOut, user, UserCredential } from '@angular/fire/auth';
import { map } from 'rxjs';
import { extractUserInfo } from '../../domain/user/user';

@Injectable({
  providedIn: 'root',
})
export class Authenticator {
  readonly #auth = inject(Auth);

  // Deprecated: Use `AppInitializer#$loggedInUser` instead.
  loggedInUser$ = user(this.#auth).pipe(map((u) => extractUserInfo(u)));

  login(): Promise<UserCredential> {
    return signInWithPopup(this.#auth, new GoogleAuthProvider());
  }

  logout(): Promise<void> {
    return signOut(this.#auth);
  }
}
