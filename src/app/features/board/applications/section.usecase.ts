import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { take } from 'rxjs/operators';
import { DatabaseAdapter } from '../../../infrastructures/adapters/database.adapter';
import { selectStore as selectAppShellStore } from '../../app-shell/store/app-shell.store';
import { actions } from '../store/board.store';
import { Section } from 'src/app/domain/models';

@Injectable({
  providedIn: 'root',
})
export class SectionUsecase {
  constructor(private store: Store<{}>, private databaseAdapter: DatabaseAdapter) {}

  async fetchSections() {
    const loggedInUser = await selectAppShellStore(this.store, (state) => state.loggedInUser)
      .pipe(take(1))
      .toPromise();

    if (loggedInUser === null) {
      return;
    }

    const sections$ = this.databaseAdapter.fetchCollectionWhere<Section>('sections', { key: 'userId', value: loggedInUser.uid });
    const sections = await sections$.pipe(take(1)).toPromise();
    this.store.dispatch(actions.saveSections({ sections }));
  }
}
