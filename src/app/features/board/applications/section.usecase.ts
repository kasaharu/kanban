import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { take } from 'rxjs/operators';
import { Section, Task } from '../../../domain/models';
import { DatabaseAdapter } from '../../../infrastructures/adapters/database.adapter';
import { selectStore as selectAppShellStore } from '../../app-shell/store/app-shell.store';
import { actions, selectStore } from '../store/board.store';

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

    sections.forEach(async (section) => {
      await this.fetchTasksBySectionId(section.id);
    });
  }

  private async fetchTasksBySectionId(sectionId: string) {
    const tasks$ = this.databaseAdapter.fetchCollectionWhere<Task>('tasks', { key: 'sectionId', value: sectionId });
    const tasks = await tasks$.pipe(take(1)).toPromise();
    this.store.dispatch(actions.saveTasks({ sectionId, tasks }));
  }

  async addSection(addingSection: Section) {
    const user = await selectAppShellStore(this.store, (state) => state.loggedInUser)
      .pipe(take(1))
      .toPromise();
    // TODO: user が null の場合のエラー処理が必要
    if (user === null) {
      return;
    }

    const sections: Section[] = await selectStore(this.store, (state) => state.sections)
      .pipe(take(1))
      .toPromise();
    const createdSection = await this.databaseAdapter.createDocument<Section>('sections', {
      userId: user.uid,
      name: addingSection.name,
      orderId: sections.length + 1,
      id: 'temporary',
    });

    this.store.dispatch(actions.createSection({ section: createdSection }));
  }
}
