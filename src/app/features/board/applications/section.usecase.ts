import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { take } from 'rxjs/operators';
import { SectionHasTasks, Task, User } from '../../../domain/models';
import { COLLECTION_NAME, Section, SectionValueObject } from '../../../domain/section/section.vo';
import { DatabaseAdapter } from '../../../infrastructures/adapters/database.adapter';
import { selectStore as selectAppShellStore } from '../../app-shell/store/app-shell.store';
import * as TaskDomain from '../domain/task';
import { actions, selectStore } from '../store/board.store';
import { actions as ErrorStoreActions } from '../store/error.store';
import { ErrorTypeEnum } from '../ui/helpers/error-message';

@Injectable({
  providedIn: 'root',
})
export class SectionUsecase {
  constructor(private store: Store<{}>, private databaseAdapter: DatabaseAdapter) {}

  private isLoggedIn(): Promise<User | null> {
    return selectAppShellStore(this.store, (state) => state.loggedInUser)
      .pipe(take(1))
      .toPromise();
  }

  async fetchSections() {
    const loggedInUser = await this.isLoggedIn();
    if (loggedInUser === null) {
      return;
    }

    // NOTE: section 一覧を取得
    const sections$ = this.databaseAdapter.fetchCollectionWhere<Section>(COLLECTION_NAME, { key: 'userId', value: loggedInUser.uid });
    const sections = await sections$.pipe(take(1)).toPromise();
    this.store.dispatch(actions.saveSections({ sections }));

    // NOTE: task 一覧を取得
    const tasks$ = this.databaseAdapter.fetchCollectionWhere<Task>(TaskDomain.COLLECTION_NAME, { key: 'userId', value: loggedInUser.uid });
    const tasks = await tasks$.pipe(take(1)).toPromise();
    this.store.dispatch(actions.saveTasks({ tasks }));
  }

  async addSection(addingSection: Section) {
    const user = await this.isLoggedIn();
    // TODO: user が null の場合のエラー処理が必要
    if (user === null) {
      return;
    }

    const sections: Section[] = await selectStore(this.store, (state) => state.sections)
      .pipe(take(1))
      .toPromise();

    try {
      const newerSection = SectionValueObject.create(addingSection.name, user.uid, sections.length + 1);
      const createdSection = await this.databaseAdapter.createDocument<Section>(COLLECTION_NAME, newerSection);
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
    const deletedSectionId = await this.databaseAdapter.deleteDocument<Section>(COLLECTION_NAME, section.id);
    this.store.dispatch(actions.deleteSection({ sectionId: deletedSectionId }));
  }

  updateSectionName(newName: string, section: SectionHasTasks) {
    try {
      const updatedSection = SectionValueObject.create(newName, section.userId, section.orderId, section.id);
      this.databaseAdapter.updateDocument<Section>(COLLECTION_NAME, updatedSection.plainObject(), updatedSection.id);
      // FIXME: SectionName 変更後に store に更新をかける
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

    const createdTask = await this.databaseAdapter.createDocument<Task>(TaskDomain.COLLECTION_NAME, {
      userId: user.uid,
      name: addingTask.name,
      sectionId: section.id,
      orderId: section.tasks.length + 1,
      id: 'temporary',
    });

    this.store.dispatch(actions.addTask({ task: createdTask }));
  }

  async deleteTask(taskId: string) {
    const deletedTaskId = await this.databaseAdapter.deleteDocument<Task>(TaskDomain.COLLECTION_NAME, taskId);
    this.store.dispatch(actions.deleteTask({ taskId: deletedTaskId }));
  }

  moveTask(tasks: Task[]) {
    tasks.forEach((task, index) => {
      const updatedTask: Task = { ...task, orderId: index + 1 };
      this.databaseAdapter.updateDocument<Task>(TaskDomain.COLLECTION_NAME, updatedTask, updatedTask.id);
    });
  }

  async transferTask(sourceTasks: Task[], destinationTasks: Task[], destinationSectionId: string) {
    destinationTasks.forEach((task, index) => {
      const updatedTask: Task = { ...task, orderId: index + 1, sectionId: destinationSectionId };
      this.databaseAdapter.updateDocument<Task>(TaskDomain.COLLECTION_NAME, updatedTask, updatedTask.id);
    });

    sourceTasks.forEach((task, index) => {
      const updatedTask: Task = { ...task, orderId: index + 1 };
      this.databaseAdapter.updateDocument<Task>(TaskDomain.COLLECTION_NAME, updatedTask, updatedTask.id);
    });
  }

  moveSection(sectionsHasTasks: SectionHasTasks[]) {
    sectionsHasTasks.forEach((sectionHasTasks, index) => {
      const section: Section = { id: sectionHasTasks.id, name: sectionHasTasks.name, userId: sectionHasTasks.userId, orderId: index + 1 };
      this.databaseAdapter.updateDocument<Section>(COLLECTION_NAME, section, section.id);
    });
  }

  closeAlertDialog() {
    this.store.dispatch(ErrorStoreActions.clearError());
  }
}
