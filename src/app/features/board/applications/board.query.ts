import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectStore } from '../store/board.store';

@Injectable({
  providedIn: 'root',
})
export class BoardQuery {
  constructor(private store: Store<{}>) {}

  sections$ = selectStore(this.store, (state) => state.sections);
}
