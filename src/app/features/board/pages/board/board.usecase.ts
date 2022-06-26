import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import firebase from 'firebase/compat/app';
import { combineLatest, firstValueFrom, Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { SectionHasTasks } from '../../../../domain/models';
import { Section, SectionValueObject } from '../../../../domain/section/section.vo';
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

  readonly createSection = this.updater((state, section: Section) => ({ ...state, sections: [...state.sections, section] }));
  readonly updateSection = this.updater((state, section: Section) => ({
    ...state,
    sections: state.sections.map((x) => (x.id === section.id ? section : x)),
  }));
  readonly removeSection = this.updater((state, sectionId: string) => ({
    ...state,
    sections: state.sections.filter((section) => section.id !== sectionId),
  }));
  readonly addTask = this.updater((state, task: Task) => ({ ...state, tasks: [...state.tasks, task] }));
  readonly removeTask = this.updater((state, taskId: string) => ({ ...state, tasks: state.tasks.filter((task) => task.id !== taskId) }));

  async fetchBoardItem() {
    const user: firebase.User | null = await firstValueFrom(this.authenticator.loggedInUser$.pipe(take(1)));
    const loggedInUser = extractUserInfo(user);
    if (loggedInUser === null) {
      return;
    }

    await this.fetchSections(loggedInUser);
    await this.fetchTasks(loggedInUser);
  }

  async fetchSections(loggedInUser: User) {
    const sections$ = this._sectionGateway.getSections(loggedInUser.uid);
    const sections = await firstValueFrom(sections$.pipe(take(1)));
    this.saveSections(sections);
  }

  async fetchTasks(loggedInUser: User) {
    const tasks$ = this._taskGateway.getTasks(loggedInUser.uid);
    const tasks = await firstValueFrom(tasks$.pipe(take(1)));
    this.saveTasks(tasks);
  }

  moveSection(sectionsHasTasks: SectionHasTasks[]) {
    sectionsHasTasks.forEach((sectionHasTasks, index) => {
      const section: Section = { id: sectionHasTasks.id, name: sectionHasTasks.name, userId: sectionHasTasks.userId, orderId: index + 1 };
      this._sectionGateway.putSection(section);
    });
  }

  async addSection(addingSection: Section) {
    const user: firebase.User | null = await firstValueFrom(this.authenticator.loggedInUser$.pipe(take(1)));
    const loggedInUser = extractUserInfo(user);
    if (loggedInUser === null) {
      return;
    }

    const sections: Section[] = await firstValueFrom(this.sections$);

    try {
      const newerSection = SectionValueObject.create(addingSection.name, loggedInUser.uid, sections.length + 1);
      const createdSection = await this._sectionGateway.postSection(newerSection.plainObject());
      this.createSection(createdSection);
    } catch (_) {
      // TODO: セクション名が 15 文字(ErrorTypeEnum.OverSectionNameLength) を超えた場合にエラーメッセージを出す
      // tslint:disable-next-line:no-console
      console.log('セクション名が長すぎます');
    }
  }

  async deleteSection(section: SectionHasTasks) {
    const taskIds = section.tasks.map((task) => task.id);
    // NOTE: 対象の Section に紐づく task を削除
    taskIds.forEach((taskId) => {
      this.deleteTask(taskId);
    });

    // NOTE: 対象の Section を削除
    const deletedSectionId = await this._sectionGateway.deleteSection(section);
    this.removeSection(deletedSectionId);
  }

  async updateSectionName(newName: string, section: SectionHasTasks) {
    try {
      const updatedSection = SectionValueObject.create(newName, section.userId, section.orderId, section.id);
      await this._sectionGateway.putSection(updatedSection.plainObject());
      this.updateSection(updatedSection);
    } catch (error) {
      // TODO: セクション名が 15 文字(ErrorTypeEnum.OverSectionNameLength) を超えた場合にエラーメッセージを出す
      // tslint:disable-next-line:no-console
      console.log('セクション名が長すぎます');
    }
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

  async createTask(addingTask: Task, section: SectionHasTasks) {
    const user: firebase.User | null = await firstValueFrom(this.authenticator.loggedInUser$.pipe(take(1)));
    const loggedInUser = extractUserInfo(user);
    if (loggedInUser === null) {
      return;
    }

    const createdTask = await this._taskGateway.postTask({
      userId: loggedInUser.uid,
      name: addingTask.name,
      sectionId: section.id,
      orderId: section.tasks.length + 1,
      id: 'temporary',
    });

    this.addTask(createdTask);
  }

  async deleteTask(taskId: string) {
    const deletedTaskId = await this._taskGateway.deleteTask(taskId);
    this.removeTask(deletedTaskId);
  }
}
