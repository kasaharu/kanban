import { fakeAsync, flushMicrotasks, TestBed } from '@angular/core/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { of } from 'rxjs';
import { State as AppShellState } from '../../../core/app-shell/store/app-shell.store';
import { Task } from '../../../domain/models';
import { Section } from '../../../domain/section/section.vo';
import { User } from '../../../domain/user/user';
import { SectionGateway } from '../../../infrastructures/gateways/section.gateway';
import { TaskGateway } from '../../../infrastructures/gateways/task.gateway';
import { sectionFactory, taskFactory, userFactory } from '../../../testing/factories';
import { ErrorTypeEnum } from '../presenters/helpers/error-message';
import { actions, State as BoardState } from '../store/board.store';
import { actions as ErrorStoreAction } from '../store/error.store';
import { SectionUsecase } from './section.usecase';

class MockSectionGateway implements Partial<SectionGateway> {
  getSections(): any {}
  postSection(): any {}
}

class MockTaskGateway implements Partial<TaskGateway> {
  getTasks(): any {}
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
  let sectionGateway: SectionGateway;
  let taskGateway: TaskGateway;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideMockStore({ initialState }),
        { provide: SectionGateway, useClass: MockSectionGateway },
        { provide: TaskGateway, useClass: MockTaskGateway },
      ],
    });

    usecase = TestBed.inject(SectionUsecase);
    store = TestBed.inject(MockStore);
    sectionGateway = TestBed.inject(SectionGateway);
    taskGateway = TestBed.inject(TaskGateway);
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

      spyOn(sectionGateway, 'getSections').and.returnValue(of(returnValueSections));
      spyOn(taskGateway, 'getTasks').and.returnValue(of(returnValueTasks));
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
      spyOn(sectionGateway, 'postSection').and.returnValue(Promise.resolve(addingSection));

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
