import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import firebase from 'firebase/compat/app';
import { combineLatest, Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { SectionHasTasks } from '../../../../domain/models';
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

  private readonly sections$ = this.select(({ sections }) => {
    return sections.length === 0 ? sections : [...sections].sort((a, b) => a.orderId - b.orderId);
  });
  private readonly tasks$ = this.select(({ tasks }) => {
    return [...tasks].sort((a, b) => a.orderId - b.orderId);
  });

  private combined$ = combineLatest([this.sections$, this.tasks$]);
  sectionsHasTasks$: Observable<SectionHasTasks[]> = this.combined$.pipe(
    map(([sections, tasks]) => {
      return sections.map((section) => {
        const foundTasks = tasks.filter((task) => task.sectionId === section.id);
        return { id: section.id, name: section.name, userId: section.userId, orderId: section.orderId, tasks: foundTasks };
      });
    }),
  );

  readonly saveSections = this.updater((state, sections: Section[]) => ({ ...state, sections }));
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

  moveSection(sectionsHasTasks: SectionHasTasks[]) {
    sectionsHasTasks.forEach((sectionHasTasks, index) => {
      const section: Section = { id: sectionHasTasks.id, name: sectionHasTasks.name, userId: sectionHasTasks.userId, orderId: index + 1 };
      this._sectionGateway.putSection(section);
    });
  }

  moveTask(tasks: Task[]) {
    tasks.forEach((task, index) => {
      const updatedTask: Task = { ...task, orderId: index + 1 };
      this._taskGateway.putTask(updatedTask);
    });
  }

  async transferTask(sourceTasks: Task[], destinationTasks: Task[], destinationSectionId: string) {
    destinationTasks.forEach((task, index) => {
      const updatedTask: Task = { ...task, orderId: index + 1, sectionId: destinationSectionId };
      this._taskGateway.putTask(updatedTask);
    });

    sourceTasks.forEach((task, index) => {
      const updatedTask: Task = { ...task, orderId: index + 1 };
      this._taskGateway.putTask(updatedTask);
    });
  }
}
