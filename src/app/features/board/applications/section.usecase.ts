import { Injectable } from '@angular/core';
import { createSelector, Store } from '@ngrx/store';
import { take } from 'rxjs/operators';
import { selectLoggedInUser } from '../../../core/app-shell/store/app-shell.store';
import { SectionHasTasks } from '../../../domain/models';
import { Section, SectionValueObject } from '../../../domain/section/section.vo';
import { Task } from '../../../domain/task/task';
import { User } from '../../../domain/user/user';
import { SectionGateway } from '../../../infrastructures/gateways/section.gateway';
import { TaskGateway } from '../../../infrastructures/gateways/task.gateway';
import { ErrorTypeEnum } from '../presenters/helpers/error-message';
import { actions, selectSections } from '../store/board.store';
import { actions as ErrorStoreActions } from '../store/error.store';

@Injectable({
  providedIn: 'root',
})
export class SectionUsecase {
  constructor(private store: Store<{}>, private readonly _sectionGateway: SectionGateway, private readonly _taskGateway: TaskGateway) {}

  private isLoggedIn(): Promise<User | null> {
    return this.store
      .select(createSelector(selectLoggedInUser, (loggedInUser) => loggedInUser))
      .pipe(take(1))
      .toPromise();
  }

  async fetchBoardItems() {
    const loggedInUser = await this.isLoggedIn();
    if (loggedInUser === null) {
      return;
    }

    // NOTE: section 一覧を取得
    const sections$ = this._sectionGateway.getSections(loggedInUser.uid);
    const sections = await sections$.pipe(take(1)).toPromise();
    this.store.dispatch(actions.saveSections({ sections }));

    // NOTE: task 一覧を取得
    const tasks$ = this._taskGateway.getTasks(loggedInUser.uid);
    const tasks = await tasks$.pipe(take(1)).toPromise();
    this.store.dispatch(actions.saveTasks({ tasks }));
  }

  async addSection(addingSection: Section) {
    const user = await this.isLoggedIn();
    // TODO: user が null の場合のエラー処理が必要
    if (user === null) {
      return;
    }

    const sections: Section[] = await this.store
      .select(createSelector(selectSections, (s) => s))
      .pipe(take(1))
      .toPromise();

    try {
      const newerSection = SectionValueObject.create(addingSection.name, user.uid, sections.length + 1);
      const createdSection = await this._sectionGateway.postSection(newerSection.plainObject());
      this.store.dispatch(actions.createSection({ section: createdSection }));
    } catch (_) {
      this.store.dispatch(ErrorStoreActions.setError({ errorType: ErrorTypeEnum.OverSectionNameLength }));
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
    this.store.dispatch(actions.deleteSection({ sectionId: deletedSectionId }));
  }

  async updateSectionName(newName: string, section: SectionHasTasks) {
    try {
      const updatedSection = SectionValueObject.create(newName, section.userId, section.orderId, section.id);
      await this._sectionGateway.putSection(updatedSection.plainObject());
      this.store.dispatch(actions.updateSection({ section: updatedSection.plainObject() }));
    } catch (error) {
      this.store.dispatch(ErrorStoreActions.setError({ errorType: ErrorTypeEnum.OverSectionNameLength }));
    }
  }

  async addTask(addingTask: Task, section: SectionHasTasks) {
    const user = await this.isLoggedIn();
    // TODO: user が null の場合のエラー処理が必要
    if (user === null) {
      return;
    }

    const createdTask = await this._taskGateway.postTask({
      userId: user.uid,
      name: addingTask.name,
      sectionId: section.id,
      orderId: section.tasks.length + 1,
      id: 'temporary',
    });

    this.store.dispatch(actions.addTask({ task: createdTask }));
  }

  async deleteTask(taskId: string) {
    const deletedTaskId = await this._taskGateway.deleteTask(taskId);
    this.store.dispatch(actions.deleteTask({ taskId: deletedTaskId }));
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

  moveSection(sectionsHasTasks: SectionHasTasks[]) {
    sectionsHasTasks.forEach((sectionHasTasks, index) => {
      const section: Section = { id: sectionHasTasks.id, name: sectionHasTasks.name, userId: sectionHasTasks.userId, orderId: index + 1 };
      this._sectionGateway.putSection(section);
    });
  }

  closeAlertDialog() {
    this.store.dispatch(ErrorStoreActions.clearError());
  }
}
