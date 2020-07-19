import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Authenticator {
  constructor(private angularFireAuth: AngularFireAuth) {}

  loggedInUser$: Observable<firebase.User | null> = this.angularFireAuth.user;

  login(): Promise<auth.UserCredential> {
    return this.angularFireAuth.signInWithPopup(new auth.GoogleAuthProvider());
  }

  logout(): Promise<void> {
    return this.angularFireAuth.signOut();
  }
}
