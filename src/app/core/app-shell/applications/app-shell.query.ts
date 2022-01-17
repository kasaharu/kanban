import { Injectable } from '@angular/core';
import { createSelector, Store } from '@ngrx/store';
import { selectLoggedInUser, selectReadyApp } from '../store/app-shell.store';

@Injectable({
  providedIn: 'root',
})
export class AppShellQuery {
  constructor(private store: Store<{}>) {}

  readyApp$ = this.store.select(createSelector(selectReadyApp, (readyApp) => readyApp));
  loggedIn$ = this.store.select(createSelector(selectLoggedInUser, (loggedInUser) => (loggedInUser ? true : false)));
}
