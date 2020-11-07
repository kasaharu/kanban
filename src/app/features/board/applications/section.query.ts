import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { combineLatest, Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { SectionHasTasks } from '../../../domain/models';
import { selectStore as selectBoardStore } from '../store/board.store';
import { selectStore as selectErrorStore } from '../store/error.store';

@Injectable({
  providedIn: 'root',
})
export class SectionQuery {
  constructor(private store: Store<{}>) {}

  // TODO: orderId 順にソートするロジックは domain 層に移動する
  private sections$ = selectBoardStore(this.store, (state) => state.sections).pipe(
    map(([...sections]) => {
      return sections.length === 0 ? sections : sections.sort((a, b) => a.orderId - b.orderId);
    }),
  );

  // TODO: orderId 順にソートするロジックは domain 層に移動する
  tasks$ = selectBoardStore(this.store, (state) => state.tasks).pipe(map(([...tasks]) => tasks.sort((a, b) => a.orderId - b.orderId)));

  private combined$ = combineLatest([this.sections$, this.tasks$]);

  sectionsHasTasks$: Observable<SectionHasTasks[]> = this.combined$.pipe(
    map(([sections, tasks]) => {
      return sections.map((section) => {
        const foundTasks = tasks.filter((task) => task.sectionId === section.id);
        return { id: section.id, name: section.name, userId: section.userId, orderId: section.orderId, tasks: foundTasks };
      });
    }),
  );

  errorMessage$ = selectErrorStore(this.store, (state) => state.errorMessage).pipe(filter((errorMessage) => errorMessage !== ''));
}
