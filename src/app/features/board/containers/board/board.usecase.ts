import { Injectable, inject } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { SectionHasTasks } from '../../../../domain/models';
import { Section, SectionValueObject } from '../../../../domain/section/section.vo';
import { Task } from '../../../../domain/task/task';
import { Authenticator } from '../../../../infrastructures/adapters/authenticator';
import { SectionGateway } from '../../../../infrastructures/gateways/section.gateway';
import { TaskGateway } from '../../../../infrastructures/gateways/task.gateway';
import { BoardStore } from './board.store';

@Injectable()
export class BoardUsecase {
  readonly #store = inject(BoardStore);
  readonly #authenticator = inject(Authenticator);
  readonly #sectionGateway = inject(SectionGateway);
  readonly #taskGateway = inject(TaskGateway);

  async fetchBoardItem() {
    const loggedInUser = await firstValueFrom(this.#authenticator.loggedInUser$);
    if (loggedInUser === null) {
      return;
    }

    const sections = await firstValueFrom(this.#sectionGateway.getSections(loggedInUser.uid));
    this.#store.setSections(sections);

    const tasks = await firstValueFrom(this.#taskGateway.getTasks(loggedInUser.uid));
    this.#store.setTasks(tasks);
  }

  moveSection(sectionsHasTasks: SectionHasTasks[]) {
    sectionsHasTasks.forEach((sectionHasTasks, index) => {
      const section: Section = { id: sectionHasTasks.id, name: sectionHasTasks.name, userId: sectionHasTasks.userId, orderId: index + 1 };
      this.#sectionGateway.putSection(section);
    });
  }

  async addSection(sectionName: string) {
    const loggedInUser = await firstValueFrom(this.#authenticator.loggedInUser$);
    if (loggedInUser === null) {
      return;
    }

    try {
      const newerSection = SectionValueObject.create(sectionName, loggedInUser.uid, this.#store.$sectionsHasTasks().length + 1);
      const createdSection = await this.#sectionGateway.postSection(newerSection.plainObject());
      this.#store.addSection(createdSection);
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
    const deletedSectionId = await this.#sectionGateway.deleteSection(section);
    this.#store.deleteSection(deletedSectionId);
  }

  async updateSectionName(newName: string, section: SectionHasTasks) {
    try {
      const updatedSection = SectionValueObject.create(newName, section.userId, section.orderId, section.id);
      await this.#sectionGateway.putSection(updatedSection.plainObject());
      this.#store.updateSection(updatedSection);
    } catch (error) {
      // TODO: セクション名が 15 文字(ErrorTypeEnum.OverSectionNameLength) を超えた場合にエラーメッセージを出す
      // tslint:disable-next-line:no-console
      console.log('セクション名が長すぎます');
    }
  }

  moveTask(tasks: Task[]) {
    tasks.forEach((task, index) => {
      const updatedTask: Task = { ...task, orderId: index + 1 };
      this.#taskGateway.putTask(updatedTask);
    });
  }

  async transferTask(sourceTasks: Task[], destinationTasks: Task[], destinationSectionId: string) {
    destinationTasks.forEach((task, index) => {
      const updatedTask: Task = { ...task, orderId: index + 1, sectionId: destinationSectionId };
      this.#taskGateway.putTask(updatedTask);
    });

    sourceTasks.forEach((task, index) => {
      const updatedTask: Task = { ...task, orderId: index + 1 };
      this.#taskGateway.putTask(updatedTask);
    });
  }

  async createTask(addingTask: Task, section: SectionHasTasks) {
    const loggedInUser = await firstValueFrom(this.#authenticator.loggedInUser$);
    if (loggedInUser === null) {
      return;
    }

    const createdTask = await this.#taskGateway.postTask({
      ownerId: loggedInUser.uid,
      name: addingTask.name,
      sectionId: section.id,
      orderId: section.tasks.length + 1,
      description: '',
      dueDate: '',
      id: 'temporary',
    });
    this.#store.createTask(createdTask);
  }

  async deleteTask(taskId: string) {
    const deletedTaskId = await this.#taskGateway.deleteTask(taskId);
    this.#store.deleteTask(deletedTaskId);
  }
}
