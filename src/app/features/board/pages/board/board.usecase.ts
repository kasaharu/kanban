import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import firebase from 'firebase/compat/app';
import { take } from 'rxjs/operators';
import { Section } from '../../../../domain/section/section.vo';
import { Task } from '../../../../domain/task/task';
import { extractUserInfo, User } from '../../../../domain/user/user';
import { Authenticator } from '../../../../infrastructures/adapters/authenticator';
import { SectionGateway } from '../../../../infrastructures/gateways/section.gateway';
import { TaskGateway } from '../../../../infrastructures/gateways/task.gateway';

export interface BoardState {
  sections: Section[];
  tasks: Task[];
}

export const initialState: BoardState = {
  sections: [],
  tasks: [],
};

@Injectable()
export class BoardUsecase extends ComponentStore<BoardState> {
  constructor(
    private authenticator: Authenticator,
    private readonly _sectionGateway: SectionGateway,
    private readonly _taskGateway: TaskGateway,
  ) {
    super(initialState);
  }

  readonly sections$ = this.select((state) => state.sections);
  readonly saveSections = this.updater((state, sections: Section[]) => ({ ...state, sections }));

  readonly tasks$ = this.select((state) => state.tasks);
  readonly saveTasks = this.updater((state, tasks: Task[]) => ({ ...state, tasks }));

  async fetchBoardItem() {
    const user: firebase.User | null = await this.authenticator.loggedInUser$.pipe(take(1)).toPromise();
    const loggedInUser = extractUserInfo(user);
    if (loggedInUser === null) {
      return;
    }

    await this.fetchSections(loggedInUser);
    await this.fetchTasks(loggedInUser);
  }

  async fetchSections(loggedInUser: User) {
    const sections$ = this._sectionGateway.getSections(loggedInUser.uid);
    const sections = await sections$.pipe(take(1)).toPromise();
    this.saveSections(sections);
  }

  async fetchTasks(loggedInUser: User) {
    const tasks$ = this._taskGateway.getTasks(loggedInUser.uid);
    const tasks = await tasks$.pipe(take(1)).toPromise();
    this.saveTasks(tasks);
  }
}
