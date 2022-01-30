import { Injectable } from '@angular/core';
import { createSelector, Store } from '@ngrx/store';
import { combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { SectionHasTasks } from '../../../domain/models';
import { selectSections, selectTasks } from '../store/board.store';
import { selectErrorMessage } from '../store/error.store';

@Injectable({
  providedIn: 'root',
})
export class SectionQuery {
  constructor(private store: Store<{}>) {}

  // TODO: orderId 順にソートするロジックは domain 層に移動する
  private sections$ = this.store.select(
    createSelector(selectSections, (sections) => (sections.length === 0 ? sections : [...sections].sort((a, b) => a.orderId - b.orderId))),
  );

  // TODO: orderId 順にソートするロジックは domain 層に移動する
  private tasks$ = this.store.select(createSelector(selectTasks, (tasks) => [...tasks].sort((a, b) => a.orderId - b.orderId)));

  private combined$ = combineLatest([this.sections$, this.tasks$]);

  sectionsHasTasks$: Observable<SectionHasTasks[]> = this.combined$.pipe(
    map(([sections, tasks]) => {
      return sections.map((section) => {
        const foundTasks = tasks.filter((task) => task.sectionId === section.id);
        return { id: section.id, name: section.name, userId: section.userId, orderId: section.orderId, tasks: foundTasks };
      });
    }),
  );

  errorMessage$ = this.store.select(createSelector(selectErrorMessage, (errorMessage) => errorMessage));
}
