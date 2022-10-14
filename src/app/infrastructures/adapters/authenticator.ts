import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';
import { map, Observable } from 'rxjs';
import { extractUserInfo } from '../../domain/user/user';

@Injectable({
  providedIn: 'root',
})
export class Authenticator {
  constructor(private angularFireAuth: AngularFireAuth) {}

  private _loggedInUser$: Observable<firebase.User | null> = this.angularFireAuth.user;
  loggedInUser$ = this._loggedInUser$.pipe(map((u) => extractUserInfo(u)));

  login(): Promise<firebase.auth.UserCredential> {
    return this.angularFireAuth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
  }

  logout(): Promise<void> {
    return this.angularFireAuth.signOut();
  }
}
