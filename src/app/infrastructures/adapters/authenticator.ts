import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import firebase from 'firebase/app';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Authenticator {
  constructor(private angularFireAuth: AngularFireAuth) {}

  loggedInUser$: Observable<firebase.User | null> = this.angularFireAuth.user;

  login(): Promise<firebase.auth.UserCredential> {
    return this.angularFireAuth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
  }

  logout(): Promise<void> {
    return this.angularFireAuth.signOut();
  }
}
