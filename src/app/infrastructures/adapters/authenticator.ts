import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import { auth } from 'firebase';

@Injectable({
  providedIn: 'root',
})
export class Authenticator {
  constructor(private angularFireAuth: AngularFireAuth) {}

  loggedInUser$: Observable<firebase.User | null> = this.angularFireAuth.user;

  login() {
    this.angularFireAuth.signInWithPopup(new auth.GoogleAuthProvider());
  }

  logout() {
    this.angularFireAuth.signOut();
  }
}
