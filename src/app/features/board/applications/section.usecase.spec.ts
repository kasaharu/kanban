import { fakeAsync, flushMicrotasks, TestBed } from '@angular/core/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { of } from 'rxjs';
import { Task } from '../../../domain/models';
import { Section } from '../../../domain/section/section.vo';
import { User } from '../../../domain/user/user';
import { DatabaseAdapter } from '../../../infrastructures/adapters/database.adapter';
import { sectionFactory, taskFactory, userFactory } from '../../../testing/factories';
import { State as AppShellState } from '../../../shared/app-shell/store/app-shell.store';
import { actions, State as BoardState } from '../store/board.store';
import { actions as ErrorStoreAction } from '../store/error.store';
import { ErrorTypeEnum } from '../ui/helpers/error-message';
import { SectionUsecase } from './section.usecase';

class MockDatabaseAdapter implements Partial<DatabaseAdapter> {
  fetchCollectionWhere(): any {}
  createDocument(): any {}
}

interface MockStateType {
  appShell: AppShellState;
  board: BoardState;
}

const initialState: MockStateType = {
  appShell: {
    loggedInUser: null,
    readyApp: false,
  },
  board: {
    sections: [],
    tasks: [],
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

    it('ユーザー情報を取得できている場合 actions の saveSections() と saveTasks() が呼ばれる', async () => {
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

  describe('addSection() method', () => {
    it('ユーザー情報を取得できてない場合 undefined が返る', async () => {
      const addingSection: Section = sectionFactory({ name: 'section #1', userId: 'user001' });
      spyOn(store, 'dispatch');

      const result = await usecase.addSection(addingSection);

      expect(result).toBeUndefined();
      expect(store.dispatch).not.toHaveBeenCalled();
    });

    it('ユーザー情報を取得できている場合 actions の saveSections() と saveTasks() が呼ばれる', fakeAsync(() => {
      const user: User = userFactory({});
      const addingSection: Section = sectionFactory({ name: 'new section #15', userId: 'user001' });
      store.setState({ appShell: { loggedInUser: user }, board: { sections: [], tasks: [] } });
      spyOn(store, 'dispatch');
      spyOn(dbAdapter, 'createDocument').and.resolveTo(addingSection);

      usecase.addSection(addingSection);
      flushMicrotasks();

      expect(store.dispatch).toHaveBeenCalledWith(actions.createSection({ section: addingSection }));
    }));

    it('ユーザー情報を取得できているが section の名前が 15 文字より多い場合 undefined が返る', async () => {
      const user: User = userFactory({});
      const addingSection: Section = sectionFactory({ name: 'new section #016', userId: 'user001' });
      store.setState({ appShell: { loggedInUser: user }, board: { sections: [], tasks: [] } });
      spyOn(store, 'dispatch');

      const result = await usecase.addSection(addingSection);

      expect(result).toBeUndefined();
      expect(store.dispatch).toHaveBeenCalledWith(ErrorStoreAction.setError({ errorType: ErrorTypeEnum.OverSectionNameLength }));
    });
  });
});
