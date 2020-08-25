import { TestBed } from '@angular/core/testing';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { DatabaseAdapter } from '../../../infrastructures/adapters/database.adapter';
import { State as AppShellState } from '../../app-shell/store/app-shell.store';
import { SectionUsecase } from './section.usecase';
import { User, Section, Task } from '../../../domain/models';
import { of } from 'rxjs';
import { actions } from '../store/board.store';

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
      const user: User = { displayName: '', email: '', phoneNumber: '', photoURL: null, providerId: '', uid: '' };
      const returnValueSections: Section[] = [{ id: '', name: '', userId: '', orderId: 1 }];
      const returnValueTasks: Task[] = [{ id: '', name: '', sectionId: '', userId: '', orderId: 1 }];

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
