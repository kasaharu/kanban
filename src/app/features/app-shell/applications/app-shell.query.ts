import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectStore } from '../store/app-shell.store';

@Injectable({
  providedIn: 'root',
})
export class AppShellQuery {
  constructor(private store: Store<{}>) {}

  readyApp$ = selectStore(this.store, (state) => state.readyApp);
}
