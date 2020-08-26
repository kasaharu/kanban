import { TestBed } from '@angular/core/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { of } from 'rxjs';
import { Section, Task, User } from '../../../domain/models';
import { DatabaseAdapter } from '../../../infrastructures/adapters/database.adapter';
import { sectionFactory, taskFactory, userFactory } from '../../../testing/factories';
import { State as AppShellState } from '../../app-shell/store/app-shell.store';
import { actions } from '../store/board.store';
import { SectionUsecase } from './section.usecase';

class MockDatabaseAdapter implements Partial<DatabaseAdapter> {
  fetchCollectionWhere(): any {}
}

interface MockStateType {
  appShell: AppShellState;
}

const initialState: MockStateType = {
  appShell: {
    loggedInUser: null,
    readyApp: false,
  },
};

describe('SectionUsecase', () => {
  let usecase: SectionUsecase;
  let store: MockStore<{}>;
  let dbAdapter: DatabaseAdapter;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideMockStore({ initialState }), { provide: DatabaseAdapter, useClass: MockDatabaseAdapter }],
    });

    usecase = TestBed.inject(SectionUsecase);
    store = TestBed.inject(MockStore);
    dbAdapter = TestBed.inject(DatabaseAdapter);
  });

  it('should be created', () => {
    expect(usecase).toBeTruthy();
  });

  describe('fetchSections() method', () => {
    it('ユーザー情報を取得できてない場合 undefined が返る', async () => {
      spyOn(store, 'dispatch');

      const result = await usecase.fetchSections();

      expect(result).toBeUndefined();
      expect(store.dispatch).not.toHaveBeenCalled();
    });

    it('ユーザー情報を取得できている場合 undefined が返る', async () => {
      const user: User = userFactory({});
      const returnValueSections: Section[] = [sectionFactory({})];
      const returnValueTasks: Task[] = [taskFactory({})];

      store.setState({ appShell: { loggedInUser: user } });

      // NOTE: 1 回目は Section[] の fetch
      //       2 回目は Task[] の fetch
      spyOn(dbAdapter, 'fetchCollectionWhere').and.returnValues(of(returnValueSections), of(returnValueTasks));

      spyOn(store, 'dispatch');

      await usecase.fetchSections();

      expect(store.dispatch).toHaveBeenCalledWith(actions.saveSections({ sections: returnValueSections }));
      expect(store.dispatch).toHaveBeenCalledWith(actions.saveTasks({ tasks: returnValueTasks }));
    });
  });
});
