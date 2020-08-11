import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { combineLatest, Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { SectionHasTasks } from '../../../domain/models';
import { selectStore } from '../store/board.store';

@Injectable({
  providedIn: 'root',
})
export class BoardQuery {
  constructor(private store: Store<{}>) {}

  // TODO: orderId 順にソートするロジックは domain 層に移動する
  private sections$ = selectStore(this.store, (state) => state.sections).pipe(
    filter((sections) => sections.length !== 0),
    map(([...sections]) => sections.sort((a, b) => a.orderId - b.orderId)),
  );

  // TODO: orderId 順にソートするロジックは domain 層に移動する
  tasks$ = selectStore(this.store, (state) => state.tasks).pipe(
    filter((tasks) => tasks.length !== 0),
    map(([...tasks]) => tasks.sort((a, b) => a.orderId - b.orderId)),
  );

  private combined$ = combineLatest([this.sections$, this.tasks$]);

  sectionsHasTasks$: Observable<SectionHasTasks[]> = this.combined$.pipe(
    map(([sections, tasks]) => {
      return sections.map((section) => {
        const foundTasks = tasks.filter((task) => task.sectionId === section.id);
        return { id: section.id, name: section.name, tasks: foundTasks };
      });
    }),
  );
}
