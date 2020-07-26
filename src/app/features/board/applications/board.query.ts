import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { filter, map } from 'rxjs/operators';
import { selectStore } from '../store/board.store';

@Injectable({
  providedIn: 'root',
})
export class BoardQuery {
  constructor(private store: Store<{}>) {}

  // TODO: orderId 順にソートするロジックは domain 層に移動する
  sections$ = selectStore(this.store, (state) => state.sections).pipe(
    filter((sections) => sections.length !== 0),
    map(([...sections]) => sections.sort((a, b) => a.orderId - b.orderId)),
  );
}
