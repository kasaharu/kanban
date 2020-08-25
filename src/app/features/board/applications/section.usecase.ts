import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { take } from 'rxjs/operators';
import { Section, SectionHasTasks, Task } from '../../../domain/models';
import { DatabaseAdapter } from '../../../infrastructures/adapters/database.adapter';
import { selectStore as selectAppShellStore } from '../../app-shell/store/app-shell.store';
import * as SectionDomain from '../domain/section';
import * as TaskDomain from '../domain/task';
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

    const sections$ = this.databaseAdapter.fetchCollectionWhere<Section>(SectionDomain.COLLECTION_NAME, {
      key: 'userId',
      value: loggedInUser.uid,
    });
    const sections = await sections$.pipe(take(1)).toPromise();
    this.store.dispatch(actions.saveSections({ sections }));

    await this.fetchTasks(loggedInUser.uid);
  }

  private async fetchTasks(userId: string) {
    const tasks$ = this.databaseAdapter.fetchCollectionWhere<Task>(TaskDomain.COLLECTION_NAME, { key: 'userId', value: userId });
    const tasks = await tasks$.pipe(take(1)).toPromise();
    this.store.dispatch(actions.saveTasks({ tasks }));
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
    const createdSection = await this.databaseAdapter.createDocument<Section>(SectionDomain.COLLECTION_NAME, {
      userId: user.uid,
      name: addingSection.name,
      orderId: sections.length + 1,
      id: 'temporary',
    });

    this.store.dispatch(actions.createSection({ section: createdSection }));
  }

  async deleteSection(section: SectionHasTasks) {
    const taskIds = section.tasks.map((task) => task.id);
    // NOTE: 対象の Section に紐づく task を削除
    taskIds.forEach((taskId) => {
      this.deleteTask(taskId);
    });

    // NOTE: 対象の Section を削除
    const deletedSectionId = await this.databaseAdapter.deleteDocument<Section>(SectionDomain.COLLECTION_NAME, section.id);
    this.store.dispatch(actions.deleteSection({ sectionId: deletedSectionId }));
  }

  updateSectionName(newName: string, section: Section) {
    const updatedSection: Section = { ...section, name: newName };
    this.databaseAdapter.updateDocument<Section>(SectionDomain.COLLECTION_NAME, updatedSection, updatedSection.id);
  }

  async addTask(addingTask: Task, section: SectionHasTasks) {
    const user = await selectAppShellStore(this.store, (state) => state.loggedInUser)
      .pipe(take(1))
      .toPromise();
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
}
